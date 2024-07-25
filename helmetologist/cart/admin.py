from django.contrib import admin

# Register your models here.

from .models import CartProducts,Cart,Wishlist
admin.site.register(CartProducts)
admin.site.register(Cart)
admin.site.register(Wishlist)