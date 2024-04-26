from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from app.services.user_services import create_user_account
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
User = get_user_model()

class RegisterView(APIView):
    class InputSerializer(serializers.ModelSerializer):
        class Meta:
            model = User
            fields = ('first_name', 'last_name', 'email', 'password', 'password2')

        password = serializers.CharField(write_only=True)
        password2 = serializers.CharField(write_only=True)

        def validate(self, attrs):
            if attrs['password'] != attrs['password2']:
                raise serializers.ValidationError({
                    'error': 'Password fields didnot match.'
                })
            
            attrs.pop('password2')  # After validation, remove password2 from serializers.validated_data
            
            return attrs

    def post(self, request):
        serializer = self.InputSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        password = serializer.validated_data['password']

        try:
            validate_password(password, request.user)
        except ValidationError as e:
            return Response({
                'error': e.messages
            }, status=status.HTTP_400_BAD_REQUEST)

        user = create_user_account(**serializer.validated_data)

        response = self.InputSerializer(user)

        return Response({
            'success': 'User account created successfully.',
            'data': response.data,
            'status': status.HTTP_201_CREATED,
        }, status=status.HTTP_201_CREATED)