from rest_framework.permissions import BasePermission
from rest_framework.response import Response
from accounts.models import CustomerToken

class IsCustomerAuthenticated(BasePermission):
    def has_permission(self, request, view):
        # Check if the customer is authenticated using the token
        token_header = request.META.get('HTTP_AUTHORIZATION')

        if token_header:
            # Extract the token value from the Authorization header
            _, token_value = token_header.split()

            
            # Retrieve the CustomerToken object based on the token value
            customer_token = CustomerToken.objects.get(token=token_value)
            # Retrieve the associated customer
            customer = customer_token.customer

            # Validate the token and authenticate the customer
            if customer_token:
                # Set the customer as authenticated
                request.customer = customer
                return True

        else:   
            return False
