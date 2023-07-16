from django.urls import path
from medseze.views import (Dashboardzview,AddressCreateAPIView,OrderView,
OrderHistoryView, AddressDeleteAPIView, CreatePaymentAPIView)





urlpatterns = [
    path('',Dashboardzview.as_view(), name ="dashboard"),
    path('addresses-book/', AddressCreateAPIView.as_view(), name='address-create'),
    path('place_order/',OrderView.as_view(), name='place order' ),
    path('order-history/',OrderHistoryView.as_view(), name='order-history' ),
    path('delete-address/<int:pk>',AddressDeleteAPIView.as_view(), name='delete-address' ),
    path('payment/',CreatePaymentAPIView.as_view(), name='create-payment' )

]
