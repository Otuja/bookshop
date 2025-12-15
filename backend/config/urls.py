from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/

Routes:
- /admin/: Django Admin interface
- /api/auth/: Authentication endpoints (Register, Login, etc.)
- /api/: Application endpoints (Books, Orders, Payments)
"""
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('accounts.urls')),
    path('api/', include('books.urls')),
    path('api/', include('orders.urls')),
    path('api/', include('payments.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
