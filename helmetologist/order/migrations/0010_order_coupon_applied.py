# Generated by Django 5.0.6 on 2024-08-15 14:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0009_remove_orderproduct_request_status_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='coupon_applied',
            field=models.BooleanField(default=False),
        ),
    ]
