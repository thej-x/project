from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Payment)
admin.site.register(Order)
admin.site.register(OrderProduct)
admin.site.register(Wallet)
admin.site.register(Transaction)