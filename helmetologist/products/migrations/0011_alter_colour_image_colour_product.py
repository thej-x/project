# Generated by Django 5.0.6 on 2024-07-05 05:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0010_alter_colour_product_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='colour_image',
            name='colour_product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='varient', to='products.colour_product'),
        ),
    ]
