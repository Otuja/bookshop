from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid

class User(AbstractUser):
    """
    Custom User model extending AbstractUser.
    
    Fields:
    - id: UUID primary key
    - email: Unique email address (used for login)
    - avatar: User profile image
    - created_at: Timestamp when user was created
    - updated_at: Timestamp when user was last updated
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    def __str__(self):
        """Return string representation of user (email)."""
        return self.email
