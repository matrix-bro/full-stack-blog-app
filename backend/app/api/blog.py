from rest_framework import status, serializers, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Blog

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['title', 'content', 'categories', 'tags']

class CreateBlogView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = BlogSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save(author=request.user)
        
        return Response({
            'success': 'Blog post created successfully.',
            'data': serializer.data,
            'status': status.HTTP_201_CREATED,
        }, status=status.HTTP_201_CREATED)        