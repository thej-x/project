
from django.contrib import admin
from django.urls import path,include
from . import views
from django.contrib.auth.views import LogoutView
from .views import *
urlpatterns = [

    path('', index,name='index'),
    path('signup/', signuppage, name='signup'),
    path('login/', loginpage, name='login'),
    path('otp/', otppage, name='otp'),
    path('resend_otp/', resend_otp, name='resend_otp'),
    path('useraccount/<int:user_id>', useraccount, name='useraccount'),
    path('orders/<int:user_id>', orders, name='orders'),
    path('order_tracking/<int:user_id>', order_tracking, name='order_tracking'),
    path("add_address/", add_address, name='add_address'),
    path("delete_address/<int:add_id>/", delete_address, name='delete_address'),
    path("edit_address/<int:address_id>/", edit_address, name='edit_address'),
    path("user_details/<int:user_id>", user_details, name='user_details'),
    path("UserLogout/", logout, name='userlogout'),
    path('base/', base, name='base'),

]
