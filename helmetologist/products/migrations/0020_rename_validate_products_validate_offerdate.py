# Generated by Django 5.0.6 on 2024-08-12 12:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0019_products_validate'),
    ]

    operations = [
        migrations.RenameField(
            model_name='products',
            old_name='validate',
            new_name='validate_offerdate',
        ),
    ]
