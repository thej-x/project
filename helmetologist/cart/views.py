from django.shortcuts import render,redirect
from django.views.decorators.cache import never_cache
from cart.models import *
from django.utils import timezone
from .models import Cart
from django.http import JsonResponse
import json
from products.views import product_view
from django.shortcuts import get_object_or_404
from django.contrib import messages
from user_account.models import *
from django.urls import reverse
from order.models import *
import uuid
from django.contrib.auth.decorators import login_required, user_passes_test
from django.utils.dateparse import parse_date
from decimal import Decimal
from django.views.decorators.http import require_POST


# Create your views here.

date_now = (timezone.now()).date()




def cart_show(request):
    user = request.user
    if user.is_authenticated:
        user_cart, created = Cart.objects.get_or_create(user=user)
        cart_products = user_cart.cartproducts_set.all()
        cart_items = user_cart.cartproducts_set.count() 
        wishlist_items = Wishlist.objects.filter(user=user).count()

    else:
        cart_products = []
        user_cart = {'cart_sub_total': 0, 'cart_sub_count': 0}
        cart_items = user_cart['cart_sub_count']

    context = {
        'user_cart': user_cart,
        'cart_products': cart_products,
        'cart_count': cart_items,
        'wishlist_items':wishlist_items,
    }
    return render(request, 'cart.html', context)
    
    
def add_to_cart(request,product_id):
    
    product = get_object_or_404(Products,id = product_id)
    cart = get_object_or_404(Cart, user=request.user)
    
    print(f"Product ID: {product_id}, Cart ID: {cart.id}")
    
    quantity_str = request.GET.get('numbers', '1')
    print(quantity_str)
    try:
        quantity = int(quantity_str)
        print(quantity)
    except ValueError:
        quantity = 1  
    
    
    user = request.user
    if quantity>product.quantity:
        messages.error(request,'quantity is exceeds limit')
    
        return redirect('product',product_slug = product.slug,product_id=product_id )
    
    
    
    
    cart, created = Cart.objects.get_or_create(user=request.user) 
        
    
    
    cart_products = CartProducts.objects.filter(cart=cart, products=product).first()
    if cart_products:
        print('working')
        cart_products.quantity += quantity
        
        cart_products.save()
        
    else:
        cart_products = CartProducts.objects.get_or_create(
            cart = cart,
            products = product,
            quantity = quantity,
            
            
        )
    return redirect('product',product_slug = product.slug,product_id=product_id )
    

def updateItem(request):
    user = request.user
    
    if request.method == 'POST':
        data = json.loads(request.body)
        productId = data['productId']
        action = data['action']
        
        
        cart = get_object_or_404(Cart, user=user)
        product = get_object_or_404(Products, id=productId)
        cart_product, created = CartProducts.objects.get_or_create(cart=cart, products=product)
        
        if action == 'add':
            if created :
                cart_product.quantity = 1
            else:
                cart_product.quantity += 1
            print(f"Quantity after add: {cart_product.quantity}")
        
        else:
            return JsonResponse('Invalid action', status=400)
        
        cart_product.save()
        
        if cart_product.quantity <= 0:
            cart_product.delete()
        
        return JsonResponse('Item added', safe=False)
    
    return JsonResponse('Invalid request', status=400)

def updateCartItem(request):
    user = request.user
    
    if request.method == 'POST':
        data = json.loads(request.body)
        productId = data['productId']
        action = data['action']
        
        cart = get_object_or_404(Cart, user=user)
        product = get_object_or_404(Products, id=productId)
        cart_product, created = CartProducts.objects.get_or_create(cart=cart, products=product)
        
        if action == 'add':
           
            if product.quantity > 0:
                if created:
                    cart_product.quantity = 1
                else:
                    if cart_product.quantity+1 <=product.quantity+cart_product.quantity:
                        cart_product.quantity += 1
                        product.quantity -= 1
                        product.save()
                    else:
                        return JsonResponse({'error': 'Not enough stock available'}, status=400)
            else:
                return JsonResponse({'error': 'Product is out of stock'}, status=400)
                
        elif action == 'remove':
            if cart_product.quantity > 1:
                cart_product.quantity -= 1
                product.quantity += 1
                product.save()
            else:
                cart_product.delete()
                return JsonResponse({'success': 'Product removed'}, status=200)  
        else:
            return JsonResponse({'error': 'Invalid action'}, status=400)  
        
        cart_product.save()
        total = cart.cart_sub_total
        subtotal = cart_product.sub_total
        
        return JsonResponse({'message': 'Item updated', 'quantity': cart_product.quantity, 'total': total, 'subtotal': subtotal})
    
    return JsonResponse({'error': 'Invalid request'}, status=400)

    
    
    
    
    
    

