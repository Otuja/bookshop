from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from .serializers import (
    RegisterSerializer, UserSerializer, ChangePasswordSerializer, UpdateProfileSerializer
)

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    """
    API view to register a new user.
    Public access.
    """
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

class LogoutView(APIView):
    """
    API view to logout a user by blacklisting their refresh token.
    Requires authentication.
    """
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ProfileView(generics.RetrieveAPIView):
    """
    API view to retrieve the authenticated user's profile.
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class UpdateProfileView(generics.UpdateAPIView):
    """
    API view to update the authenticated user's profile.
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UpdateProfileSerializer

    def get_object(self):
        return self.request.user

class ChangePasswordView(generics.UpdateAPIView):
    """
    API view to change the authenticated user's password.
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = ChangePasswordSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        """
        Update the password.
        Validates old password before setting the new one.
        """
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)

            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response({"status": "success", "code": status.HTTP_200_OK, "message": "Password updated successfully"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
