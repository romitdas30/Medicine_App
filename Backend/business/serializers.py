from rest_framework import serializers
from business.models import MedicalShop

class MedicalShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicalShop
        fields = ['shop_name','address', 'city','pin','phone','email','password']
        #fields = '__all__' 
        extra_kwargs={'password':{'write_only':True}}