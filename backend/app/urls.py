from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from app.api import user, blog

urlpatterns = [
    path('register/', user.RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='login'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),

    # Blog
    path('blog/', blog.CreateBlogView.as_view(), name='create_blog'),
    path('blog/<int:pk>/update/', blog.UpdateBlogView.as_view(), name='update_blog'),

]
