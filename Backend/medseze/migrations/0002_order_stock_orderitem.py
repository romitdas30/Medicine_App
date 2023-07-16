# Generated by Django 4.2.1 on 2023-06-18 05:24

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('medseze', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('order_ID', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('order_status', models.CharField(blank=True, choices=[('Order Placed', 'Order Placed'), ('Order Dispatch', 'Order dispatch'), ('Order Delivered', 'Order Delivered')], max_length=50, null=True)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('payment_status', models.CharField(blank=True, choices=[('Paid', 'Paid'), ('Unpaid', 'Unpaid')], max_length=100, null=True)),
                ('address_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='medseze.address')),
                ('customer_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Stock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField()),
                ('last_updated', models.DateTimeField(auto_now=True)),
                ('medicine_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='medseze.medicine')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantity', models.PositiveIntegerField()),
                ('medicine_Id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='medseze.medicine')),
                ('order_ID', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='medseze.order')),
            ],
        ),
    ]