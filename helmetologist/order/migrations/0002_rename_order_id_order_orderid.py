# Generated by Django 5.0.6 on 2024-07-27 12:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='order_id',
            new_name='orderid',
        ),
    ]
