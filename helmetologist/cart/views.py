from django.shortcuts import render,redirect
from django.views.decorators.cache import never_cache
from cart.models import *
from django.utils import timezone
from .models import Cart
from django.http import JsonResponse
import json,re
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
import razorpay
from django.conf import settings
from django.views.decorators.cache import never_cache

from datetime import date
from django.db.models import Q
from urllib.parse import parse_qs
# Create your views here.

date_now = (timezone.now()).date()




@login_required(login_url="login")
def cart_show(request):
    user = request.user
    if user.is_authenticated:
        user_cart, created = Cart.objects.get_or_create(user=user)
        cart_products = user_cart.cartproducts_set.all()

        # Handle expired offers for products in the cart
        for cart_product in cart_products:
            product = cart_product.products
            if product.validate_offerdate and product.validate_offerdate < date.today():
                product.discount_percentage = None
                product.is_offer_applied = False
                product.validate_offerdate = None
                product.discounted_price = None
                product.save(update_fields=['discount_percentage', 'is_offer_applied', 'validate_offerdate', 'discounted_price'])
        
        # Re-fetch cart products to reflect any updates
        cart_products = user_cart.cartproducts_set.all()
        cart_items = cart_products.count() 
        wishlist_items = Wishlist.objects.filter(user=user).count()
        
    else:
        return redirect('login')

    context = {
        'user_cart': user_cart,
        'cart_products': cart_products,
        'cart_count': cart_items,
        'wishlist_items': wishlist_items,
    }
    
    return render(request, 'cart.html', context)
    

@login_required(login_url="login")    
def add_to_cart(request,product_id):
    
    product = get_object_or_404(Products,id = product_id)
    if product.is_offer_applied:
        product.price = product.discounted_price
       
    cart = get_object_or_404(Cart, user=request.user)
    
    
    
    quantity_str = request.GET.get('numbers', '1')
    messages.success(request,'Product added to cart')
   
    try:
        quantity = int(quantity_str)
        
    except ValueError:
        quantity = 1  
    
    
    user = request.user
    if quantity>product.quantity:
        messages.error(request,'quantity is exceeds limit')
    
        return redirect('product',product_slug = product.slug,product_id=product_id )
    
    
    
    
    cart, created = Cart.objects.get_or_create(user=request.user) 
            
    cart_products = CartProducts.objects.filter(cart=cart, products=product).first()
    if cart_products:
        
        cart_products.quantity += quantity
        
        cart_products.save()
        
    else:
        cart_products = CartProducts.objects.get_or_create(
            cart = cart,
            products = product,
            quantity = quantity,
            
            
        )
    return redirect('product',product_slug = product.slug,product_id=product_id )

@login_required(login_url="login")
def updateItem(request):
    user = request.user

    if request.method == 'POST':
        data = json.loads(request.body)
        productId = data['productId']
        action = data['action']

        cart = get_object_or_404(Cart, user=user)
        product = get_object_or_404(Products, id=productId)

        if product.quantity == 0:
            return JsonResponse({'error': 'Product is out of stock'}, status=400)

        cart_product, created = CartProducts.objects.get_or_create(cart=cart, products=product)

        if action == 'add':
            if created:
                cart_product.quantity = 1
                product.quantity -= 1
                product.save()
            else:
                return JsonResponse({'error': 'Product already added in cart'}, status=400)
        else:
            return JsonResponse({'error': 'Invalid action'}, status=400)

        cart_product.save()

        # If the quantity is 0 or less, remove the cart product
        if cart_product.quantity <= 0:
            cart_product.delete()

        # Get updated counts
        cart_items = cart.cartproducts_set.count()
        wishlist_items = Wishlist.objects.filter(user=user).count()

        return JsonResponse({
            'message': 'Item added',
            'cart_items': cart_items,
            'wishlist_items': wishlist_items
        })

    return JsonResponse({'error': 'Invalid request'}, status=400)

