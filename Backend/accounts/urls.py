from django.urls import path
from accounts.views import (CustomerRegistrationView, CustomerLogin)


urlpatterns = [
    path('registration/', CustomerRegistrationView.as_view(), name="registration"),
    path('login/', CustomerLogin.as_view(), name="login"),
]
