# Generated by Django 5.0.6 on 2024-07-06 13:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_account', '0007_address_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='phone',
            field=models.IntegerField(max_length=15),
        ),
    ]