@login_required(login_url="login")
def updateWishlist(request):
    user = request.user
    
    if request.method == 'POST':
        data = json.loads(request.body)
        productId = data['productId']
        action = data['action']
        
        product = get_object_or_404(Products, id=productId)
        wishlist, created = Wishlist.objects.get_or_create(product=product, user=user)
        
        if action == 'add':
            if created:
                pass
            else:
                return JsonResponse({'error': 'Item already in wishlist'}, status=400)
        elif action == 'remove':
            wishlist.delete()
        else:
            return JsonResponse({'error': 'Invalid action'}, status=400)
        
        # Get updated counts
        cart_items = Cart.objects.get(user=user).cartproducts_set.count()
        wishlist_items = Wishlist.objects.filter(user=user).count()
        
        return JsonResponse({
            'message': 'Wishlist updated successfully',
            'cart_items': cart_items,
            'wishlist_items': wishlist_items
        })
    
    return JsonResponse({'error': 'Invalid request'}, status=400)

@login_required(login_url="login")
def updateCartItem(request):
    user = request.user
    
    if request.method == 'POST':
        data = json.loads(request.body)
        
        productId = data['productId']
        
        
        action = data['action']
        
        cart = get_object_or_404(Cart, user=user)
       
        
        product = get_object_or_404(Products, id=productId)
        
        
        if product.is_offer_applied and product.discounted_price:
            price = product.discounted_price
        else:
            price = product.price
        
        # Get or create the cart product
        cart_product, created = CartProducts.objects.get_or_create(cart=cart, products=product)
        
        
        if action == 'add':
            if product.is_offer_applied:
                product.price = product.discounted_price
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

    
    
    
    
    
    

@login_required(login_url="login")
def delete_from_cart(request, product_id):
    user = request.user
    
    try:
       
        user_cart = get_object_or_404(Cart, user=user)
         
        
        
        cart_product = get_object_or_404(CartProducts, cart=user_cart, products_id=product_id)
       
        
        
        product = get_object_or_404(Products, id=product_id)
        
        
        
        product.quantity += cart_product.quantity
        
        product.save()
        
       
        cart_product.delete()
        
    except CartProducts.DoesNotExist:
        print('Product variant not found in cart')
        
    except Products.DoesNotExist:
        print('Product not found')
       
    except Exception as e:
        print(f'Error: {e}')
        
    
    return redirect('cart_show')




client = razorpay.Client(auth =(settings.RAZORPAY_KEY,settings.RAZORPAY_SECRET))


@never_cache
@login_required(login_url="login")
def checkout_view(request):
    if request.user.is_authenticated:
        user = request.user
        cart, created = Cart.objects.get_or_create(user=user)
        cart_items = cart.cartproducts_set.all()
        addresses = Address.objects.filter(user=user, is_delete=False)
        cart_total = cart.coupon_applied_cart_sub_total if cart.coupon else cart.cart_sub_total
        
        coupons = Coupon.objects.filter(
            Q(min_amount__lte=cart.cart_sub_total) | Q(min_amount__isnull=True)
        ).exclude(active=False)

        

        context = {
            'addresses': addresses,
            'cart': cart,
            'cart_items': cart_items,
            'cart_total': cart_total,
            'coupons': coupons,
        }
        return render(request, 'checkout.html', context)
    else:
        cart_items = []
        cart = {'cart_sub_total': 0, 'cart_sub_count': 0}
        addresses = []

        context = {
            'addresses': addresses,
            'cart': cart,
            'cart_items': cart_items,
        }
        return render(request, 'checkout.html', context)
    


