from rest_framework import status, serializers, permissions, viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Blog, Category, Comment

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'description']

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['title', 'content', 'categories', 'tags'] 

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content']                

class ReadOnlyCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset that provides read-only actions for the Category model.
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CreateBlogView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        serializer = BlogSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        serializer.save(author=request.user)
        
        return Response({
            'success': True,
            'message': 'Blog post created successfully.',
            'data': serializer.data,
            'status': status.HTTP_201_CREATED,
        }, status=status.HTTP_201_CREATED)        
    
class UpdateBlogView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        try:
            blog_post = Blog.objects.get(pk=pk)
        except Blog.DoesNotExist:
            return Response({
                'success': False,
                'message': 'Blog post does not exist.',
                'status': status.HTTP_404_NOT_FOUND,
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = BlogSerializer(blog_post, data=request.data)
        serializer.is_valid(raise_exception=True)
        
        serializer.save()
        return Response({
            'success': True,
            'message': 'Blog post updated successfully.',
            'data': serializer.data,
            'status': status.HTTP_200_OK,
        }, status=status.HTTP_200_OK)    
    
class PostCommentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, pk):
        try:
            blog_post = Blog.objects.get(pk=pk)
        except Blog.DoesNotExist:
            return Response({
                'success': False,
                'message': 'Blog post does not exist.',
                'status': status.HTTP_404_NOT_FOUND,
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = CommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        comment = Comment(user=request.user, blog=blog_post, content=serializer.validated_data['content'])
        comment.save()

        return Response({
            'success': True,
            'message': 'Posted comment successfully.',
            'status': status.HTTP_200_OK,
        }, status=status.HTTP_200_OK)
