from django import forms
from .models import Products, colour_product

class ProductsForm(forms.ModelForm):
    class Meta:
        model = Products
        fields = ['name', 'price', 'thumbnail', 'description', 'category', 'is_listed']

class ColourProductForm(forms.ModelForm):
    class Meta:
        model = colour_product
        fields = ['color_name', 'img1', 'img2', 'img3', 'is_listed']