def checkout_add_address(request):
    
    user = request.user
    if request.method == "POST":
        
        name = request.POST.get("firstname", "").strip()
        email = request.POST.get("email", "").strip()
        phone = request.POST.get("phone", "").strip()
        house_no = request.POST.get("house_no", "").strip()
        city = request.POST.get("city", "").strip()
        state = request.POST.get("state", "").strip()
        country = request.POST.get("country", "").strip()
        pincode = request.POST.get("pincode", "").strip()
        
        if not all([name, phone, email, house_no, city, state, country, pincode]):
            messages.error(request, "Please provide all fields.")
            return redirect('checkout_view')
        # indian_states =[
            
        # ]
      
        # if state.casefold() not in [state_name.casefold() for state_name in indian_state]:
        #     messages.error(request, "Please provide a valid state.")
        #     return redirect('checkout_view')
            
        if not re.match(r'^[1-9][0-9]{5}$', pincode):
            messages.error(request, "Invalid pincode format. Please enter a valid Indian pincode.")
            return redirect('checkout_view')
        
        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', email):
            messages.error(request, "Invalid email format.")
            return redirect('checkout_view')
        
        if not re.match(r'^\d{10}$', phone):
            messages.error(request, "Invalid phone number. Please enter a 10-digit phone number.")
            return redirect('checkout_view')

        
        address_obj = Address.objects.create(
            user=user,
            name=name,
            phone=phone,
            email=email,
            house_no=house_no,
            city=city,
            state=state,
            country=country,
            pincode=pincode,
        )
        address_obj.save()
        messages.success(request, "Address added successfully")
        return redirect('checkout_view')
    
    if request.method == "POST":
            # Handle address addition
            name = request.POST.get("firstname", "").strip()
            email = request.POST.get("email", "").strip()
            phone = request.POST.get("phone", "").strip()
            house_no = request.POST.get("house_no", "").strip()
            city = request.POST.get("city", "").strip()
            state = request.POST.get("state", "").strip()
            country = request.POST.get("country", "").strip()
            pincode = request.POST.get("pincode", "").strip()
            
            if not all([name, phone, email, house_no, city, state, country, pincode]):
                messages.error(request, "Please provide all fields.")
                return redirect('checkout_view')
            
            indian_states = [
                # ... (list of Indian states)
            ]
            if state.casefold() not in [state_name.casefold() for state_name in indian_states]:
                messages.error(request, "Please provide a valid state.")
                return redirect('checkout_view')
                
            if not re.match(r'^[1-9][0-9]{5}$', pincode):
                messages.error(request, "Invalid pincode format. Please enter a valid Indian pincode.")
                return redirect('checkout_view')
            
            if not re.match(r'^[^@]+@[^@]+\.[^@]+$', email):
                messages.error(request, "Invalid email format.")
                return redirect('checkout_view')
            
            if not re.match(r'^\d{10}$', phone):
                messages.error(request, "Invalid phone number. Please enter a 10-digit phone number.")
                return redirect('checkout_view')

            address_obj = Address.objects.create(
                user=user,
                name=name,
                phone=phone,
                email=email,
                house_no=house_no,
                city=city,
                state=state,
                country=country,
                pincode=pincode,
            )
            address_obj.save()
            messages.success(request, "Address added successfully")
            return redirect('checkout_view')

    return render(request, 'checkout.html')   

