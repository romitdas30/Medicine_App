from django.shortcuts import render
from accounts.models import Customer, CustomerToken
from accounts.serializers import CustomerRegistrationSerializer
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from accounts.tokens import create_customer_token
import json
# Create your views here.

class CustomerRegistrationView(APIView):

  def get(self,request):
    users = Customer.objects.all()
    serializer = CustomerRegistrationSerializer(users, many=True)
    return Response(serializer.data)
  
  def post(self, request):
    serializer = CustomerRegistrationSerializer(data=request.data)

    if serializer.is_valid(raise_exception=True):
        customer = serializer.save()
        customer_token = create_customer_token(customer=customer)
        created_token = json.dumps(customer_token.token)
        created_token=json.loads(created_token)
        return Response({'msg':'Registration Successful','token':str(created_token)}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)




class CustomerLogin(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authenticate the customer
        user = authenticate(request, email=email, password=password)
        if user:
            # Fetch the CustomerToken of the authenticated customer
         
                customer_token = CustomerToken.objects.get(customer=user)
                # Use the customer_token object as needed
                token = customer_token.token
                return Response({'msg':'Login Successful','token':token})
        else:
            return Response({'msg': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)