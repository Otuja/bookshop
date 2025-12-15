from rest_framework import generics, permissions
from .models import Order
from .serializers import OrderSerializer

class OrderListView(generics.ListAPIView):
    """
    API view to list orders for the authenticated user.
    """
    serializer_class = OrderSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Order.objects.all().order_by('-created_at')
        return Order.objects.filter(user=user).order_by('-created_at')

class OrderDetailView(generics.RetrieveAPIView):
    """
    API view to retrieve details of a specific order.
    Only allows access to orders belonging to the authenticated user.
    """
    serializer_class = OrderSerializer
    permission_classes = (permissions.IsAuthenticated,)
    lookup_field = 'id'

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