@login_required(login_url="login")
def cash_on_delivery(request):
   
    if request.user.is_authenticated:
       
        user = request.user
      
       
        cart, created = Cart.objects.get_or_create(user=user)
        cart_items = cart.cartproducts_set.all()
        addresses = Address.objects.filter(user=user, is_delete=False)
        cart_total = cart.coupon_applied_cart_sub_total if cart.coupon else cart.cart_sub_total
        
        if request.method == 'POST':
            action = request.POST.get('action')

            if action == 'apply_coupon':
                code = request.POST.get('code')
                coupon = Coupon.objects.filter(code=code, active=True).first()

                if not coupon:
                    messages.error( request, 'Invalid coupon')
                    return redirect('checkout_view')
                
                if cart.cart_sub_total >=50000:
                    cart.coupon_applied_cart_sub_total = cart.cart_sub_total - coupon.max_amount

                if cart.coupon:
                     messages.success(request, 'Coupon already applied')
                     return redirect('checkout_view')
                if coupon.quantity == 0:
                    messages.warning(request, 'Coupon exceeds the limit')
                    return redirect('checkout_view')

                cart.coupon = coupon
                coupon.quantity -= 1
                if coupon.quantity==0:
                    messages.warning(request,'coupon exceeds the limit')
                coupon.save()
                
                cart.save()

                messages.success( request, 'Coupon applied')
                return redirect('checkout_view')

            elif action == 'remove_coupon':
                if cart.coupon:
                    cart.coupon.quantity += 1
                    cart.coupon.save()
                    cart.coupon = None
                    cart.save()
                    messages.success(request,'Coupon removed')
                    return redirect('checkout_view')
                else:
                  messages.error(request,  'No coupon to remove')
                  return redirect('checkout_view')

            elif action == 'place_order':
                if cart_items.count() == 0:
                    return JsonResponse({'success': False, 'message': "Your cart is empty. Add any product."})

                billing_address_id = request.POST.get('billing_address')
                
                payment_method = request.POST.get('payment_method')
                if payment_method == 'COD':
                    if not billing_address_id or not payment_method:
                        return JsonResponse({'success': False, 'error': "Please select a billing address and payment method."})

                    try:
                        billing_address = Address.objects.get(id=billing_address_id, user=user)
                    except Address.DoesNotExist:
                        return JsonResponse({'success': False, 'message': "Invalid address selected."})

                    order_amount = cart.coupon_applied_cart_sub_total if cart.coupon else cart.cart_sub_total
                    if order_amount < 1.00:
                        return JsonResponse({'success': False, 'message': "Order amount must be at least ₹1.00."})

                    

                    payment = Payment.objects.create(
                        user=user,
                        method=payment_method,
                        amount=order_amount,
                        status="completed"
                    )

                    order = Order.objects.create(
                        user=user,
                        payment=payment,
                        billing_address=billing_address,
                        total_amount=order_amount,
                        payment_method=payment_method,
                        orderid=str(uuid.uuid4())[:8],
                        coupon_applied = True if  cart.coupon else False
                    )

                    for item in cart_items:
                        original_price = item.products.price

                        if item.products.discounted_price:
                            discount_price = item.products.discounted_price
                            discount_percentage = item.products.discount_percentage
                        elif item.products.discount_percentage:
                            # Calculate the discount based on percentage
                            discount_amount = (original_price * item.products.discount_percentage) / 100
                            discount_price = original_price - discount_amount
                            discount_percentage = item.products.discount_percentage
                        else:
                            discount_price = original_price
                            discount_percentage = None

                                    # Create the OrderProduct instance with the appropriate price and discount percentage
                        OrderProduct.objects.create(
                                order=order,
                                status="Processing",
                                product=item.products,
                                price=discount_price,
                                quantity=item.quantity,
                                user=user,
                                discount_percentage=discount_percentage,
                                )

                    cart.cartproducts_set.all().delete()
                    cart.coupon = None
                    cart.save()

                    # Return a JSON response with success message and redirect URL
                    return JsonResponse({
                        'success': True,
                        'message': "Order placed successfully.",
                        'redirect_url': reverse('checkout_success', args=[order.id])
                    })
    
    return JsonResponse({'success': False, 'message': "User not authenticated."})

@login_required(login_url="login")    
def create_razorpay_order(request):
    try:
     if request.method == 'POST': 
        billing_address_id = request.POST.get('billing_address')
        payment_method = request.POST.get('payment_method')
        if not billing_address_id or not payment_method:
           return JsonResponse({'success': False, 'error': "Please select a billing address and payment method."})
       
        if payment_method == "Razorpay":
            
            user = request.user
            cart, created = Cart.objects.get_or_create(user=user)
            cart_items = cart.cartproducts_set.all()
            cart_total = cart.coupon_applied_cart_sub_total if cart.coupon else cart.cart_sub_total
            amount = int(cart_total) * 100  # Amount should be in paise
            
            # Create a Razorpay order
            order = client.order.create({
                'amount': amount,
                'currency': 'INR',
                'payment_capture': '1'  # Automatic payment capture
            })
            
            return JsonResponse({
                'success': True,
                'order_id': order['id'],
                'amount': order['amount']
            })
        else:
            return JsonResponse({'success': False, 'message': 'Invalid payment method'}, status=400)
    
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=400)


