from rest_framework.authentication import TokenAuthentication
from accounts.models import CustomerToken

class CustomTokenAuthentication(TokenAuthentication):
    model = CustomerToken
