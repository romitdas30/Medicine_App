from rest_framework import serializers
from medseze.models import (Medicine, Stock, Customer,Address, Order, OrderItem, Payment)




class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = ['quantity']

class MedicineSerializer(serializers.ModelSerializer):
     stock = StockSerializer(source='stock_set', many=True, read_only=True)
     class Meta:
        model = Medicine
        fields = ['id', 'title', 'description', 'company', 'price', 'stock']
     def get_stock_quantity(self, obj):
        # Retrieve the stock quantity for the medicine
        stock = Stock.objects.filter(medicine_id=obj).first()
        if stock:
            return stock.quantity
        return 0



class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ("id","address_line_1","address_line_2","city","district","state","pin")

class CustomerRegistrationSerializer(serializers.ModelSerializer):
   # addresses = AddressSerializer(many=True, read_only=True)
   password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
   class Meta:
      model = Customer
      fields = ("email","name","mobile_number","password","password2")
      extra_kwargs = {
         'password':{'write_only':True}
      }
   def validate(self, attrs):
    password = attrs.get('password')
    password2 = attrs.get('password2')
    if password != password2:
      raise serializers.ValidationError("Password and Confirm Password doesn't match")
    return attrs

   def create(self, validate_data):
       return Customer.objects.create_user(**validate_data)

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields ="__all__"

class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = ['order_ID', 'created_at', 'order_status', 'customer_id', 'address_id', 'total_price','payment_mode', 'payment_status', 'order_items']
        read_only_fields = ['order_ID', 'created_at', 'total_price']

    def create(self, validated_data):
        order_items_data = validated_data.pop('order_items')
        order = Order.objects.create(**validated_data)

        for item_data in order_items_data:
            OrderItem.objects.create(order=order, **item_data)

        return order

class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ('id', 'order_card_number', 'expire_date', 'ccv', 'total_price', 'order_id')
   