def delete_from_cart(request, product_id):
    user = request.user
    print(product_id, 'hi') 
    try:
       
        user_cart = get_object_or_404(Cart, user=user)
        print(user_cart, 'user_cart')  
        
        
        cart_product = get_object_or_404(CartProducts, cart=user_cart, products_id=product_id)
        print(cart_product, 'cart_product')  
        
        
        product = get_object_or_404(Products, id=product_id)
        
        
        
        product.quantity += cart_product.quantity
        print(cart_product.quantity)  
        product.save()
        
       
        cart_product.delete()
        
    except CartProducts.DoesNotExist:
        print('Product variant not found in cart')
        
    except Products.DoesNotExist:
        print('Product not found')
       
    except Exception as e:
        print(f'Error: {e}')
        
    
    return redirect('cart_show')



def checkout_view(request):
    if request.user.is_authenticated :
        
        user = request.user
        cart, created = Cart.objects.get_or_create(user=user)
        cart_items = cart.cartproducts_set.all()
        addresses = Address.objects.filter(user=user, is_delete=False)
  
    context = {
        'Addresses': addresses,
        'cart': cart,
        'cart_items': cart_items,
    }
    return render(request, 'checkout.html', context)





def checkout(request):
    if request.user.is_authenticated :
        
        user = request.user
        cart, created = Cart.objects.get_or_create(user=user)
        cart_items = cart.cartproducts_set.all()
        addresses = Address.objects.filter(user=user, is_delete=False)
        
        if request.method == 'POST':
            code = request.POST.get('code')
            print('coupon===',code)
            coupon = Coupon.objects.filter(code=code,active = True).first()
            print(coupon)
            
            
            
        
        
        
        if cart_items.count() == 0:
            messages.error(request, "Your cart is empty.add any product")
            return redirect('cart_show')

        if request.method == 'POST':
            billing_address_id = request.POST.get('billing_address')
            payment_method = request.POST.get('payment_method')

            if not billing_address_id or not payment_method:
                messages.error(request, "Please select a billing address and payment method.")
                return redirect('checkout')

            try:
                billing_address = Address.objects.get(id=billing_address_id, user=user)
            except Address.DoesNotExist:
                messages.error(request, "Invalid address selected.")
                return redirect('checkout')

            
            payment = Payment.objects.create(
                user=user,
                method=payment_method,
                amount=cart.cart_sub_total,
                status="pending"
            )

           
            order = Order.objects.create(
                user=user,
                payment=payment,
                billing_address=billing_address,
                total_amount=cart.cart_sub_total,
                payment_method=payment_method,
                orderid=str(uuid.uuid4())[:8]  
            )

            
            for item in cart_items:
                OrderProduct.objects.create(
                    order=order,
                    product=item.products,
                    price=item.products.price,
                    quantity=item.quantity,
                    user=user
                )

            
            cart.cartproducts_set.all().delete()
            
            

            url = reverse('checkout_success', args=[order.id])
            return redirect(url)

    else:
        
        cart_items = []
        cart = {'cart_sub_total': 0, 'cart_sub_count': 0}
        addresses = []

    context = {
        'Addresses': addresses,
        'cart': cart,
        'cart_items': cart_items,
    }
    return render(request, 'checkout.html', context)


def apply_coupon(request):
    
    if request.method == 'POST':
        code = request.POST.get('code')
        print('coupon===',code)
        coupon = Coupon.objects.filter(code=code,active = True)
        print(coupon)
        
    return render(request,'checkout.html')




def checkout_success(request, order_id):
    
    user = request.user
    order_products = []
    if request.user.is_authenticated:
        
        order = get_object_or_404(Order, user=user, id=order_id)
        order_products = OrderProduct.objects.filter(order = order, user = user)
        print(order_products)
        order_date = order.created_at
        total_amount = order.total_amount
        billing_address = order.billing_address
        payment_method = order.payment_method
        orderid = order.orderid

    context = {
        'order_products': order_products,
        'orderid': orderid,
        'order_date': order_date,
        'total_amount': total_amount,
        'payment_method': payment_method,
        'billing_address':billing_address,
    }
    return render(request, 'checkout_success.html', context)


def wishlist(request):
    user = request.user 
    wishlist_products = Wishlist.objects.filter(user = user)
    wishlist_items = Wishlist.objects.filter(user=user).count()
    user_cart, created = Cart.objects.get_or_create(user=user)
    cart_items = user_cart.cartproducts_set.count() 
    context={
        
        'wishlist_products' : wishlist_products,
        'wishlist_items' : wishlist_items,
        'cart_count': cart_items,
    }
    return render(request,'wishlist.html',context)

