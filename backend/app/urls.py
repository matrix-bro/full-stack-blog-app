from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter
from app.api import user, blog

router = DefaultRouter()
router.register(r'categories', blog.ReadOnlyCategoryViewSet, basename='categories')
router.register(r'blogs', blog.ReadOnlyBlogViewSet, basename='blogs')

urlpatterns = [
    path('register/', user.RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

    # Blog
    path('blog/', blog.CreateBlogView.as_view(), name='create_blog'),
    path('blog/<int:pk>/update/', blog.UpdateBlogView.as_view(), name='update_blog'),

    # comment
    path('blog/<int:pk>/comment/', blog.PostCommentView.as_view(), name='post_comment'),

    path('', include(router.urls)),
]
