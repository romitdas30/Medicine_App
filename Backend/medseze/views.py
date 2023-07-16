from django.shortcuts import render
from medseze.models import (Medicine,Address, Order, OrderItem, Stock)
from medseze.serializers import (MedicineSerializer, AddressSerializer, OrderItemSerializer,OrderSerializer, PaymentSerializer)
from accounts.models import Customer,CustomerToken
from accounts.serializers import CustomerRegistrationSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from medseze.permissions import IsCustomerAuthenticated
from medseze.getCustomer import getCustomer
from datetime import datetime
import uuid
import json
# Create your views here.

class Dashboardzview(APIView):
    permission_classes = [IsCustomerAuthenticated]
    def get(self, request):
        obj = getCustomer
        customer=obj.getCustomerbyToken(request)
        MedicineList = Medicine.objects.all()
        serializer = MedicineSerializer(MedicineList, many=True)
        Username = customer.name
        Product_list = serializer.data
        print(Username)
        return Response({'Product':Product_list, 'username':Username})
        # return Response(serializer.data)


    def post(self, request):
        serializer = MedicineSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "Saved successfully"
            }, status=status.HTTP_201_CREATED)




class AddressCreateAPIView(APIView):
    permission_classes = [IsCustomerAuthenticated]

    def post(self, request):
        obj = getCustomer
        customer=obj.getCustomerbyToken(request)
        serializer = AddressSerializer(data=request.data)
        if serializer.is_valid():
            customer_id = customer.id
            serializer.save(customer_id=customer_id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



    def get(self, request):
        obj = getCustomer
        customer=obj.getCustomerbyToken(request)
        customer_id=customer.id
        AddressBook = Address.objects.filter(customer_id=customer_id)
        serializer = AddressSerializer(AddressBook, many=True)
        return Response(serializer.data)

class AddressDeleteAPIView(APIView):
    permission_classes = [IsCustomerAuthenticated]
    def delete(self, request, pk):
        try:
            address = Address.objects.get(id=pk)
        except Address.DoesNotExist:
            return Response({"error": "Address not found."}, status=status.HTTP_404_NOT_FOUND)
        address.delete()
        return Response({"success": "Address deleted successfully."}, status=status.HTTP_204_NO_CONTENT)

class OrderView(APIView):
    permission_classes = [IsCustomerAuthenticated]

    def post(self, request):
        address_id = request.data.get('address_id')
        cart = request.data.get('cart')
        payment_mode = request.data.get('payment_mode')
        # total_price = request.data.get('total_price')

        # Generate a unique order ID using UUID
        order_id = uuid.uuid4()

        # Get the current timestamp for created_at
        created_at = datetime.now()

        #fetching Customer ID by using token
        obj = getCustomer
        customer=obj.getCustomerbyToken(request)
        customer_id=customer.id

        # Set the initial order status and payment status
        order_status = 'Order Placed'
        payment_status = 'Unpaid'
        
         # Create the order
        order_data = {
            'order_ID':order_id,
            'created_at': created_at,
            'order_status': order_status,
            'customer_id': customer_id,
            'address_id': address_id,
            'total_price': 0,  
            'payment_status': payment_status,
            'payment_mode':payment_mode,
            'order_items': []
        }

        order_serializer = OrderSerializer(data=order_data)
        
        order_serializer.is_valid(raise_exception=True)
        order = order_serializer.save()
        #print("Hello Romit")
    
        total_price = 0
        # Create order items and update stock
        for item in cart:
            Medicine_id = item.get('id')
            print(Medicine_id)
            quantity = item.get('quantity')
            print(quantity)
            # Fetch the medicine price from the database
            stock_of_medicine = Stock.objects.get(medicine_id=Medicine_id)
            medicine = Medicine.objects.get(id=Medicine_id)
            price = medicine.price

            # Calculate the item price
            item_price = price * quantity
            print(item_price)
            total_price += item_price
            print(total_price)
            print(order.order_ID)
            # Create the order item
            order_item_data = {
                'order_ID': order.order_ID,
                'medicine_Id': Medicine_id,
                'price': price,
                'quantity': quantity
            }
            
            order_item_serializer = OrderItemSerializer(data=order_item_data)
            order_item_serializer.is_valid(raise_exception=True)
            order_item_serializer.save()

            # Update the stock quantity
            stock_of_medicine.quantity -= quantity
            stock_of_medicine.save()

        # Update the total price of the order
        order.total_price = total_price
        print(order.total_price)
        order.save()
        return Response({'message': 'Order created successfully','order_id':order.order_ID,'total':order.total_price})

class CreatePaymentAPIView(APIView):
    permission_classes = [IsCustomerAuthenticated]
    def post(self, request, format=None):
        obj = getCustomer
        customer=obj.getCustomerbyToken(request)
        serializer = PaymentSerializer(data=request.data)
        if serializer.is_valid():
            print(customer.id)
            customer_id = customer
            payment=serializer.save(customer_id=customer_id)

            order = payment.order_id
            print(order)
            order.payment_status = "Paid"
            order.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class OrderHistoryView(APIView):
    permission_classes = [IsCustomerAuthenticated]

    def get(self, request):
        order_history=[]
        obj = getCustomer
        customer=obj.getCustomerbyToken(request)
        customer_id=customer.id
        orders = Order.objects.filter(customer_id=customer_id)
        # print(orders)
        
        for order in orders:
            order_data={
                'order_id':order.order_ID,
                'created_at':order.created_at,
                'order_status':order.order_status,
                'address_id':order.address_id.address_line_1,
                'total_price':order.total_price,
                'payment_mode':order.payment_mode,
                'payment_status':order.payment_status,
                'order_items':[]
            }

            order_items = OrderItem.objects.filter(order_ID = order.order_ID)

            for item in order_items:
                medicine = Medicine.objects.get(id=item.medicine_Id.id)
                stock_quantity = Stock.objects.get(medicine_id=medicine)
                # if(item.quantity>stock_quantity.quantity):
                order_item_data={
                    'id':item.medicine_Id.id,
                    'title':item.medicine_Id.title,
                    'company':item.medicine_Id.company,
                    'quantity':item.quantity,
                    'price':item.medicine_Id.price,
                    'stock_quantity':  stock_quantity.quantity,                  
                    }
                
                order_data['order_items'].append(order_item_data)
            
            order_history.append(order_data)

        return Response(order_history)