from django.contrib import admin
from django.urls import path
from .views import *
from django.contrib.auth.views import LogoutView
urlpatterns = [
        
    path('cart/', cart_show, name='cart_show'),
    path('add_to_cart/<int:product_id>',add_to_cart,name='add_to_cart'),
    path('update_item/', updateItem, name='update_item'),
    path('update_cart_item/', updateCartItem, name='update_cart_item'),
    path('delete_from_cart/<str:product_id>/', delete_from_cart, name='delete_from_cart'),
    path('checkout/', checkout, name='checkout'),
    # path('clear_cart/<int:cart_id>',clear_cart,name='clear_cart'),
    ]