from django.shortcuts import render,redirect
from .models import Products,colour_product
from django.http import HttpResponse
from .models import Category
from django.shortcuts import get_object_or_404
from django.views.decorators.cache import never_cache
from django.contrib.auth.decorators import login_required,user_passes_test
from django.core.files.storage import FileSystemStorage
from .forms import ProductsForm, ColourProductForm

# Create your views here.

def is_superuser(user):
    return user.is_superuser

@never_cache
@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def adminproducts(request):
    products = Products.objects.all()
    context = {
        'Products':products
    }
    return render(request,'adminproducts.html',context)

# @never_cache
# @login_required(login_url='/adminlogin/')
# @user_passes_test(is_superuser)
# def addproduct(request):
#     if request.method == 'POST':
#         product_name = request.POST.get('product_name')
#         price = request.POST.get('price')
#         thumbnail = request.FILES.get('thumbnail')
#         description = request.POST.get('description')
#         category_id = request.POST.get('category')
#         category = Category.objects.get(id=category_id)
#         variant_size = request.POST['variant_size']
#         variant_stock = request.POST['variant_stock']

#         product = Products.objects.create(
#             name=product_name,
#             price=price,
#             thumbnail=thumbnail,
#             description=description,
#             category=category
#         )
#         colour_product.objects.create(
#             product=product,
#             size=variant_size,
#             stock=variant_stock,
#         )
        
#         return redirect('adminproducts')
#     categories = Category.objects.all()
#     context = {
#         'Categories': categories
#     }
#     return render(request, 'addproduct.html', context)


def unlist_product(request,products_id):
        product = get_object_or_404(Products, pk=products_id)
        if request.method == 'POST':
            product.is_listed = not product.is_listed
            product.save()
            return redirect('adminproducts')
        return render('adminproducts',{'products':product})
    
    
def upload_images(request):
    if request.method == 'POST':
        images = request.FILES.getlist('colour_variants')
        image_paths = []
        for image in images:
            fs = FileSystemStorage()
            filename = fs.save(image.name, image)
            uploaded_file_url = fs.url(filename)
            image_paths.append(uploaded_file_url)
        request.session['image_paths'] = image_paths
        return redirect('crop_images')
    return render(request, 'add_products.html')


def add_product(request):
    if request.method == 'POST':
        product_form = ProductsForm(request.POST, request.FILES)
        color_variant_form = ColourProductForm(request.POST, request.FILES)
        if product_form.is_valid() and color_variant_form.is_valid():
            product = product_form.save()
            color_variant = color_variant_form.save(commit=False)
            color_variant.product = product
            color_variant.save()
            return redirect('adminproducts')  # Replace with your product list view name
    else:
        product_form = ProductsForm()
        color_variant_form = ColourProductForm()
    return render(request, 'add_product.html', {
        'product_form': product_form,
        'color_variant_form': color_variant_form
    })   
    
    
    

    
def product_view(request, product_slug):
    product = get_object_or_404(Products, slug=product_slug)
    
    
    return render(request, 'product.html', {'product': product,})

