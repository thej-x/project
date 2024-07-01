from django.contrib import admin
from django.urls import path,include
from .views import *
from django.contrib.auth.views import LogoutView
urlpatterns = [
        
    path('adminproducts/', adminproducts, name='adminproducts'),
    path('addproducts/', add_product, name='add_products'),
    path('unlist_product/<int:products_id>',unlist_product,name='unlist_product'),
    path('upload-images/', upload_images, name='upload_images'),
    # path('edit_product/<int:product_id>', edit_product, name='editproduct'),
    path('<slug:product_slug>/', product_view, name='product'),

    ]