def verify_razorpay_payment(request):
    
    try:
        data = json.loads(request.body)
        payment_id = data.get('razorpay_payment_id')
        order_id = data.get('razorpay_order_id')
        signature = data.get('razorpay_signature')
        order_data = data.get("orderData", "")
        parsed_data = parse_qs(order_data)
        billing_address_id = parsed_data.get("billing_address", [""])[0]
        payment_method = parsed_data.get("payment_method", [""])[0]
        user = request.user
        cart, created = Cart.objects.get_or_create(user=user)
        cart_items = cart.cartproducts_set.all()
        
        data = {
            'razorpay_order_id': order_id,
            'razorpay_payment_id': payment_id,
            'razorpay_signature': signature
        }
        client.utility.verify_payment_signature(data)
        billing_address = Address.objects.get(id=billing_address_id, user=user)
        order_amount = cart.coupon_applied_cart_sub_total if cart.coupon else cart.cart_sub_total
        payment = Payment.objects.create(
                        user=user,
                        method=payment_method,
                        amount=order_amount,
                         status="completed"
                    )
       
        order = Order.objects.create(
                        user=user,
                        payment=payment,
                        billing_address=billing_address,
                        total_amount=order_amount,
                        payment_method=payment_method,
                        orderid=str(uuid.uuid4())[:8],
                        razorpay_order_id =order_id,
                        razorpay_payment_id =payment_id ,
                        razorpay_payment_signature=signature,
                        coupon_applied = True if  cart.coupon else False
                    )
        for item in cart_items:
            original_price = item.products.price

            # Calculate the discount price
            if item.products.discounted_price:
                            discount_price = item.products.discounted_price
                            discount_percentage = item.products.discount_percentage
            elif item.products.discount_percentage:
                            # Calculate the discount based on percentage
                            discount_amount = (original_price * item.products.discount_percentage) / 100
                            discount_price = original_price - discount_amount
                            discount_percentage = item.products.discount_percentage
            else:
                            discount_price = original_price
                            discount_percentage = None

                        # Create the OrderProduct instance with the appropriate price and discount percentage
            OrderProduct.objects.create(
                            order=order,
                            status="Processing",
                            product=item.products,
                            price=discount_price,
                            quantity=item.quantity,
                            user=user,
                            discount_percentage=discount_percentage,
                        )
                        

        cart.cartproducts_set.all().delete()
        cart.coupon = None
        cart.save()
        

        return JsonResponse({'success': True,'order_id':order.id})

    except razorpay.errors.SignatureVerificationError:
        return JsonResponse({'success': False, 'message': 'Payment signature verification failed'}, status=400)
    except Order.DoesNotExist:
       
        return JsonResponse({'success': False, 'message': 'Order not found'}, status=404)
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=400)  
    

  
def process_wallet_payment(request):
    if request.method == 'POST':
        try:
           
            data = json.loads(request.body)
            order_data = data.get("orderData", "")
            parsed_data = parse_qs(order_data)
            billing_address_id = parsed_data.get("billing_address", [""])[0]
            payment_method = parsed_data.get("payment_method", [""])[0]
            user = request.user
            
            # Fetch the user's wallet
            wallet = get_object_or_404(Wallet, user=user)
            
            cart = get_object_or_404(Cart, user=user)
            cart_items = cart.cartproducts_set.all()
            
            if not billing_address_id or not payment_method:
                return JsonResponse({'success': False, 'error': "Please select a billing address and payment method."})
       
            billing_address = get_object_or_404(Address, id=billing_address_id, user=user)
            order_amount = cart.coupon_applied_cart_sub_total if cart.coupon else cart.cart_sub_total
            
            # Check if wallet balance is sufficient
            if wallet.balance < order_amount:
                return JsonResponse({'success': False, 'error': "Insufficient wallet balance."})
            
            # Deduct the order amount from the wallet balance
            wallet.balance -= order_amount
            wallet.save()
            
            # Record the transaction
            Transaction.objects.create(
                wallet=wallet,
                amount=order_amount,
                transaction_type='debit',
                status='approved'
            )
            
            # Create the payment record
            payment = Payment.objects.create(
                user=user,
                method=payment_method,
                amount=order_amount,
                status="completed"
            )
            
            # Create the order record
            order = Order.objects.create(
                user=user,
                payment=payment,
                billing_address=billing_address,
                total_amount=order_amount,
                payment_method=payment_method,
                orderid=str(uuid.uuid4())[:8],
                coupon_applied=True if cart.coupon else False
            )
            
            # Create order products and handle discounts
            for item in cart_items:
                original_price = item.products.price
                discount_price = original_price
                discount_percentage = None

                if item.products.discounted_price:
                    discount_price = item.products.discounted_price
                    discount_percentage = item.products.discount_percentage
                elif item.products.discount_percentage:
                    discount_amount = (original_price * item.products.discount_percentage) / 100
                    discount_price = original_price - discount_amount
                    discount_percentage = item.products.discount_percentage

                OrderProduct.objects.create(
                    order=order,
                    status="Processing",
                    product=item.products,
                    price=discount_price,
                    quantity=item.quantity,
                    user=user,
                    discount_percentage=discount_percentage,
                )

            # Clear the cart after order is placed
            cart.cartproducts_set.all().delete()
            cart.coupon = None
            cart.save()

            return JsonResponse({'success': True, 'order_id': order.id})
        
        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=400)
    else:
        return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=405)



    




