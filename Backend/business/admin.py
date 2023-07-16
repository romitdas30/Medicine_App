from django.contrib import admin
from business.models import MedicalShop
# Register your models here.

class MedicalShopAdmin(admin.ModelAdmin):
    list_display = ("shop_name", "address", "city","pin", "phone","email","password")

admin.site.register(MedicalShop, MedicalShopAdmin)