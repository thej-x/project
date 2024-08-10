from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
from .models import Category
from products.models import Products

from django.contrib import messages
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render,redirect
from django.urls import reverse
from django.shortcuts import get_object_or_404, HttpResponse
from django.contrib.auth.decorators import login_required,user_passes_test
from django.views.decorators.cache import never_cache
from django.core.files.uploadedfile import UploadedFile
from offer.models import Offer
from PIL import Image

def is_superuser(user):
    return user.is_superuser

def is_valid_image(file):
    if not isinstance(file, UploadedFile):
        return False
    try:
        Image.open(file)
        return True
    except Exception:
        return False

@csrf_exempt
@never_cache  
@login_required(login_url='/adminlogin/')
def admincategory(request):
    categories=Category.objects.all()
    offers = Offer.objects.filter(is_active =True)
    context ={
        'Categories': categories,
        'offers' : offers,
    }
    return render(request,'admincategory.html',context)


@csrf_exempt
@never_cache  
@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def add_category(request):
    if request.method == 'POST':
        cat_name = request.POST.get('cat_name').strip()
        cat_thumbnail = request.FILES.get('cat_thumbnail')

        if not cat_name or not cat_name[0].isalpha():
            messages.error(request, "Category name must start with an alphabetic character.")
            return render(request, 'addcategory.html')
        
        if Category.objects.filter(cat_name__iexact=cat_name).exists():
            messages.error(request, "Category name already exists.")
            return render(request, 'addcategory.html')
        
        if not cat_thumbnail or not is_valid_image(cat_thumbnail):
            messages.error(request, "Please upload a valid image file for the thumbnail.")
            return render(request, 'addcategory.html')

        
        new_category = Category(cat_name=cat_name, cat_thumbnail=cat_thumbnail)
        new_category.save()

        messages.success(request, "Category added successfully.")
        return redirect('admincategory')
         
    return render(request, 'addcategory.html')


def unlist_category(request, category_id):
    category = get_object_or_404(Category, pk=category_id)
    products = Products.objects.filter(category=category)
    if request.method == 'POST':
        category.is_listed = not category.is_listed  # Toggle the is_listed flag
        category.save()
        for product in products:
            product.is_listed=not product.is_listed
            product.save()
            
        return redirect('admincategory') 
    
    
    return render(request, 'admincategory.html', {'category': category})

def edit_category(request,category_id):
    try:
        data = Category.objects.get(pk=category_id)
        
        if request.method == 'POST':
            name = request.POST.get('cat_name').strip()
            thumbnail = request.FILES.get('cat_thumbnail')
            
            if not name or not name[0].isalpha():
                messages.error(request, "Field must start with a character")
                return render(request, "editcategory.html", {"data": data})   
            if thumbnail :
                if not is_valid_image(thumbnail)  :
                    messages.error(request,'Image 1 is an invalid image file')    
                    return render(request, "editcategory.html", {"data": data})
                else:
                    data.cat_thumbnail = thumbnail
                    
            if ( Category.objects.filter(cat_name__iexact=name)
                    .exclude(id=category_id)
                    .exists()
                ):

                messages.error(request, "Entered name already exists")
                return render(request, "editcategory.html", {"data": data})
            data.cat_name = name
            data.save()
            
            return redirect("admincategory")
        return render(request,"editcategory.html", {"data": data})

            
    except Exception:
        return redirect("admincategory")
    
def apply_or_notapply_offer(request,category_id):
    
    if request.method == 'POST':
        
        category = get_object_or_404(Category,id = category_id)
        offer_id = request.POST.get('offer_id')
        dissable_offer = request.POST.get('dissable')
        print(dissable_offer)
        
        if offer_id:
            offer = get_object_or_404(Offer,id=offer_id)
            if offer.offer_type == 'category':
                category.discount_percentage = offer.discount_percentage
                category.is_offer_applied = True
                category.save()
                products = Products.objects.filter(category=category)
                for product in products:
                    if product.is_offer_applied == False:
                        product.discount_percentage = category.discount_percentage
                        product.is_offer_applied = True
                        product.save()
                    else:
                        product.save()
                        
        elif dissable_offer:
            print('working')
            category.is_offer_applied =False
            category.discount_percentage = 0 
            category.save()
            products = Products.objects.filter(category=category)
            for product in products:
                product.is_offer_applied = False
                product.discount_percentage = 0
                product.save()
    return redirect(reverse('admincategory'))
            
        
        
def shop(request,shop_cat_slug):
    category = get_object_or_404(Category, cat_slug=shop_cat_slug)
    return render(request,'shop.html',{'category': category})
