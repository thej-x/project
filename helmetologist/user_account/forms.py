from django import forms
from category.models import Category

class ProductFilterForm(forms.Form):
    CATEGORY_CHOICES = [(c.id, c.cat_name) for c in Category.objects.all()]
    category = forms.ChoiceField(choices=[('', 'All')] + CATEGORY_CHOICES, required=False)
    min_price = forms.DecimalField(decimal_places=2, max_digits=10, required=False)
    max_price = forms.DecimalField(decimal_places=2, max_digits=10, required=False)
    stock = forms.ChoiceField(choices=[('', 'All'), ('in_stock', 'In Stock')], required=False)
    sort_by = forms.ChoiceField(
        choices=[
            ('', 'Default'),
            ('name_asc', 'Alphabetically, A-Z'),
            ('name_desc', 'Alphabetically, Z-A'),
            ('price_asc', 'Price, low to high'), 
            ('price_desc', 'Price, high to low'),
        ],
        required=False
    )