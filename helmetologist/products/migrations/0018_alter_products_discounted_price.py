# Generated by Django 5.0.6 on 2024-08-10 11:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0017_alter_products_discounted_price'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='discounted_price',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]
