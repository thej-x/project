from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
import pyotp
import datetime
from django.contrib.auth.models import User

class UserData(AbstractUser):
    # Additional fields for ecommerce user profile
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(max_length=150, unique=True)  # Make email field unique
    
    username = models.CharField(max_length=150, unique=False,null=True)  # Make username field not unique

    groups = models.ManyToManyField(Group, related_name='custom_user_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions_set', blank=True)

    def __str__(self):
        return self.first_name + " " + self.last_name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(blank=True, null=True)
    
    
    
    