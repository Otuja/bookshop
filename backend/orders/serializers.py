from rest_framework import serializers
from .models import Order, OrderItem
from books.serializers import BookSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    """
    Serializer for OrderItem model.
    Includes book details.
    """
    book_details = BookSerializer(source='book', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['id', 'book', 'book_details', 'quantity', 'price', 'subtotal']

class OrderSerializer(serializers.ModelSerializer):
    """
    Serializer for Order model.
    Includes nested order items.
    """
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'user', 'email', 'total_amount', 
            'payment_status', 'payment_reference', 'payment_method', 
            'created_at', 'updated_at', 'items'
        ]
        read_only_fields = ['id', 'user', 'total_amount', 'payment_status', 'created_at', 'updated_at']
