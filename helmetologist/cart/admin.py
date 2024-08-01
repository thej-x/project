from django.contrib import admin

# Register your models here.

from .models import CartProducts,Cart,Wishlist,Coupon,UserCoupon
admin.site.register(CartProducts)
admin.site.register(Cart)
admin.site.register(Wishlist)
admin.site.register(Coupon)
admin.site.register(UserCoupon)