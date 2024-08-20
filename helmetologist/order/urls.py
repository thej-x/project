from django.contrib import admin
from django.urls import path
from .views import *
from django.contrib.auth.views import LogoutView

urlpatterns = [       
    path('adminorders/',adminorders , name='adminorders'),
    path('order_products/<str:id>/',order_products , name='order_products'),
    path('update_order_product_status/<str:id>/<int:order_product_id>/', update_order_product_status, name='update_order_product_status'),
    path('cancel_order_request/<int:order_product_id>/', cancel_order_request, name='cancel_order_request'),
    path('view_order/<int:order_product_id>/', view_order, name='view_order'),
    path('return-product/<int:order_product_id>/', return_product, name='return_product'),
    path('payment_status/',payment_status,name='payment_status'),
    path('wallet/',wallet,name='wallet')
    ]