def remove_from_wishlist(request,product_id):
    user = request.user 
    product = get_object_or_404(Products, id=product_id)
    
    wishlist_product = get_object_or_404(Wishlist, user=user, product=product)   
     
    wishlist_product.delete()
    
    return redirect('wishlist')

def wishlist_to_cart(request, product_id):
    user = request.user
    product = get_object_or_404(Products, id=product_id)
    wishlist_product = get_object_or_404(Wishlist, user=user, product=product)
    cart, created = Cart.objects.get_or_create(user=request.user)

    quantity_str = request.GET.get('numbers', '1')
    try:
        quantity = int(quantity_str)
    except ValueError:
        quantity = 1

    if quantity > product.quantity:
        messages.error(request, 'Quantity exceeds limit')
        return redirect('product', product_slug=product.slug, product_id=product_id)

    cart_product, created = CartProducts.objects.get_or_create(cart=cart, products=product)

    if created:
        
        cart_product.quantity = quantity
    else:
       
        cart_product.quantity += quantity

    
    product.quantity -= quantity
    if product.quantity < 0:
        product.quantity = 0

    cart_product.save()
    wishlist_product.delete()
    product.save()

    return redirect('wishlist')

def add_to_wishlist(request, product_id):
    product = get_object_or_404(Products, id=product_id)
    user = request.user
    wishlist, created = Wishlist.objects.get_or_create(user=user, product=product) 
    quantity_str = request.GET.get('numbers', '1')
    try:
        quantity = int(quantity_str)
    except ValueError:
        quantity = 1

    if quantity > product.quantity:
        messages.error(request, 'Quantity exceeds available stock')
        return redirect('product', product_slug=product.slug, product_id=product_id)

    

    if not created:
        
        wishlist.quantity += quantity
        wishlist.save()
    else:
       
        wishlist.quantity = quantity
        wishlist.save()

    messages.success(request, 'Product added to wishlist')
    return redirect('product', product_slug=product.slug, product_id=product_id)

def is_superuser(user):
    return user.is_superuser



@never_cache
@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def admincoupon(request):
    
    coupons = Coupon.objects.all()
    
    context = {
        'coupons' : coupons ,
    }
    return render(request,'admincoupon.html',context)

def add_coupon(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        coupon_code = request.POST.get('coupon_code')
        discount_percentage = request.POST.get('discount_percentage')
        start_date = parse_date(request.POST.get('start_date'))
        end_date = parse_date(request.POST.get('end_date'))
        quantity = request.POST.get('quantity')
        min_amount = request.POST.get('min_amount')
        max_amount = request.POST.get('max_amount')
        active = request.POST.get('active') == 'on'
        
        errors = []
        
        
        if not title:
            errors.append("Coupon name is required.")
        if not coupon_code:
            errors.append("Coupon code is required.")
        if not start_date:
            errors.append("Start date is required.")
        if not end_date:
            errors.append("End date is required.")
        if not quantity or not quantity.isdigit() or int(quantity) <= 0:
            errors.append("Quantity must be a positive integer.")
        if not min_amount or not min_amount.replace('.', '', 1).isdigit() or Decimal(min_amount) <= 0:
            errors.append("Minimum amount must be a positive number.")
        if max_amount and (not max_amount.replace('.', '', 1).isdigit() or Decimal(max_amount) <= 0):
            errors.append("Maximum amount must be a positive number.")
        if discount_percentage and (not discount_percentage.replace('.', '', 1).isdigit() or Decimal(discount_percentage) <= 0 or Decimal(discount_percentage) > 100):
            errors.append("Discount percentage must be a number between 0 and 100.")

        if not errors:
            # Save to the database (assuming you have a Coupon model)
            Coupon.objects.create(
                title=title,
                code=coupon_code,
                discount_percentage=Decimal(discount_percentage) if discount_percentage else None,
                start_date=start_date,
                end_date=end_date,
                quantity=int(quantity),
                min_amount=Decimal(min_amount),
                max_amount=Decimal(max_amount) if max_amount else None,
                active=active
            )
            return redirect('admincoupon')
    
    return render(request, 'add_coupon.html')

@require_POST
def coupon_inactive(request, coupon_id):
    coupon = get_object_or_404(Coupon, id=coupon_id)
    coupon.active = not coupon.active
    coupon.save()
    return redirect('admincoupon')