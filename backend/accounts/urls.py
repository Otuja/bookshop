from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    RegisterView, LogoutView, ProfileView, UpdateProfileView, ChangePasswordView
)

urlpatterns = [
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('login/', TokenObtainPairView.as_view(), name='auth_login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutView.as_view(), name='auth_logout'),
    path('profile/', ProfileView.as_view(), name='auth_profile'),
    path('profile/update/', UpdateProfileView.as_view(), name='auth_update_profile'),
    path('change-password/', ChangePasswordView.as_view(), name='auth_change_password'),
]
