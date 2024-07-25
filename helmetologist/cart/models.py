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


class Cart(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE,null=True)
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

