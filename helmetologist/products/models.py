from django.db import models
from PIL import Image
from django.utils.text import slugify
from category.models import Category
from django.core.validators import MaxValueValidator,MinValueValidator

# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=60)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    thumbnail = models.ImageField(upload_to="products/", null=True)
    description = models.TextField()
    details = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_listed = models.BooleanField(default=True)
    slug = models.SlugField(unique=False, blank=True)
    is_offer_applied = models.BooleanField(default=False)
    discount_percentage = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(99)])
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, editable=False) 
    
    
    def get_highest_discount_percentage(self):
        product_discount = self.discount_percentage if self.discount_percentage else 0
        category_discount = 0
        
        # Check if there's an offer applied to the category
        if self.category and self.category.is_offer_applied:
            # Assuming `Category` has a field `discount_percentage` to store the discount
            category_discount = self.category.discount_percentage if self.category.discount_percentage else 0
        
        return max(product_discount, category_discount)
    
    def get_discounted_price(self):
        discount_percentage = self.get_highest_discount_percentage()
        if discount_percentage:
            return self.price * (1 - discount_percentage / 100)
        return self.price
    def save(self, *args, **kwargs):
        # Override discount_percentage with the highest available discount
        self.discount_percentage = self.get_highest_discount_percentage()
        # Calculate the discounted price based on the overridden discount percentage
        self.discounted_price = self.get_discounted_price()
        super(Products, self).save(*args, **kwargs)
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        
        super().save(*args, **kwargs)
        
        
        if self.thumbnail:
            img = Image.open(self.thumbnail.path)
            target_size = (800, 960)
            img = img.resize(target_size, Image.BICUBIC)
            img.save(self.thumbnail.path)
    
    def __str__(self):
        return self.name
    
class ProductImage(models.Model):
    product = models.ForeignKey(Products, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='products/')
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.product.name