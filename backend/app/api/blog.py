from django.shortcuts import get_object_or_404
from rest_framework import status, serializers, permissions, viewsets, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from app.models import Blog, Category, Comment, Tag
from rest_framework.pagination import PageNumberPagination
from app.permissions import IsOwnerOrReadOnly
from django.contrib.auth import get_user_model
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['first_name']  

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['title', 'content', 'categories', 'tags'] 

class CommentListSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ['user', 'content']

class BlogListSerializer(serializers.ModelSerializer):
    categories = CategorySerializer(many=True)
    tags = TagSerializer(many=True)
    comments = CommentListSerializer(many=True, read_only=True)

    class Meta:
        model = Blog
        fields = ['id', 'title', 'content', 'categories', 'tags', 'comments']         

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['content']                     


class AllCategoriesView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryBlogsView(APIView, PageNumberPagination):
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Blog
            fields = ['id', 'title', 'content']

    def get(self, request, pk):
        category = get_object_or_404(Category, pk=pk)

        blogs = category.blog_posts.all()
        paginated_blogs = self.paginate_queryset(blogs, request)
        serializer = self.OutputSerializer(paginated_blogs, many=True)
        return self.get_paginated_response(serializer.data)

class ReadOnlyTagViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset that provides read-only actions for the Tag model.
    """
    queryset = Tag.objects.all()
    serializer_class = TagSerializer

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
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def put(self, request, pk):
        blog_post = get_object_or_404(Blog, pk=pk)
        self.check_object_permissions(request, blog_post)

        serializer = BlogSerializer(blog_post, data=request.data)
        serializer.is_valid(raise_exception=True)
        
        serializer.save()
        return Response({
            'success': True,
            'message': 'Blog post updated successfully.',
            'data': serializer.data,
            'status': status.HTTP_200_OK,
        }, status=status.HTTP_200_OK)    

class ReadOnlyBlogViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset that provides read-only actions for the Blog model.
    """
    queryset = Blog.objects.all()
    serializer_class = BlogListSerializer
    pagination_class = PageNumberPagination
    
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
