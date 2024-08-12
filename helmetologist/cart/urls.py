from django.contrib import admin
from django.urls import path
from .views import *
from django.contrib.auth.views import LogoutView
urlpatterns = [
        
    path('cart/', cart_show, name='cart_show'),
    path('add_to_cart/<int:product_id>',add_to_cart,name='add_to_cart'),
    path('update_item/', updateItem, name='update_item'),
    path('update_wishlist/', updateWishlist, name='update_wishlist'),
    path('update_cart_item/', updateCartItem, name='update_cart_item'),
    path('delete_from_cart/<str:product_id>/', delete_from_cart, name='delete_from_cart'),
    path('checkout/', cash_on_delivery, name='checkout'),
    path('checkout_view/', checkout_view, name='checkout_view'),
    # path('payment_success/', payment_success, name='payment_success'),
  
    path('checkout_success/<int:order_id>/', checkout_success, name='checkout_success'),
    path('wishlist/',wishlist,name='wishlist'),
    path('add_to_wishlist/<int:product_id>',add_to_wishlist,name='add_to_wishlist'),
    path('remove_from_wishlist/<int:product_id>',remove_from_wishlist,name='remove_from_wishlist'),
    path('wishlist_to_cart/<int:product_id>',wishlist_to_cart,name='wishlist_to_cart'),
    path('admincoupon/', admincoupon, name='admincoupon'),
    path('coupon_inactive/<int:coupon_id>',coupon_inactive,name='coupon_inactive'),
    path('add_coupon/', add_coupon, name='add_coupon'),
    path('edit_coupon/<int:coupon_id>',edit_coupon, name='edit_coupon'),
    
#  razorpay
    path('create_razorpay_order/', create_razorpay_order, name='create_razorpay_order'),
    path('verify_razorpay_payment/', verify_razorpay_payment, name='verify_razorpay_payment'),
   

    # path('clear_cart/<int:cart_id>',clear_cart,name='clear_cart'),
    ]