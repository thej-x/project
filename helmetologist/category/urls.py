
from django.contrib import admin
from django.urls import path,include
from django.contrib.auth.views import LogoutView
from .views import *
from cart.views import *

urlpatterns = [ 
    path('admincategory/',admincategory,name='admincategory'),
    path('add_category/', add_category, name='add_category'),
    path('unlist_category/<int:category_id>',unlist_category, name='unlist_category'),
    path('edit_category/<int:category_id>', edit_category, name='editcategory'),
    path('update_item/',updateItem,name='updateItem'),
    path('<slug:shop_cat_slug>/',shop, name='shop'),
]




