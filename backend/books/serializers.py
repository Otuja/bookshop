from rest_framework import serializers
from .models import Category, Book

class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model.
    """
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'created_at']

class BookSerializer(serializers.ModelSerializer):
    """
    Serializer for Book model.
    Includes nested category details and handles category_id for writing.
    """
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Book
        fields = [
            'id', 'title', 'author', 'description', 'price', 
            'cover_image', 'category', 'category_id', 
            'stock_quantity', 'isbn', 'publisher', 'is_active', 'is_in_stock', 
            'created_at', 'updated_at'
        ]
