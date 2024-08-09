from django.contrib import admin
from django.urls import path
from .views import *
from django.contrib.auth.views import LogoutView

urlpatterns = [       
    path('adminoffers/', adminoffers , name='adminoffers'),
    path('add_offer/', add_offer, name='add_offer'),
    path('offer_inactive/<int:offer_id>',offer_inactive,name='offer_inactive'),
    path('edit_offer/<int:offer_id>', edit_offer, name='edit_offer'),
    path('delete_offer/<int:offer_id>', delete_offer, name='delete_offer'),
    # path('get_offer/<int:offer_id>/', get_offer, name='get_offer'),
    ]