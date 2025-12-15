from rest_framework import views, status, permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db import transaction
from .serializers import PaymentInitSerializer
from .models import PaymentTransaction
from orders.models import Order, OrderItem
from books.models import Book
from accounts.models import User
import uuid

class PaymentInitiateView(views.APIView):
    """
    API view to initiate a payment.
    Validates stock, creates pending order, and returns payment URL.
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = PaymentInitSerializer(data=request.data)
        if serializer.is_valid():
            items_data = serializer.validated_data['items']
            email = serializer.validated_data['email']
            provider = serializer.validated_data['provider']
            
            # Check stock and calculate total
            total_amount = 0
            order_items = []
            
            try:
                with transaction.atomic():
                    # Create Order
                    user = None
                    if request.user.is_authenticated:
                        user = request.user
                    
                    order = Order.objects.create(
                        user=user,
                        email=email,
                        payment_method=provider,
                        total_amount=0 # Will update later
                    )

                    for item in items_data:
                        book = get_object_or_404(Book, id=item['book_id'])
                        if book.stock_quantity < item['quantity']:
                            raise Exception(f"Insufficient stock for {book.title}")
                        
                        subtotal = book.price * item['quantity']
                        total_amount += subtotal
                        
                        OrderItem.objects.create(
                            order=order,
                            book=book,
                            quantity=item['quantity'],
                            price=book.price,
                            subtotal=subtotal
                        )
                    
                    order.total_amount = total_amount
                    order.save()

                    # Create PaymentTransaction
                    reference = str(uuid.uuid4())
                    PaymentTransaction.objects.create(
                        order=order,
                        provider=provider,
                        reference=reference,
                        status='pending'
                    )

                    # Simulate Payment Provider Response
                    payment_url = f"https://checkout.example.com/pay/{reference}"
                    
                    return Response({
                        "payment_url": payment_url,
                        "reference": reference,
                        "order_id": order.id
                    }, status=status.HTTP_201_CREATED)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PaymentWebhookView(views.APIView):
    """
    API view to handle payment webhooks.
    Updates transaction status and order status (and stock) upon success.
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request, provider):
        # Simulate webhook processing
        data = request.data
        reference = data.get('reference')
        status_val = data.get('status') # successful, failed

        try:
            txn = PaymentTransaction.objects.get(reference=reference)
            txn.raw_response = data
            
            if status_val == 'successful':
                txn.status = 'successful'
                txn.save()
                
                order = txn.order
                if order.payment_status != 'paid':
                    order.payment_status = 'paid'
                    order.payment_reference = reference
                    order.save()
                    
                    # Reduce stock
                    for item in order.items.all():
                        book = item.book
                        if book:
                            book.stock_quantity -= item.quantity
                            book.save()
            else:
                txn.status = 'failed'
                txn.save()
                order = txn.order
                order.payment_status = 'failed'
                order.save()

            return Response({"status": "received"}, status=status.HTTP_200_OK)

        except PaymentTransaction.DoesNotExist:
            return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)

class PaymentConfirmView(views.APIView):
    """
    API view to confirm payment status for frontend redirection.
    """
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        reference = request.query_params.get('reference')
        if not reference:
            return Response({"error": "Reference required"}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            txn = PaymentTransaction.objects.get(reference=reference)
            return Response({
                "status": txn.status,
                "order_id": txn.order.id
            })
        except PaymentTransaction.DoesNotExist:
            return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)
