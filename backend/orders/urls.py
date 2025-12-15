from django.urls import path
from .views import OrderListView, OrderDetailView

urlpatterns = [
    path('orders/', OrderListView.as_view(), name='order_list'),
    path('orders/<uuid:id>/', OrderDetailView.as_view(), name='order_detail'),
]
