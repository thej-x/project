# Generated by Django 5.0.6 on 2024-08-07 15:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0003_payment_razorpay_payment_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='payment',
            old_name='razorpay_payment_id',
            new_name='razorpay_order_id',
        ),
    ]
