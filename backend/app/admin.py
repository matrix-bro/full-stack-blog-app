from django.contrib import admin
from app.models import Category, Tag, Blog
from django.contrib.auth import get_user_model
User = get_user_model()

admin.site.register(User)
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Blog)