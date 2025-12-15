from django.contrib import admin
from .models import Book, Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'price', 'category', 'stock_quantity', 'is_active')
    list_filter = ('category', 'is_active', 'created_at')
    search_fields = ('title', 'author', 'description')
    list_editable = ('price', 'stock_quantity', 'is_active')
