from django.db import models
from PIL import Image
from django.utils.text import slugify
from category.models import Category

# Create your models here.
class Products(models.Model):
    name = models.CharField(max_length=60)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    thumbnail = models.ImageField(upload_to="products/", null=True)
    description = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    
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
    
class Colour_product(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE, related_name='colour_variants')
    color_name = models.CharField(max_length=50)
    is_listed = models.BooleanField(default=True)
    def __str__(self):
        return f"{self.color_name} ({self.product.name})"

class Colour_image(models.Model):
    colour_product = models.ForeignKey(Colour_product, on_delete=models.CASCADE, related_name='colour_variants')
    img = models.ImageField(upload_to="products/", null=True)
    
    def __str__(self):
        return f"{self.colour_product.product}"   