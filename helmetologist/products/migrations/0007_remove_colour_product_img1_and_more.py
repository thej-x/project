# Generated by Django 5.0.6 on 2024-07-03 06:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0006_colour_product_delete_productvariant'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='colour_product',
            name='img1',
        ),
        migrations.RemoveField(
            model_name='colour_product',
            name='img2',
        ),
        migrations.RemoveField(
            model_name='colour_product',
            name='img3',
        ),
        migrations.CreateModel(
            name='Colour_image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(null=True, upload_to='products/')),
                ('colour_product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='colour_variants', to='products.colour_product')),
            ],
        ),
    ]
