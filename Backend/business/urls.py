from django.urls import path
from business.views import (AllMedicalShopView, MedicalShopRegistrationView)
urlpatterns = [
    path("",AllMedicalShopView.as_view(),name="All_store"),
    path("store-registration/",MedicalShopRegistrationView.as_view(),name="store_registration"),
]