# Generated by Django 4.2.1 on 2023-06-18 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('medseze', '0004_alter_order_order_status_alter_order_total_price'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='payment_mode',
            field=models.CharField(blank=True, choices=[('Cash on Delivery', 'Cash on Delivery'), ('Credit/Debit Cards', 'Credit/Debit Cards'), ('UPI', 'UPI'), ('Net Banking', 'Net Banking')], max_length=100, null=True),
        ),
    ]