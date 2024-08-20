
from django.contrib import admin
from django.urls import path,include
from . import views
from django.contrib.auth.views import LogoutView
urlpatterns = [

    path('adminlogin/', views.adminlogin,name='adminlogin'),
    path('admindashboard/', views.admindashboard,name='admindashboard'),
    path('adminuser/', views.adminuser,name='adminuser'),
    path('block_user/<int:user_id>/', views.block_user, name='block_user'),
    path('unblock_user/<int:user_id>/', views.unblock_user, name='unblock_user'),
    path('sales/',views.sales,name='sales'),
    path('adminlogout/',views.adminlogout,name='adminlogout')
]