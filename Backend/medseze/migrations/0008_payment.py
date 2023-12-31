# Generated by Django 4.2.1 on 2023-06-22 20:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_customertoken'),
        ('medseze', '0007_alter_address_district'),
    ]

    operations = [
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_card_number', models.CharField(max_length=16)),
                ('expire_date', models.DateField()),
                ('ccv', models.CharField(max_length=3)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('customer_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.customer')),
                ('order_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='medseze.order')),
            ],
        ),
    ]
