from django.contrib import admin
from accounts.models import CustomerToken
from accounts.models import Customer
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Register your models here.

class CustomerAdmin(BaseUserAdmin):
    # The forms to add and change user instances

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ["id","email", "name","mobile_number", "is_admin"]
    list_filter = ["is_admin"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Personal info", {"fields": ["name","mobile_number"]}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]

    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["email", "name","mobile_number", "password1", "password2"],
            },
        ),
    ]

    ordering = ["email"]
    filter_horizontal = []



@admin.register(CustomerToken)
class CustomerTokenAdmin(admin.ModelAdmin):
    # Customize the display fields, search fields, etc. if needed
    list_display = ('token', 'customer')
    

# Now register the new UserAdmin...
admin.site.register(Customer, CustomerAdmin)