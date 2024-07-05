from django.shortcuts import render,redirect
from .models import Products,Colour_product,Colour_image,Category
from django.http import HttpResponse,JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.cache import never_cache
from django.contrib.auth.decorators import login_required,user_passes_test
from django.core.files.base import ContentFile
import base64
from django.db import transaction
from django.core.files.storage import default_storage
# Create your views here.

def is_superuser(user):
    return user.is_superuser

@never_cache
@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def adminproducts(request):
    products = Products.objects.all()
    variant_name = Colour_product.objects.all()
    varient_image = Colour_image.objects.all()
    context = {
        'Products':products,
        'Variant_name' : variant_name,
        'Variant_image' : varient_image,
    }
    return render(request,'adminproducts.html',context)




def unlist_product(request,products_id):
        product = get_object_or_404(Products, pk=products_id)
        if request.method == 'POST':
            product.is_listed = not product.is_listed
            product.save()
            return redirect('adminproducts')
        return render('adminproducts',{'products':product})
    
    



def add_products(request):
    if request.method == 'POST':
        product_name = request.POST.get('product_name')
        price = request.POST.get('price')
        description = request.POST.get('description')
        category_id = request.POST.get('category')
        thumbnail = request.FILES.get('thumbnail')
        colour_variant_name = request.POST.get('colour_variant_name')
        quantity = request.POST.get('quantity')
        
        # Fetch the category instance
        try:
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            return HttpResponse("Category does not exist", status=400)

        product = Products.objects.create(
            name=product_name,
            price=price,
            description=description,
            category=category,
            thumbnail=thumbnail
        )

        colour_variant = Colour_product.objects.create(
            product=product,
            color_name=colour_variant_name,
            quantity=quantity,

        )
        
        
        cropped_images = request.POST.get('croppedImages')
        
        
        if cropped_images:
            image_list = cropped_images.split('###')
            for base64_image in image_list:
                format, imgstr = base64_image.split(';base64,')
                ext = format.split('/')[-1]
                img_data = ContentFile(base64.b64decode(imgstr), name=f"{product_name}_{colour_variant_name}.{ext}")

                
                Colour_image.objects.create(
                    colour_product=colour_variant,
                    img=img_data
                )

        return redirect('adminproducts')  

    categories = Category.objects.all()
    return render(request, 'add_product.html', {'Categories': categories})


def add_variant(request, products_id):
    product = Products.objects.get(id = products_id)
    if request.method == 'POST':
        colour_variant_name = request.POST.get('variant')
        quantity = request.POST.get('quantity')
        cropped_images = request.POST.get('croppedImages')
        

        colour_variant = Colour_product.objects.create(
            product=product,
            color_name=colour_variant_name,
            quantity=quantity,
        )

        if cropped_images:
            image_list = cropped_images.split('###')
            for base64_image in image_list:
                format, imgstr = base64_image.split(';base64,')
                ext = format.split('/')[-1]
                img_data = ContentFile(base64.b64decode(imgstr), name=f"{colour_variant_name}.{ext}")

                Colour_image.objects.create(
                    colour_product=colour_variant,
                    img=img_data
                )

        return redirect('adminproducts')

    
    return render(request, 'add_variant.html',{'product': product})
        
def product_view(request, product_slug,product_id):
    product = get_object_or_404(Products, slug = product_slug)
    colour_product = Colour_product.objects.get(id = product_id)
    color_images = Colour_image.objects.filter(colour_product=colour_product)
    products = Products.objects.get(id = colour_product.product.id)
    item = Colour_product.objects.filter(product=colour_product.product.id, is_listed=True)
    context = {
        'product': product,
        'Colour_product': colour_product,
        'color_images': color_images,
        'Item': item,
        'Products': products,
        }
    return render(request, 'product.html',context )

