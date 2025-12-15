from django.db import models
from django.contrib.auth import get_user_model
from books.models import Book
import uuid

User = get_user_model()

class Order(models.Model):
    """
    Model representing a customer order.
    
    Fields:
    - id: UUID primary key
    - user: User who placed the order (optional for guest checkout)
    - email: Email address for order confirmation
    - total_amount: Total cost of the order
    - payment_status: Status of payment (pending, paid, failed)
    - payment_reference: Reference ID from payment provider
    - payment_method: Payment method used
    - created_at: Timestamp when order was created
    - updated_at: Timestamp when order was last updated
    """
    PAYMENT_STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    email = models.EmailField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='pending')
    payment_reference = models.CharField(max_length=255, blank=True, null=True)
    payment_method = models.CharField(max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} - {self.email}"

class OrderItem(models.Model):
    """
    Model representing an item within an order.
    
    Fields:
    - id: UUID primary key
    - order: Foreign key to Order
    - book: Foreign key to Book
    - quantity: Number of copies ordered
    - price: Price per unit at time of order
    - subtotal: Total price for this item (price * quantity)
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def save(self, *args, **kwargs):
        """Calculate subtotal before saving."""
        self.subtotal = self.price * self.quantity
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.quantity} x {self.book.title if self.book else 'Unknown Book'}"
