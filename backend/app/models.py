from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.conf import settings

class UserAccountManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password):
        if not email:
            raise ValueError('Email field is required')
        
        email = self.normalize_email(email)
        email = email.lower()

        user = self.model(first_name=first_name, last_name=last_name, email=email)

        user.set_password(password)

        user.save(using=self._db)

        return user
    
    def create_superuser(self, email, first_name, last_name, password=None):
        user = self.create_user(email, first_name, last_name, password=password)

        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.email
    
class Category(models.Model):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'Categories'
    
class Tag(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Blog(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="blog_posts")
    categories = models.ManyToManyField(Category, related_name="blog_posts")
    tags = models.ManyToManyField(Tag, related_name="blog_posts")
    title = models.CharField(max_length=250)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title 
    
    class Meta:
        ordering = ['-created_at']