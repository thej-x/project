from django.db import models
from django.contrib.auth.models import User
from products.models import *
from user_account.models import *
from django.utils import timezone

# Create your models here.

class Wallet(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    updated_date = models.DateTimeField(auto_now=True)
    approvel = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.user.username}'s Wallet"

class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('credit', 'Credit'),
        ('debit', 'Debit'),
    )
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ], default='pending')
    wallet = models.ForeignKey(Wallet, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=6, choices=TRANSACTION_TYPES)
    date = models.DateTimeField(auto_now_add=True)
    

    def __str__(self):
        return f"{self.transaction_type.title()} of {self.amount} on {self.date}"




class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ("COD", "Cash on Delivery"),
        ("Razorpay", "Razorpay"),
        ("Wallet","Wallet"),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default="pending", null=True)
    Transaction_id= models.CharField(max_length=20, blank=True, null=True)
    
    
    
class Order(models.Model):
        
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE)
    billing_address = models.ForeignKey(Address, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    coupon_id = models.CharField(max_length=100, blank=True, null=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    razorpay_order_id = models.CharField(max_length=100,blank=True,null=True)
    razorpay_payment_id = models.CharField(max_length=100,blank=True,null=True)
    razorpay_payment_signature = models.CharField(max_length=100,blank=True,null=True)
    coupon_applied = models.BooleanField(default=False)
    
    
    payment_method = models.CharField(
        max_length=20,
        choices=[("COD", "Cash on Delivery"), ("Razorpay", "Razorpay")],
        null=True,
        default=True,
    )
    orderid = models.CharField(max_length=20, unique=True, default=None, null=True)
    
    
    
class OrderProduct(models.Model):

    ORDER_STATUS_CHOICES = [
        ("Pending", "Pending"),
        ("Processing", "Processing"),
        ("Shipped", "Shipped"),
        ("Delivered", "Delivered"),
        ("Payment_failed", "Payment_failed"),
        ("Cancelled", "Cancelled"),
        ("Returned", "Returned"),
        ]

    order = models.ForeignKey(Order, related_name="order", on_delete=models.CASCADE)
    product = models.ForeignKey(Products, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    quantity = models.PositiveIntegerField(default=1)
    status = models.CharField(max_length=20, choices=ORDER_STATUS_CHOICES, default="Pending", null=True)
    review = models.TextField( blank=True, null=True)
    rating = models.IntegerField(default=0, null=True)  
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True) 
    delivery_date = models.DateTimeField(null=True, blank=True)
    cancellation_reason = models.TextField(blank=True, null=True)
    trackig_id = models.CharField(max_length=20, unique=True, default=None, null=True)
    return_status = models.CharField(max_length=30, default=False, null=True)
    discount_percentage = models.IntegerField(null=True, blank=True)  

    

    def set_expected_delivery_date(self):
        
        if self.order and self.order.created_at:

            expected_delivery_date = self.order.created_at + timezone.timedelta(
                days=7
            )
            self.delivery_date = expected_delivery_date.date()
    def save(self, *args, **kwargs):
        if self.delivery_date is None:
            self.set_expected_delivery_date()
        super().save(*args, **kwargs)
        
    @property
    def totel_price(self):
        
        amount=self.quantity * self.price
        return amount
    
    
    
    