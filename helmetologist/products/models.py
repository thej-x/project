from django.db import models
from PIL import Image
from django.utils.text import slugify
from category.models import Category
from django.core.validators import MaxValueValidator

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