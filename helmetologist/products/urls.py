from django.contrib import admin
from django.urls import path,include
from .views import *
from django.contrib.auth.views import LogoutView
urlpatterns = [
        
    path('adminproducts/', adminproducts, name='adminproducts'),
    path('add_products/', add_products, name='add_products'),
    path('unlist_product/<int:products_id>',unlist_product,name='unlist_product'),
    path('edit_product/<int:product_id>', edit_product, name='edit_product'),
    path('<slug:product_slug>/<int:product_id>/', product_view, name='product'),

    ]