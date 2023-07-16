from django.db import models

# Create your models here.

class MedicalShop(models.Model):
    shop_name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    pin = models.CharField(max_length=255)
    phone = models.CharField(max_length=255)
    email = models.EmailField()
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.shop_name

    