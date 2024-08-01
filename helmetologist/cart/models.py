from django.db import models
from products.models import Products
from django.contrib.auth.models import User

# Create your models here.

class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    added_on = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey( Products, on_delete=models.SET_NULL, null=True)

    def __str__(self) -> str:
        return f"{self.product} on {self.added_on}"
    @property
    def wishlist_sub_count(self):
        wishlist_items = self.product.all() 
        total = wishlist_items.count()
        return total


class Coupon(models.Model):
    
    title = models.CharField(max_length=50,blank=True)
    code = models.CharField(max_length=50,unique=True,null=True,blank=True)
    discount_percentage = models.DecimalField(null=True, blank=True, max_digits=5, decimal_places=2, help_text="Enter discount percentage if applicable.")
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True,blank=True)
    quantity = models.IntegerField(null=True, blank=True)
    min_amount = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
    max_amount = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
    active = models.BooleanField(default=True)
    created = models.DateField(auto_now_add=True,null=True)
    
    
    def apply_discount(self, total_amount):
        if self.discount_percentage:
            discount = (self.discount_percentage / 100) * total_amount
            return max(total_amount - discount, 0)
        return total_amount
    
    
    
class UserCoupon(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    coupon = models.ForeignKey(Coupon, on_delete=models.CASCADE)
    applied_at = models.DateTimeField(auto_now_add=True)




class Cart(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    coupon = models.ForeignKey(Coupon, on_delete=models.SET_NULL, blank=True, null=True)
    coupon_applied = models.BooleanField(default=False, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    @property
    def cart_sub_total(self):
        cart_items = self.cartproducts_set.all() 
        total = sum([item.sub_total for item in cart_items])
        return total
    
    
    @property
    def cart_sub_count(self):
        cart_items = self.cartproducts_set.all() 
        total = sum([item.quantity for item in cart_items])
        return total
    
    def __str__(self) -> str:
        return f"'{self.user}'s cart"
    
class CartProducts(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.SET_NULL, null=True)
    products = models.ForeignKey(Products,on_delete=models.SET_NULL,null=True)  
    quantity = models.PositiveIntegerField(default=1)  
    updated_at = models.DateTimeField(auto_now=True)    
    
    @property
    def sub_total(self):
        return self.products.price * self.quantity
    
    def __str__(self) -> str:
        return f"{Cart} = {self.products.name }"



