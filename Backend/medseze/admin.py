from django.contrib import admin
from medseze.models import( Medicine, Customer, Address, Order, OrderItem, Stock, Payment)

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Register your models here.

class MedicineAdmin(admin.ModelAdmin):
    list_display=("id","title","description","company","price")

admin.site.register(Medicine, MedicineAdmin)


class AddressAdmin(admin.ModelAdmin):
    list_display=("id","address_line_1","address_line_2","city","district","state","pin","customer")

admin.site.register(Address, AddressAdmin)

class OrderAdmin(admin.ModelAdmin):
    list_display=("order_ID","created_at","order_status","customer_id","address_id","total_price","payment_mode","payment_status")

admin.site.register(Order, OrderAdmin)

class OrderItemAdmin(admin.ModelAdmin):
    list_display=("id","medicine_Id","price","quantity","order_ID")

admin.site.register(OrderItem, OrderItemAdmin)


class StockAdmin(admin.ModelAdmin):
    list_display=("id","medicine_id","quantity","last_updated")

admin.site.register(Stock,StockAdmin)


class PaymentAdmin(admin.ModelAdmin):
    list_display = ('id', 'order_card_number', 'expire_date', 'ccv', 'customer_id', 'total_price', 'order_id')
    list_filter = ('expire_date',)
    

admin.site.register(Payment, PaymentAdmin)
