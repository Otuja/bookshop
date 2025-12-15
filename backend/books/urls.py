from django.urls import path
from .views import BookListView, BookDetailView, CategoryListView

urlpatterns = [
    path('books/', BookListView.as_view(), name='book_list'),
    path('books/<uuid:id>/', BookDetailView.as_view(), name='book_detail'),
    path('categories/', CategoryListView.as_view(), name='category_list'),
]
