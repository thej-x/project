
from django.contrib import admin
from django.urls import path,include
from . import views
from django.contrib.auth.views import LogoutView


urlpatterns = [

    path('', views.index,name='index'),
    path('signup/', views.signuppage, name='signup'),
    path('login/', views.loginpage, name='login'),
    path('otp/', views.otppage, name='otp'),
    path('resend_otp/', views.resend_otp, name='resend_otp'),
    path('useraccount/', views.useraccount, name='useraccount'),
    path("UserLogout/", views.logout, name='userlogout'),
    path('base/', views.base, name='base'),

]
