from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers, permissions
from app.services.user_services import create_user_account
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from app.models import Blog
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
                'success': False,
                'message': e.messages
            }, status=status.HTTP_400_BAD_REQUEST)

        user = create_user_account(**serializer.validated_data)

        response = self.InputSerializer(user)

        return Response({
            'success': True,
            'message': 'User account created successfully.',
            'data': response.data,
            'status': status.HTTP_201_CREATED,
        }, status=status.HTTP_201_CREATED)
    
class RetreiveUserView(APIView):
    class OutputSerializer(serializers.ModelSerializer):
        class BlogSerializer(serializers.ModelSerializer):
            class Meta:
                model = Blog
                fields = ['id', 'title', 'content'] 
        
        blog_posts = BlogSerializer(many=True)

        class Meta:
            model = User
            fields = ('first_name', 'last_name', 'email', 'blog_posts')


    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        user = request.user
        response = self.OutputSerializer(user)

        return Response(response.data, status=status.HTTP_200_OK)  