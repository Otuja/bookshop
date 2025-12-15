from django.db import models
import uuid

class Category(models.Model):
    """
    Model representing a book category.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name

class Book(models.Model):
    """
    Model representing a book.
    
    Fields:
    - id: UUID primary key
    - title: Book title
    - author: Book author
    - description: Book description
    - price: Book price
    - cover_image: Book cover image (defaults to default_book.jpg)
    - category: Foreign key to Category
    - stock_quantity: Number of books in stock
    - is_active: Boolean to soft delete/hide books
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    cover_image = models.ImageField(upload_to='books/', default='defaults/default_book.jpg')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='books')
    stock_quantity = models.PositiveIntegerField(default=0)
    isbn = models.CharField(max_length=13, unique=True, blank=True, null=True)
    publisher = models.CharField(max_length=255, blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    @property
    def is_in_stock(self):
        """Check if book is in stock."""
        return self.stock_quantity > 0
