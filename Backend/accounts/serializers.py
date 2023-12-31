from rest_framework import serializers
from accounts.models import Customer


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

