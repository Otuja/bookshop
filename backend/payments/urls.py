from django.urls import path
from .views import PaymentInitiateView, PaymentWebhookView, PaymentConfirmView

urlpatterns = [
    path('checkout/initiate/', PaymentInitiateView.as_view(), name='payment_initiate'),
    path('payments/webhook/<str:provider>/', PaymentWebhookView.as_view(), name='payment_webhook'),
    path('checkout/confirm/', PaymentConfirmView.as_view(), name='payment_confirm'),
]
