# Generated by Django 5.0.6 on 2024-07-04 14:45

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0009_alter_colour_product_quantity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='colour_product',
            name='quantity',
            field=models.PositiveIntegerField(null=True, validators=[django.core.validators.MaxValueValidator(9999)]),
        ),
    ]
