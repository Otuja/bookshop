from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model.
    Read-only fields: id, created_at, updated_at
    """
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'first_name', 'last_name', 'avatar', 'is_staff', 'is_superuser', 'created_at', 'updated_at']
        read_only_fields = ['id', 'is_staff', 'is_superuser', 'created_at', 'updated_at']

class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration.
    Validates password confirmation and creates a new user.
    """
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password_confirm = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'password_confirm', 'first_name', 'last_name']

    def validate(self, attrs):
        """Check that password and password_confirm match."""
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        """Create a new user with encrypted password."""
        validated_data.pop('password_confirm')
        user = User.objects.create_user(**validated_data)
        return user

class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for changing user password.
    Requires old_password and new_password.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True, validators=[validate_password])

class UpdateProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for updating user profile information.
    Allowed fields: first_name, last_name, avatar.
    """
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'avatar']
