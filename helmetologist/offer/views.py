from django.shortcuts import render
from django.contrib.auth.decorators import login_required,user_passes_test
from django.contrib import messages
from django.views.decorators.cache import never_cache
from user_account.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST




from django.shortcuts import render, redirect, get_object_or_404

from django.views.decorators.http import require_POST
from .models import Offer, Products,Category
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from django.views.decorators.http import require_http_methods
from django.contrib.auth.decorators import user_passes_test
from .validators import validate_offer_data
from django.core.exceptions import ValidationError
# Create your views here.

def is_superuser(user):
    return user.is_superuser





@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def adminoffers(request):
    
    offers = Offer.objects.all()   
    
    context = {
        'offers' : offers, 
    }
    return render(request,'adminoffer.html',context)

@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def add_offer(request):
    errors = []
    if request.method == 'POST':
        name = request.POST.get('name')
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        discount_percentage = request.POST.get('discount_percentage')
        is_active = request.POST.get('is_active') == 'True'
        offer_type = request.POST.get('offer_type')

        try:
            validate_offer_data(name, start_date, end_date, discount_percentage)

            Offer.objects.create(
                name=name,
                start_date=start_date,
                end_date=end_date,
                discount_percentage=discount_percentage,
                is_active=is_active,
                offer_type=offer_type
            )
            return redirect('adminoffers')
        except ValidationError as e:
            errors = e.messages

    return render(request, 'add_offer.html', {'messages': errors})
    


@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
@csrf_exempt
def edit_offer(request, offer_id):
    offer = get_object_or_404(Offer, id=offer_id)
    errors = []

    if request.method == 'POST':
        name = request.POST.get('name')
        start_date = request.POST.get('start_date')
        end_date = request.POST.get('end_date')
        discount_percentage = request.POST.get('discount_percentage')
        is_active = request.POST.get('is_active') == 'True'
        offer_type = request.POST.get('offer_type')

        try:
            validate_offer_data(name, start_date, end_date, discount_percentage)
            
            
            offer.name = name
            offer.start_date = start_date
            offer.end_date = end_date
            offer.discount_percentage = discount_percentage
            offer.is_active = is_active
            offer.offer_type = offer_type

            offer.save()

            messages.success(request, 'Offer has been updated successfully.')
            return redirect('adminoffers')
        except ValidationError as e:
            errors = e.messages

    return render(request, 'edit_offer.html', {'offer': offer, 'messages': errors})

@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
@csrf_exempt
def delete_offer(request,offer_id):
        offer = Offer.objects.get(id=offer_id)
        offer.delete()
        return redirect('adminoffers')

@require_POST
def offer_inactive(request, offer_id):
    offer = get_object_or_404(Offer, id=offer_id)
    offer.is_active = not offer.is_active
    offer.save()
    return redirect('adminoffers')