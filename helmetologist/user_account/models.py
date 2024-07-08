from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
import pyotp
import datetime
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model


class UserData(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=150)
    email = models.EmailField(max_length=150, unique=True)  
    
    username = models.CharField(max_length=150, unique=False,null=True)  

    groups = models.ManyToManyField(Group, related_name='custom_user_set', blank=True)
    user_permissions = models.ManyToManyField(Permission, related_name='custom_user_permissions_set', blank=True)

    def __str__(self):
        return self.first_name + " " + self.last_name

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(blank=True, null=True)
    
User = get_user_model()
  
class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, null=True)
    email = models.EmailField(max_length=150, unique=True) 
    phone = models.CharField(max_length=15)
    house_no = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    pincode = models.CharField(max_length=20)
    is_delete = models.BooleanField(default=False, null=True)

    def __str__(self):
        return f"{self.name}, {self.city}, {self.state}, {self.country}"    
