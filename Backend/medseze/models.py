from django.db import models
from accounts.models import Customer
import uuid
# Create your models here.

ORDER_STATUS =(
    # ("Pending", "Pending"),
    ("Order Placed", "Order Placed"),
    ("Order Dispatch", "Order dispatch"),
    ("Order Delivered", "Order Delivered")
)

PAYMENT_STATUS=(
    ("Paid","Paid"),
    ("Unpaid","Unpaid")
)

PAYMENT_MODE=(
    ("Cash on Delivery","Cash on Delivery"),
    ("Credit/Debit Cards","Credit/Debit Cards"),
    ("UPI","UPI"),
    ("Net Banking","Net Banking")
)

CITY=(
    ("Jadavpur","Jadavpur"),
    ("Dum Dum","Dum Dum"),
    ("Bidhannagar","Bidhannagar"),
    ("Park circus","Park circus"),
    ("Kalyani","Kalyani")
)

DISTRICT=(
    ("Nadia","Nadia"),
    ("North 24 parganas","North 24 parganas")
)


# medicine model
class Medicine(models.Model):
    title = models.CharField(max_length=200)
    description = models.CharField(max_length=5000)
    company = models.CharField(max_length=200)
    price = models.FloatField()

    def __str__(self):
        return self.title



# Address model
class Address(models.Model):
    address_line_1 = models.CharField(max_length=100)
    address_line_2 = models.CharField(max_length=100, blank=True, null=True)
    city = models.CharField(max_length=50, choices=CITY)
    district = models.CharField(max_length=50,  choices=DISTRICT)
    state = models.CharField(max_length=50)
    pin = models.CharField(max_length=6)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.address_line_1}, {self.city}, {self.state}"


class Order(models.Model):
    order_ID = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    order_status = models.CharField(max_length=50, blank=True, null=True, choices=ORDER_STATUS)
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE) 
    address_id = models.ForeignKey(Address, on_delete=models.CASCADE)  
    total_price = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    payment_mode = models.CharField(max_length=100, blank=True, null=True, choices=PAYMENT_MODE)
    payment_status = models.CharField(max_length=100, blank=True, null=True, choices=PAYMENT_STATUS)

    def __str__(self):
        return f"{self.order_ID}"


class OrderItem(models.Model):
    medicine_Id = models.ForeignKey(Medicine, on_delete=models.CASCADE)  # Assuming you have a Medicine model
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField()
    order_ID = models.ForeignKey(Order, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.medicine_Id}, {self.quantity}, {self.price}"



class Stock(models.Model):
    medicine_id = models.ForeignKey(Medicine, on_delete=models.CASCADE)  # Assuming you have a Medicine model
    quantity = models.PositiveIntegerField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.medicine_id} - {self.quantity} - {self.last_updated}"



class Payment(models.Model):
    order_card_number = models.CharField(max_length=16)
    expire_date = models.CharField(max_length=7)
    ccv = models.CharField(max_length=3)
    customer_id = models.ForeignKey(Customer, on_delete=models.CASCADE) 
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    order_id = models.ForeignKey(Order, on_delete=models.CASCADE)

    def __str__(self):
        return f"Payment #{self.id}"