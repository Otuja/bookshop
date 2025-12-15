from django.db import models
from orders.models import Order
import uuid

class PaymentTransaction(models.Model):
    """
    Model representing a payment transaction.
    
    Fields:
    - id: UUID primary key
    - order: Foreign key to Order
    - provider: Payment provider name (e.g., stripe, paystack)
    - reference: Unique reference ID from provider
    - status: Transaction status (pending, successful, failed)
    - raw_response: JSON field to store raw provider response
    - created_at: Timestamp when transaction was created
    """
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('successful', 'Successful'),
        ('failed', 'Failed'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='transactions')
    provider = models.CharField(max_length=50)
    reference = models.CharField(max_length=255, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    raw_response = models.JSONField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.provider} - {self.reference} ({self.status})"
