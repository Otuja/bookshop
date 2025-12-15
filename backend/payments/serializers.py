from rest_framework import serializers

class PaymentItemSerializer(serializers.Serializer):
    """
    Serializer for individual items in payment initiation.
    """
    book_id = serializers.UUIDField()
    quantity = serializers.IntegerField(min_value=1)

class PaymentInitSerializer(serializers.Serializer):
    """
    Serializer for initiating a payment.
    Requires list of items, email, and provider.
    """
    items = PaymentItemSerializer(many=True)
    email = serializers.EmailField()
    provider = serializers.CharField(max_length=50)