@login_required(login_url="login/")
@never_cache
def checkout_success(request, order_id):
    
    user = request.user
    order_products = []
    if request.user.is_authenticated:
        
        order = get_object_or_404(Order, user=user, id=order_id)
        order_products = OrderProduct.objects.filter(order = order, user = user)
        for product in order_products:
            product_total_price = product.product.price * product.quantity
        
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
        '   ' : product_total_price,
    }
    return render(request, 'checkout_success.html', context)


@login_required(login_url="login")
def wishlist(request):
    user = request.user
    if user.is_authenticated:
        wishlist_products = Wishlist.objects.filter(user=user)
        wishlist_items = wishlist_products.count()
        user_cart, created = Cart.objects.get_or_create(user=user)
        cart_items = user_cart.cartproducts_set.count()
        
        # Handle expired offers for products in the wishlist
        for wishlist_item in wishlist_products:
            product = wishlist_item.product
            if product.validate_offerdate and product.validate_offerdate < date.today():
                product.discount_percentage = None
                product.is_offer_applied = False
                product.validate_offerdate = None
                product.discounted_price = None
                product.save(update_fields=['discount_percentage', 'is_offer_applied', 'validate_offerdate', 'discounted_price'])
        
        # Re-fetch wishlist products to reflect any updates
        wishlist_products = Wishlist.objects.filter(user=user)
        wishlist_items = wishlist_products.count()

    else:
        return redirect('login')
        
    context = {
        'wishlist_products': wishlist_products,
        'wishlist_items': wishlist_items,
        'cart_count': cart_items,
    }
    
    return render(request, 'wishlist.html', context)


@login_required(login_url="login")
def remove_from_wishlist(request,product_id):
    user = request.user 
    product = get_object_or_404(Products, id=product_id)
    
    wishlist_product = get_object_or_404(Wishlist, user=user, product=product)   
     
    wishlist_product.delete()
    
    return redirect('wishlist')


@login_required(login_url="login")
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
        messages.error(request, 'Product out of stock')
        return redirect('wishlist')

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


@login_required(login_url="login/")
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



@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def add_coupon(request):
    
    errors = []
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
        
        

        if not title:
            errors.append("Coupon name is required.")
        if not coupon_code:
            errors.append("Coupon code is required.")
        if not start_date:
            errors.append("Start date is required.")
        if not end_date:
            errors.append("End date is required.")
        
        
        if start_date and start_date <= date.today():
            errors.append("Start date must be greater than the current date.")
        if start_date and end_date and end_date <= start_date:
            errors.append("End date must be greater than the start date.")
        
        
        if not quantity or not quantity.isdigit() or int(quantity) <= 0:
            errors.append("Quantity must be a positive integer.")
        
        
        if not min_amount or not min_amount.replace('.', '', 1).isdigit() or Decimal(min_amount) <= 999 < Decimal(max_amount) :
            errors.append("Minimum amount must be greater than 999 and less than maximum amount.")
        
        
        if max_amount and (not max_amount.replace('.', '', 1).isdigit() or Decimal(max_amount) >= 5999):
            errors.append("Maximum amount must be less than 5999.")
        
        
        if discount_percentage and (not discount_percentage.replace('.', '', 1).isdigit() or Decimal(discount_percentage) < 1 or Decimal(discount_percentage) > 50):
            errors.append("Discount percentage must be a number between 1 and 50.")
        
        if not errors:
            
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
    
    return render(request, 'add_coupon.html', {'messages': errors})



@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def edit_coupon(request, coupon_id):
    coupon = get_object_or_404(Coupon, id=coupon_id)
    errors = []

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

      
        errors.extend(validate_coupon(title, coupon_code, discount_percentage, start_date, end_date, quantity, min_amount, max_amount))

        if not errors:
            coupon.title = title
            coupon.code = coupon_code
            coupon.discount_percentage = Decimal(discount_percentage) if discount_percentage else None
            coupon.start_date = start_date
            coupon.end_date = end_date
            coupon.quantity = int(quantity)
            coupon.min_amount = Decimal(min_amount)
            coupon.max_amount = Decimal(max_amount) if max_amount else None
            coupon.active = active
            coupon.save()
            return redirect('admincoupon')

    return render(request, 'edit_coupon.html', {'coupon': coupon, 'messages': errors})

