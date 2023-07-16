from rest_framework.authtoken.models import Token
from accounts.models import CustomerToken
import secrets
def create_customer_token(customer):
    # Create a new token for the customer
    token_value = secrets.token_hex(16)
    created_token = CustomerToken.objects.create(token=token_value, customer=customer)
    return created_token
    