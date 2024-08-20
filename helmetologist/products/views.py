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
from offer.models import Offer
from django.urls import reverse
from django.core.exceptions import ValidationError
from .validators import validate_product_data
from datetime import date

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
    offers = Offer.objects.filter(is_active = True)
   
    context = {
        'Products': products,
        'offers' : offers,
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
        offer_id = request.POST.get('offer_id')
        thumbnail = request.FILES.get('thumbnail')
        quantity = request.POST.get('quantity')

        # Basic validation
        if not all([product_name, price, description, details, category_id, thumbnail, quantity]):
            messages.error(request, "All fields are required")
            return redirect('add_products')

        if not (3 <= len(product_name) <= 50):
            messages.error(request, "Product name must be between 3 and 50 characters")
            return redirect('add_products')

        if not product_name.isalnum():
            messages.error(request, "Product name can only contain letters and numbers")
            return redirect('add_products')

        try:
            price = float(price)
            if price <= 0:
                messages.error(request, "Price must be a positive number")
                return redirect('add_products')
        except ValueError:
            messages.error(request, "Invalid price format")
            return redirect('add_products')

        if len(description) < 10:
            messages.error(request, "Description must be at least 10 characters")
            return redirect('add_products')

        if len(details) < 10:
            messages.error(request, "Details must be at least 10 characters")
            return redirect('add_products')

        # Thumbnail validation
        allowed_extensions = ['jpg', 'jpeg', 'png', 'gif']
        file_extension = thumbnail.name.split('.')[-1].lower()
        if file_extension not in allowed_extensions:
            messages.error(request, "Invalid file type for thumbnail. Allowed: jpg, jpeg, png, gif")
            return redirect('add_products')
        try:
            category = get_object_or_404(Category, id=category_id)
        except ValidationError:
            messages.error(request, "Invalid category selected")
            return redirect('add_products')

        # Offer validation
        discount_percentage = None
        is_offer_applied = False
        if offer_id:
            try:
                offer = get_object_or_404(Offer, id=offer_id)
                if offer.offer_type == 'product' and offer.is_valid:
                    discount_percentage = offer.discount_percentage
                    is_offer_applied = True
                else:
                    messages.error(request, "No valid offer available")
                    return redirect('add_products')
            except ValidationError:
                messages.error(request, "Invalid offer selected")
                return redirect('add_products')

        try:
            quantity = int(quantity)
            if quantity <= 0:
                raise ValueError
        except ValueError:
            messages.error(request, "Invalid quantity")
            return redirect('add_products')

        # Create the product
        product = Products.objects.create(
            name=product_name,
            price=price,
            description=description,
            details=details,
            category=category,
            discount_percentage=discount_percentage,
            is_offer_applied=is_offer_applied,
            thumbnail=thumbnail,
            quantity=quantity,
        )

        # Handle cropped images
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

        messages.success(request, "Product added successfully")
        return redirect('adminproducts')

    offers = Offer.objects.filter(is_active=True)
    categories = Category.objects.all()
    return render(request, 'add_product.html', {'Categories': categories, 'offers': offers})



@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)    
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

        # Validation
        if not all([name, price, description, details, quantity, category_id]):
            messages.error(request, "All fields are required")
            return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})

        if not (3 <= len(name) <= 50):
            messages.error(request, "Product name must be between 3 and 50 characters")
            return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})

        if not name.isalnum():
            messages.error(request, "Product name can only contain letters and numbers")
            return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})

        try:
            price = float(price)
            if price <= 0:
                messages.error(request, "Price must be a positive number")
                return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})
        except ValueError:
            messages.error(request, "Invalid price format")
            return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})

        if len(description) < 10:
            messages.error(request, "Description must be at least 10 characters")
            return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})

        if len(details) < 10:
            messages.error(request, "Details must be at least 10 characters")
            return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})

        try:
            quantity = int(quantity)
            if quantity <= 0:
                messages.error(request, "Quantity must be a positive number")
                return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})
        except ValueError:
            messages.error(request, "Invalid quantity")
            return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})

        try:
            category = get_object_or_404(Category, id=category_id)
        except ValidationError:
            messages.error(request, "Invalid category selected")
            return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})

        # Thumbnail validation
        if thumbnail:
            if not is_valid_image(thumbnail):
                messages.error(request, 'Thumbnail is an invalid image file')
                return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})
            else:
                product.thumbnail = thumbnail

        cropped_images = request.POST.get('croppedImages')

        if cropped_images:
            # Validate and process cropped images
            image_list = cropped_images.split('###')
            for base64_image in image_list:
                if base64_image:
                    format, imgstr = base64_image.split(';base64,')
                    ext = format.split('/')[-1]
                    img_data = ContentFile(base64.b64decode(imgstr), name=f"{name}.{ext}")

                    if not is_valid_image(img_data):
                        messages.error(request, 'One or more images are invalid image files')
                        return render(request, "edit_product.html", {"product": product, "images": images, "Categories": categories})

            # Delete old images and save new ones
            ProductImage.objects.filter(product=product).delete()
            for base64_image in image_list:
                if base64_image:
                    format, imgstr = base64_image.split(';base64,')
                    ext = format.split('/')[-1]
                    img_data = ContentFile(base64.b64decode(imgstr), name=f"{name}.{ext}")
                    ProductImage.objects.create(product=product, image=img_data)

        # Update product details
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

@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)    
def apply_or_not_offer(request, product_id):
    if request.method == 'POST':
        product = get_object_or_404(Products, id=product_id)
        offer = Offer.objects.all()
        offer_id = request.POST.get('offer_id')
        disable_offer = request.POST.get('dissable')

        if offer_id :
            offer = get_object_or_404(Offer, id=offer_id)
            if offer.offer_type == 'product' and offer.is_valid :
                product.discount_percentage = offer.discount_percentage
                product.is_offer_applied = True
                product.validate_offerdate = offer.end_date
                product.offer_id = offer.id
                messages.success(request, "Offer applied successfully.")
            else:
                
                messages.error(request, "Offer is not valid for this product.")
        elif disable_offer :
            product.discount_percentage = 0
            product.is_offer_applied = False
            messages.warning(request, "Offer removed.")
        else:
            messages.info(request, "No changes were made.")

        product.save()

    return redirect(reverse('adminproducts'))

            
        
        
def product_view(request,product_slug,product_id):
     
    product = get_object_or_404(Products, slug=product_slug,id=product_id)    
    category = product.category 
    images = ProductImage.objects.filter(product=product)
    realted_products = Products.objects.filter(category=category)
    save_amount = product.price - product.discounted_price if product.discounted_price else 0
    print(realted_products)
    if product.validate_offerdate and product.validate_offerdate < date.today():
        product.discount_percentage = None
        product.is_offer_applied = False
        product.validate_offerdate = None
        product.save(update_fields=['discount_percentage', 'is_offer_applied', 'validate_offerdate'])
    
    if request.user.is_authenticated:
        user = request.user
        user_cart, created = Cart.objects.get_or_create(user=user)
        cart_items = user_cart.cartproducts_set.count() 
        wishlist_items = Wishlist.objects.filter(user=user).count()
    else:
        cart_items = 0
        wishlist_items = 0
    context = {
        'product': product,
        'images': images,
        'cart_count': cart_items,
        'wishlist_items' : wishlist_items,
        'related_products' : realted_products,
        'save_amount' : save_amount,
    }
    return render(request, 'product.html', context)