def validate_coupon(title, coupon_code, discount_percentage, start_date, end_date, quantity, min_amount, max_amount):
    errors = []
    
    if not title:
        errors.append("Coupon name is required.")
    if not coupon_code:
        errors.append("Coupon code is required.")
    if not start_date:
        errors.append("Start date is required.")
    if not end_date:
        errors.append("End date is required.")
    if start_date and start_date <= date.today():
        errors.append("Start date must be greater than the current date.")
    if start_date and end_date and end_date <= start_date:
        errors.append("End date must be greater than the start date.")
    if not quantity or not quantity.isdigit() or int(quantity) <= 0:
        errors.append("Quantity must be a positive integer.")
    if not min_amount or not min_amount.replace('.', '', 1).isdigit() or Decimal(min_amount) <= 999 or (max_amount and Decimal(min_amount) >= Decimal(max_amount)):
        errors.append("Minimum amount must be greater than 999 and less than maximum amount.")
    if max_amount and (not max_amount.replace('.', '', 1).isdigit() or Decimal(max_amount) >= 5999):
        errors.append("Maximum amount must be less than 5999.")
    if discount_percentage and (not discount_percentage.replace('.', '', 1).isdigit() or Decimal(discount_percentage) < 1 or Decimal(discount_percentage) > 50):
        errors.append("Discount percentage must be a number between 1 and 50.")

    return errors

def handle_payment_failure(request):
    try:
        # Parse the JSON request body
        data = json.loads(request.body)
        order_data = data.get("orderData", "")
        parsed_data = parse_qs(order_data)
        
        # Extract required fields from the parsed data
        billing_address_id = parsed_data.get("billing_address", [""])[0]
        payment_method = parsed_data.get("payment_method", [""])[0]
        user = request.user

        # Retrieve or create the cart
        cart, created = Cart.objects.get_or_create(user=user)
        cart_items = cart.cartproducts_set.all()

        # Get the billing address
        billing_address = Address.objects.get(id=billing_address_id, user=user)
        
        # Calculate the order amount
        order_amount = cart.coupon_applied_cart_sub_total if cart.coupon else cart.cart_sub_total
        
        # Create a pending payment entry
        payment = Payment.objects.create(
            user=user,
            method=payment_method,
            amount=order_amount,
            status="pending"
        )

        # Create an order entry
        order = Order.objects.create(
            user=user,
            payment=payment,
            billing_address=billing_address,
            total_amount=order_amount,
            payment_method=payment_method,
            orderid=str(uuid.uuid4())[:8],
            coupon_applied=True if cart.coupon else False
        )

        # Add items to the order
        for item in cart_items:
            original_price = item.products.price

            # Calculate the discount price
            if item.products.discounted_price:
                discount_price = item.products.discounted_price
                discount_percentage = item.products.discount_percentage
            elif item.products.discount_percentage:
                # Calculate the discount based on percentage
                discount_amount = (original_price * item.products.discount_percentage) / 100
                discount_price = original_price - discount_amount
                discount_percentage = item.products.discount_percentage
            else:
                discount_price = original_price
                discount_percentage = None

            # Create the OrderProduct instance with the appropriate price and discount percentage
            OrderProduct.objects.create(
                order=order,
                product=item.products,
                price=discount_price,
                quantity=item.quantity,
                user=user,
                discount_percentage=discount_percentage,
            )

        # Clear the cart
        cart.cartproducts_set.all().delete()
        cart.coupon = None
        cart.save()

        # Return user_id and order_id in the response
        return JsonResponse({
            'success': True, 
            'order_id': order.id, 
            'user_id': user.id  # Include user_id in response
        })

    except Address.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'Billing address not found'}, status=404)
    except Exception as e:
        return JsonResponse({'success': False, 'message': str(e)}, status=400)
        


@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
@require_POST
def coupon_inactive(request, coupon_id):
    coupon = get_object_or_404(Coupon, id=coupon_id)
    coupon.active = not coupon.active
    coupon.save()
    return redirect('admincoupon')