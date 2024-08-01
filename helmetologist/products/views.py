from django.shortcuts import render,redirect
from .models import Products,Category,ProductImage
from django.http import HttpResponse,JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib import messages
from django.views.decorators.cache import never_cache
from django.contrib.auth.decorators import login_required,user_passes_test
from django.core.files.base import ContentFile
import base64
from django.db import transaction
from cart.models import *
from django.core.files.storage import default_storage
from PIL import Image
from io import BytesIO
from django.core.files.uploadedfile import UploadedFile

# Create your views here.

def is_superuser(user):
    return user.is_superuser


def is_valid_image(image):
    try:
        img = Image.open(image)
        img.verify()  
        return True
    except (IOError, SyntaxError) as e:
        return False



@never_cache
@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def adminproducts(request):
    products = Products.objects.all()

    
    context = {
        'Products':products,
        
    }
    return render(request,'adminproducts.html',context)



@never_cache
@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def unlist_product(request,products_id):
        product = get_object_or_404(Products, pk=products_id)
        if request.method == 'POST':
            product.is_listed = not product.is_listed
            product.save()
            return redirect('adminproducts')
        return render('adminproducts',{'products':product})
    
    


@never_cache
@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def add_products(request):
    if request.method == 'POST':
        product_name = request.POST.get('product_name')
        price = request.POST.get('price')
        description = request.POST.get('description')
        details = request.POST.get('details')
        category_id = request.POST.get('category')
        thumbnail = request.FILES.get('thumbnail')
        quantity = request.POST.get('quantity')

        if not all([product_name, price, description, details, category_id, thumbnail, quantity]):
            return HttpResponse("All fields are required", status=400)
        try:
            quantity = int(quantity)
            if quantity <= 0:
                raise ValueError
        except ValueError:
            messages.error(request, "Invalid quantity")

        try:
            category = Category.objects.get(id=category_id)
        except Category.DoesNotExist:
            messages.error(request, "Category does not exist")

        product = Products.objects.create(
            name=product_name,
            price=price,
            description=description,
            details=details,
            category=category,
            thumbnail=thumbnail,
            quantity=quantity,
        )

        cropped_images = request.POST.get('cropped_images')
        if cropped_images:
            image_list = cropped_images.split('###')
            for base64_image in image_list:
                format, imgstr = base64_image.split(';base64,')
                ext = format.split('/')[-1]
                img_data = ContentFile(base64.b64decode(imgstr), name=f"{product_name}.{ext}")
                
                ProductImage.objects.create(
                    product=product,
                    image=img_data
                )

        return redirect('adminproducts')

    categories = Category.objects.all()
    return render(request, 'add_product.html', {'Categories': categories})



    
def edit_product(request, product_id):
    product = get_object_or_404(Products, id=product_id)
    images = ProductImage.objects.filter(product=product)
    categories = Category.objects.all()

    if request.method == 'POST':
        name = request.POST.get('name')
        price = request.POST.get('price')
        description = request.POST.get('description')
        details = request.POST.get('details')
        quantity = request.POST.get('quantity')
        category_id = request.POST.get('category')
        thumbnail = request.FILES.get('thumbnail')

        if thumbnail:
            if not is_valid_image(thumbnail):
                messages.error(request, 'Thumbnail is an invalid image file')
                return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})
            else:
                product.thumbnail = thumbnail

        category = get_object_or_404(Category, id=category_id)

        cropped_images = request.POST.get('croppedImages')

        if cropped_images:
            
            ProductImage.objects.filter(product=product).delete()

            image_list = cropped_images.split('###')
            for base64_image in image_list:
                if base64_image:
                    format, imgstr = base64_image.split(';base64,')
                    ext = format.split('/')[-1]
                    img_data = ContentFile(base64.b64decode(imgstr), name=f"{name}.{ext}")

                   
                    if not is_valid_image(img_data):
                        messages.error(request, 'One or more images are invalid image files')
                        return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})

                   
                    ProductImage.objects.create(product=product, image=img_data)

            messages.success(request, 'Product updated successfully')
            return redirect('adminproducts')

        
        product.name = name
        product.price = price
        product.description = description
        product.category = category
        product.quantity = quantity
        product.details = details

        product.save()
        messages.success(request, 'Product updated successfully')
        return redirect('adminproducts')

    context = {
        'product': product,
        'images': images,
        'Categories': categories,
    }

    return render(request, 'edit_product.html', context)
        
        
def product_view(request,product_slug,product_id):
     
    product = get_object_or_404(Products, slug=product_slug,id=product_id)    
    category = product.category 
    images = ProductImage.objects.filter(product=product)
    realted_products = Products.objects.filter(category=category)
    print(realted_products)
    
    if request.user.is_authenticated:
        user = request.user
        user_cart, created = Cart.objects.get_or_create(user=user)
        cart_items = user_cart.cartproducts_set.count() 
        wishlist_items = Wishlist.objects.filter(user=user).count()
    else:
        cart_items = 0
        

    
    context = {
        'product': product,
        'images': images,
        'cart_count': cart_items,
        'wishlist_items' : wishlist_items,
        'related_products' : realted_products,
    }
    return render(request, 'product.html', context)

