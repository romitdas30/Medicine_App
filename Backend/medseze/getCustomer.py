from accounts.models import CustomerToken

class getCustomer():
    def getCustomerbyToken(request):
        token_header = request.META.get('HTTP_AUTHORIZATION')
       
        if token_header:
            # Extract the token value from the Authorization header
            _, token_value = token_header.split()
            customer_token = CustomerToken.objects.get(token=token_value)
            # Retrieve the associated customer
            customer = customer_token.customer
           
            return customer