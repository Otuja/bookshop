from rest_framework import generics, permissions
from django.db.models import Q
from .models import Book, Category
from .serializers import BookSerializer, CategorySerializer

class CategoryListView(generics.ListCreateAPIView):
    """
    API view to list all categories and create new ones.
    List: Public access.
    Create: Admin only.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

class BookListView(generics.ListCreateAPIView):
    """
    API view to list books with filtering options and create new books.
    List: Public access.
    Create: Admin only.
    Filters:
    - search: Search by title or description
    - category: Filter by category slug
    - min_price: Filter by minimum price
    - max_price: Filter by maximum price
    """
    serializer_class = BookSerializer

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAdminUser()]
        return [permissions.AllowAny()]

    def get_queryset(self):
        queryset = Book.objects.filter(is_active=True)
        
        search = self.request.query_params.get('search', None)
        category = self.request.query_params.get('category', None)
        min_price = self.request.query_params.get('min_price', None)
        max_price = self.request.query_params.get('max_price', None)

        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )
        
        if category:
            queryset = queryset.filter(category__slug=category)
        
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
            
        return queryset

class BookDetailView(generics.RetrieveAPIView):
    """
    API view to retrieve details of a specific book.
    """
    queryset = Book.objects.filter(is_active=True)
    serializer_class = BookSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'id'
