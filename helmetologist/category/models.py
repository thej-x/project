from django.db import models
from django.utils.text import slugify
from PIL import Image
from django.core.validators import MinValueValidator, MaxValueValidator




class Category(models.Model):
    cat_name = models.CharField(max_length=60)
    cat_slug = models.SlugField(unique=True, blank=True)
    cat_thumbnail = models.ImageField(upload_to='Category')
    created_at = models.DateTimeField(auto_now_add=True)
    is_listed = models.BooleanField(default=True)
    is_offer_applied = models.BooleanField(default=False)
    discount_percentage = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(99)])
    
    def get_discount_percentage(self):
        if self.is_offer_applied:
            return self.discount_percentage if self.discount_percentage else 0
        return 0
    
    
    
    def save(self, *args, **kwargs):
        self.cat_slug = slugify(self.cat_name)
        super().save(*args, **kwargs)
        
        if self.cat_thumbnail:
            img = Image.open(self.cat_thumbnail.path)
            target_size = (300, 300)
            img = img.resize(target_size, Image.BICUBIC)
            img.save(self.cat_thumbnail.path)
    
    def __str__(self):
        return self.cat_name
