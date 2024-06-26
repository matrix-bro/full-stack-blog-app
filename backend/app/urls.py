from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from rest_framework.routers import DefaultRouter
from app.api import user, blog

router = DefaultRouter()
router.register(r'blogs', blog.ReadOnlyBlogViewSet, basename='blogs')
router.register(r'tags', blog.ReadOnlyTagViewSet, basename='tags')

urlpatterns = [
    path('register/', user.RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token-verify'),
    path('me/', user.RetreiveUserView.as_view(), name='me'),

    # Categories
    path('categories/', blog.AllCategoriesView.as_view(), name='all_categories'),
    path('category/<int:pk>/blogs/', blog.CategoryBlogsView.as_view(), name='category_blogs'),

    # Blog
    path('blog/', blog.CreateBlogView.as_view(), name='create_blog'),
    path('blog/<int:pk>/update/', blog.UpdateBlogView.as_view(), name='update_blog'),

    # comment
    path('blog/<int:pk>/comment/', blog.PostCommentView.as_view(), name='post_comment'),

    path('', include(router.urls)),
]
