from django.shortcuts import render
from django.contrib.auth import authenticate,login
from rest_framework import views, status
from rest_framework.response import Response
from business.serializers import MedicalShopSerializer
from django.contrib.auth.hashers import make_password
from business.models import MedicalShop

class MedicalShopRegistrationView(views.APIView):
    def post(self, request):
        serializer = MedicalShopSerializer(data=request.data)
        if serializer.is_valid():
            hash_password = make_password(serializer.validated_data['password'])
            shop = serializer.save(password=hash_password)

            return Response({'status':'Success', 'data':serializer.data}, status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AllMedicalShopView(views.APIView):
    def get(self, request):
        MedicalShopList = MedicalShop.objects.all()
        serializer = MedicalShopSerializer(MedicalShopList, many=True)
        return Response(serializer.data)