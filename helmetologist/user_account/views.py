from django.shortcuts import render
from django.shortcuts import redirect,render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,update_session_auth_hash
from django.contrib import messages
from django.views.decorators.cache import never_cache
import re
from django.urls import reverse  
from django.core.paginator import Paginator
from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password
from django.contrib.auth.decorators import login_required
# from user_account.models import Users
import pyotp
import datetime
from django.core.mail import send_mail
from django.utils import timezone
from django.shortcuts import get_object_or_404
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile
from django.core.mail import send_mail
from django.http import JsonResponse
import json
from django.template.loader import render_to_string
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import logout as auth_logout
from .models import Address
from category.models import Category
from products.models import Products
from order.models import Order,OrderProduct
from django.contrib.auth import get_user_model
from cart.models import *
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
from datetime import date
from order.models import *
from cart.models import *
from django.conf import settings
import razorpay
from django.contrib.auth.decorators import user_passes_test

# Create your views here.

def non_admin_required(view_func):
    def check_admin(user):
        return not user.is_superuser
    
    decorated_view_func = user_passes_test(check_admin, login_url='adminlogin')(view_func)
    return decorated_view_func

    


@non_admin_required
def index(request):
    categories = Category.objects.all()
    products = Products.objects.all()[:8]
    
    # Reset expired offers for products
    for product in products:
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

    return render(request, 'index.html', {
        'Categories': categories,
        'Products': products,
        'cart_count': cart_items,
        'wishlist_items' : wishlist_items,
    })

def base(request):
    Categories = Category.objects.all()
    products = Products.objects.all()
    return render(request,'base.html',{'Categories': Categories,'Products':products})


def signuppage(request):
    if request.method == 'POST':
        uname = request.POST.get('username','')
        fname = request.POST.get('firstname')
        lname = request.POST.get('lastname')
        email = request.POST.get('email')
        pass1 = request.POST.get('password1')
        pass2 = request.POST.get('password2')

        # Basic validation checks
        if ' ' in uname:
            messages.error(request, "Username cannot contain spaces")
            return redirect('signup')
        if User.objects.filter(username=uname).exists():
            messages.error(request, "Username is already taken")
            return redirect('signup')
        if ' ' in fname:
            messages.error(request, "Firstname cannot contain spaces")
            return redirect('signup')
        if ' ' in lname:
            messages.error(request, "Lastname cannot contain spaces")
            return redirect('signup')
        if ' ' in email:
            messages.error(request, "Email cannot contain spaces")
            return redirect('signup')
        if ' ' in pass1:
            messages.error(request, "Password cannot contain spaces")
            return redirect('signup')
        if pass1 != pass2:
            messages.error(request, "Passwords do not match")
            return redirect('signup')
        if not re.match(r"^[A-Za-z0-9_]+$", uname):
            messages.error(request, "Invalid username. Only letters, numbers, and underscores are allowed.")
            return redirect('signup')
        if not re.match(r"^[A-Za-z ]+$", fname):
            messages.error(request, "Invalid first name")
            return redirect('signup')
        if not re.match(r"^[A-Za-z ]+$", lname):
            messages.error(request, "Invalid last name")
            return redirect('signup')
        if not re.match(r"^[A-Za-z0-9\.\+_-]+@[A-Za-z0-9\._-]+\.[a-zA-Z]*$", email):
            messages.error(request, "Invalid email")
            return redirect('signup')
        if len(pass1) < 6:
            messages.error(request, "Password must be at least 8 characters long")
            return redirect('signup')
        if User.objects.filter(email=email).exists():
            messages.error(request, "Email is already registered")
            return redirect('signup')

        try:
            
            user = User.objects.create(
                username=uname,
                first_name=fname,
                last_name=lname,
                email=email,
                password=make_password(pass1)  
            )
           
            user.save()
            

            otp = pyotp.TOTP(pyotp.random_base32()).now()
            print('otp1:', otp,type(otp))

            profile = Profile(user=user,otp=otp,
                              otp_created_at=timezone.now())
            
            profile.save()

            subject = "Your OTP Code"
            message = f"Your OTP code is {otp}. It is valid for 1 minutes."
            send_mail(subject, message, 'thejukthej@gmail.com', [email], fail_silently=False)

          
            request.session['otp_user_id'] = user.id

            messages.success(request, "Account created successfully.Now you can Sign-in.")
            return render(request, 'otp.html')

        except Exception as e:
            if user:
                user.delete()
            messages.error(request, f"An error occurred during signup: {str(e)}")
            return redirect('signup')

    return render(request, 'signup.html')

def otppage(request):
    if request.method == 'POST':
        otp = request.POST.get('otp')
        print('Received OTP:', otp, type(otp))
        user_id = request.session.get('otp_user_id')

        if not user_id:
            
            return JsonResponse({'success': False, 'message': "Session expired. Please sign up again."}, status=400)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            
            return JsonResponse({'success': False, 'message': "User not found. Please sign up again."}, status=400)

        if user.profile.otp == otp and (timezone.now() - user.profile.otp_created_at).seconds < 60:
            user.backend = 'django.contrib.auth.backends.ModelBackend'
            login(request, user)
            return JsonResponse({'success': True, 'redirect_url': '/login/'})
        else:
            print('Invalid or expired OTP:', otp)
            return JsonResponse({'success': False, 'message': "Invalid or expired OTP"}, status=400)

    return render(request, 'otp.html')




@csrf_exempt
def resend_otp(request):
    user_id = request.session.get('otp_user_id')
    if not user_id:
        
        return JsonResponse({'success': False, 'message': 'Session expired. Please sign up again.'}, status=400)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        
        return JsonResponse({'success': False, 'message': 'User not found.'}, status=400)

    otp = pyotp.TOTP(pyotp.random_base32()).now()
    print('Generated OTP:', otp, type(otp))
    user.profile.otp = otp
    user.profile.otp_created_at = timezone.now()
    user.profile.save()

    subject = "Your OTP Code"
    message = f"Your OTP code is {otp}. It is valid for 1 minutes."
    send_mail(subject, message, 'your-email@example.com', [user.email], fail_silently=False)

    return JsonResponse({'success': True, 'message': 'OTP resent successfully.'}, status=200)


@never_cache
def loginpage(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
    

        if not username:
            messages.error(request, "Username field is required.")
        elif not password:
            messages.error(request, "Password field is required.")
        else:
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                login(request, user)
                return redirect('index')  
            else:
                messages.error(request, "Invalid email or password")

    return render(request, 'login.html')

def forgot_password(request):
    if request.method == 'POST':
        email = request.POST.get('email')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            messages.error(request, "Email is incorrect. Please enter a valid email.")
            return JsonResponse({'success': False, 'message': 'Email is incorrect. Please enter a valid email.'}, status=400)

        # Generate OTP and save to user profile
        otp = pyotp.TOTP(pyotp.random_base32()).now()
        print(otp)
        user.profile.otp = otp
        user.profile.otp_created_at = timezone.now()
        user.profile.save()

        # Send OTP via email
        subject = "Your OTP Code"
        message = f"Your OTP code is {otp}. It is valid for 2 minutes."
        # Replace 'your-email@example.com' with your actual email address
        send_mail(subject, message, 'your-email@example.com', [user.email], fail_silently=False)

        # Store user ID in session for OTP verification
        request.session['otp_user_id'] = user.id

        return render(request, 'resetotp.html')  # Redirect to OTP verification page

    return render(request, 'forgotpassword.html')

def verify_otp(request):
    if request.method == 'POST':
        try:
            otp_entered = request.POST.get('otp')
            user_id = request.session.get('otp_user_id')

            if not user_id:
                return JsonResponse({'success': False, 'message': 'User session expired. Please try again.'}, status=400)

            user = User.objects.get(pk=user_id)

            if user.profile.otp == otp_entered and user.profile.otp_created_at + timezone.timedelta(minutes=2) >= timezone.now():
                # Clear OTP fields
                user.profile.otp = None
                user.profile.otp_created_at = None
                user.profile.save()

                # Clear session
                del request.session['otp_user_id']

                # Redirect to reset password page
                request.session['reset_user_id'] = user.id
                return JsonResponse({'success': True, 'redirect_url': reverse('resetpassword')})

            else:
                messages.error(request, "Invalid OTP. Please enter the correct OTP.")
                return JsonResponse({'success': False, 'message': 'Invalid OTP. Please enter the correct OTP.'}, status=400)

        except User.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'User not found. Please try again.'}, status=400)

        except Exception as e:
            return JsonResponse({'success': False, 'message': str(e)}, status=400)

    return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=405)


def resend_otp(request):
    if request.method == 'POST':
        user_id = request.session.get('otp_user_id')

        if not user_id:
            return JsonResponse({'success': False, 'message': 'User session expired. Please try again.'}, status=400)

        try:
            user = User.objects.get(pk=user_id)
        except User.DoesNotExist:
            return JsonResponse({'success': False, 'message': 'User not found. Please try again.'}, status=400)

        # Generate new OTP and send via email
        otp = pyotp.TOTP(pyotp.random_base32()).now()
        user.profile.otp = otp
        user.profile.otp_created_at = timezone.now()
        user.profile.save()

        # Send OTP via email
        subject = "Your OTP Code"
        message = f"Your OTP code is {otp}. It is valid for 2 minutes."
        send_mail(subject, message, 'your-email@example.com', [user.email], fail_silently=False)

        return JsonResponse({'success': True, 'message': 'OTP resent successfully. Please check your email.'}, status=200)

    return JsonResponse({'success': False, 'message': 'Invalid request method.'}, status=400)


def reset_password(request):
    if request.method == 'POST':
        password1 = request.POST.get('password1')
        password2 = request.POST.get('password2')

        if len(password1) < 6:
            messages.error(request, "Password must be at least 6 characters long")
            return redirect('resetpassword')
        if password1 != password2:
            messages.error(request, "New passwords do not match.")
            return redirect('resetpassword')
        
        user_id = request.session.get('reset_user_id')
        if not user_id:
            messages.error(request, "Session expired or invalid.")
            return redirect('resetpassword')

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            messages.error(request, "User does not exist.")
            return redirect('resetpassword')
        
        user.set_password(password1)
        user.save()
        messages.success(request, "Password changed successfully.")
        return redirect('login')
    
    return render(request, 'resetpassword.html')



def logout(request):
    auth_logout(request)
    return redirect("index")

@never_cache
@login_required(login_url="login")
def add_address(request):
    if request.method == "POST":
        user = request.user
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
            return redirect('view_address')
        
        indian_state = [
            "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh",
            "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
            "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
            "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
            "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
            "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
        ]
        if state.casefold() not in [state_name.casefold() for state_name in indian_state]:
            messages.error(request, "Please provide a valid state.")
            return redirect('view_address')
            
        if not re.match(r'^[1-9][0-9]{5}$', pincode):
            messages.error(request, "Invalid pincode format. Please enter a valid Indian pincode.")
            return redirect('view_address')
        
        if not re.match(r'^[^@]+@[^@]+\.[^@]+$', email):
            messages.error(request, "Invalid email format.")
            return redirect('view_address')
        
        if not re.match(r'^\d{10}$', phone):
            messages.error(request, "Invalid phone number. Please enter a 10-digit phone number.")
            return redirect('view_address')

        
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
        return redirect('view_address')

    return render(request, 'address.html')   
 
@never_cache
@login_required(login_url="login")
def view_address(request):
    user = request.user
    addresses = Address.objects.filter(user=user, is_delete=False)

    context = {
        'user': user,
        'Addresses': addresses,
    }
    return render(request, 'address.html', context)


@never_cache
@login_required(login_url="login")
def delete_address(request, add_id):
        user = request.user
        address = Address.objects.get(pk=add_id,user=user)
        address.is_delete = not address.is_delete
        address.save()
        messages.success(request, 'Address deleted successfully')
        return redirect('view_address')
    
@never_cache
@login_required(login_url="login")
def edit_address(request, address_id):
    address = get_object_or_404(Address, pk=address_id)
    
    if request.method == "POST":
        name = request.POST.get("name", "").strip()    
        house_no = request.POST.get("house_no", "").strip()
        city = request.POST.get("city", "").strip()
        state = request.POST.get("state", "").strip()
        country = request.POST.get("country", "").strip()
        pincode = request.POST.get("pincode", "").strip()
        phone = request.POST.get("phone", "").strip()
        
        # Validate inputs
        errors = []
        if not name and len(name)<3:
            errors.append("Name is required.")
        if not house_no:
            errors.append("House No. is required.")
        if not city and len(city)<3:
            errors.append("City is required.")
        if not state and len(state)<3 :
            errors.append("State is required.")
        if not country and len(country)<3:
            errors.append("Country is required.")
        if not pincode:
            errors.append("Pincode is required.")
        if not phone:
            errors.append("Phone is required.")
        elif not phone.isdigit():
            errors.append("Phone number should only contain digits.")
        elif len(phone) < 10:
            errors.append("Phone number should be at least 10 digits long.")
        
        if errors:
            for error in errors:
                messages.error(request, error)
        

    
        indian_state = [
            "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh",
            "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
            "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
            "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
            "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
            "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
        ]
        if state.casefold() not in [state_name.casefold() for state_name in indian_state]:
            messages.error(request, "Please provide a valid state.")
            return redirect('view_address')
            
        
        if not re.match(r'^[1-9][0-9]{5}$', pincode):
            messages.error(request, "Invalid pincode format. Please enter a valid Indian pincode.")
            return redirect('view_address')
        
        if not re.match(r'^\d{10}$', phone):
            messages.error(request, "Invalid phone number. Please enter a 10-digit phone number.")
            return redirect('view_address')
        else:
            address.name = name
            address.house_no = house_no
            address.city = city
            address.state = state
            address.country = country
            address.pincode = pincode
            address.phone = phone
            
            address.save()
            
            messages.success(request, 'Address updated successfully')
            return redirect('view_address')  
    
    context = {
        'address': address
    }
    return render(request, 'address.html', context)
        
@never_cache
@login_required(login_url="login")
def useraccount(request,user_id):
    
    user = User.objects.get(id = user_id )
    
    wallet, created = Wallet.objects.get_or_create(user=user)
    
    orders = Order.objects.filter(user = user)
    order_count = orders.count()
    pending_orders = Order.objects.filter(user=user, payment__status='pending')
    pending_orders_count = pending_orders.count()
    delivered_orders = OrderProduct.objects.filter(user=user,status= 'Delivered').count() 
    context = {
        'user':user,
        'order_count':order_count,
        'wallet': wallet,
        'delivered_orders' : delivered_orders,
        'orders': orders,
        'pending_orders': pending_orders,
        'pending_orders_count':pending_orders_count,
        
    }
     
    return render(request, 'useraccount.html',context)


@never_cache
@login_required(login_url="login")
def order(request, user_id):
    
    user = User.objects.get(id=user_id)
    orders = Order.objects.filter(user=user).exclude(payment__status='pending').order_by('-id')

    user_cart, created = Cart.objects.get_or_create(user=user)
    cart_items = user_cart.cartproducts_set.count() 
    wishlist_items = Wishlist.objects.filter(user=user).count()
       
    context = {
        'user': user,
        'orders': orders,
        'cart_count': cart_items,
        'wishlist_items' : wishlist_items,
    }

    return render(request, 'order.html', context)

@never_cache
@login_required(login_url="login")
def order_tracking(request,user_id):
    user = User.objects.get(id = user_id )
    
    context = {
        'user':user,
    }
     
    return render(request, 'orders.html',context)

@never_cache
@login_required(login_url="login/")
def user_details(request, user_id):
    user = User.objects.get(id=user_id)
    
    user_cart, created = Cart.objects.get_or_create(user=user)
    cart_items = user_cart.cartproducts_set.count() 
    wishlist_items = Wishlist.objects.filter(user=user).count()
    if request.method == 'POST':
        uname = request.POST.get('username')
        fname = request.POST.get('firstname')
        lname = request.POST.get('lastname')
        
        password = request.POST.get('password')
        
        
        if not uname:
            messages.error(request, "Username field is required.")
        if not fname:
            messages.error(request, "First name field is required.")
        if not lname:
            messages.error(request, "Last name field is required.")
        if not password:
            messages.error(request, "Password field is required.")
        else:
            user_auth = authenticate(username=user.username, password=password)
            if user_auth is not None:
                user.username = uname
                user.first_name = fname
                user.last_name = lname
                user.save()
                messages.success(request, "Profile updated successfully.")
            else:
                messages.error(request, "Incorrect password.")
    
    context = {
        'user': user,
        'cart_count': cart_items,
        'wishlist_items' : wishlist_items,
    }
    
    return render(request, 'userdetails.html', context)

@never_cache
@login_required(login_url="login")
def change_password(request):
    
    user = request.user
    if request.method == 'POST':
        old_password = request.POST.get('old_password')
        new_password1  = request.POST.get('new_password1')
        new_password2  = request.POST.get('new_password2')
        
        
        if len(new_password1) < 6:
            messages.error(request, "Password must be at least 6 characters long")
            return redirect('change_password')
        if new_password1 != new_password2:
            messages.error(request, "New passwords do not match.")
            return redirect('change_password')
        
        user = authenticate(request,username=request.user.username, password=old_password)
        if user is not None:
            user.set_password(new_password1)
            user.save()
            update_session_auth_hash(request, user)  
            messages.success(request, "Password changed successfully.")
            return redirect('change_password')
        else:
            messages.error(request, "Old password is incorrect.")
            return redirect('change_password')
        
    return render(request,'changepassword.html')


@never_cache
def shop(request):
    categories = Category.objects.filter(is_listed=True)
    products = Products.objects.filter(is_listed=True)
    for product in products:
        if product.validate_offerdate and product.validate_offerdate < date.today():
            product.discount_percentage = None
            product.is_offer_applied = False
            product.validate_offerdate = None
            product.save(update_fields=['discount_percentage', 'is_offer_applied', 'validate_offerdate'])
    # Handle search
    query = request.GET.get('q')
    if query:
        products = products.filter(Q(name__icontains=query))
    # Filter by category
    category_ids = request.GET.getlist('category_ids')
    if category_ids:
        products = products.filter(category_id__in=category_ids)

    # Filter by price range
    price_ranges = request.GET.getlist('price_ranges')
    if price_ranges:
        price_conditions = Q()
        for price_range in price_ranges:
            min_price, max_price = map(int, price_range.split('-'))
            price_conditions |= Q(price__gte=min_price, price__lte=max_price)
        products = products.filter(price_conditions)

    # Filter by availability
    availability = request.GET.getlist('availability')
    if availability:
        availability_conditions = Q()
        if 'instock' in availability:
            availability_conditions |= Q(quantity__gt=0)
        if 'outofstock' in availability:
            availability_conditions |= Q(quantity=0)
        products = products.filter(availability_conditions)
    
    # Handling sorting
    sort_by = request.GET.get('SortBy', 'featured')
    if sort_by == 'title-ascending':
        products = products.order_by('name')
    elif sort_by == 'title-descending':
        products = products.order_by('-name')
    elif sort_by == 'price-ascending':
        products = products.order_by('price')
    elif sort_by == 'price-descending':
        products = products.order_by('-price')

    # Pagination
    paginator = Paginator(products, 6)  # Show 6 products per page
    page = request.GET.get('page')
    try:
        paginated_products = paginator.page(page)
    except PageNotAnInteger:
        paginated_products = paginator.page(1)
    except EmptyPage:
        paginated_products = paginator.page(paginator.num_pages)

    # Handling user-specific data if authenticated
    cart_items = wishlist_items = 0
    if request.user.is_authenticated:
        user = request.user
        user_cart, created = Cart.objects.get_or_create(user=user)
        cart_items = user_cart.cartproducts_set.count()
        wishlist_items = Wishlist.objects.filter(user=user).count()

    context = {
        'categories': categories,
        'products': paginated_products,
        'cart_count': cart_items,
        'wishlist_items': wishlist_items,
        'current_filters': request.GET,  # Pass the current filters to the context
        'query': query,
    }

    return render(request, 'shop.html', context)

def get_razorpay_order_data(request, order_id):
    try:
        orderDta = Order.objects.get(id=order_id)
        if not orderDta.payment or orderDta.payment.status != 'pending':
            return JsonResponse({'success': False, 'error': 'Invalid order or payment status'}, status=400)
        
         # Mock amount and other details as needed
        client = razorpay.Client(auth =(settings.RAZORPAY_KEY,settings.RAZORPAY_SECRET))

        amount = orderDta.total_amount * 100  # Razorpay expects amount in paise
        order = client.order.create({
                'amount': int(amount),
                'currency': 'INR',
                'payment_capture': '1'  # Automatic payment capture
            })
        return JsonResponse({
            'success': True,
            'order_id':  order['id'],
            'amount': amount
        })
    except Order.DoesNotExist:
        return JsonResponse({'success': False, 'error': 'Order not found'}, status=404)


def verify_razorpay_payment(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        razorpay_payment_id = data.get('razorpay_payment_id')
        razorpay_order_id = data.get('razorpay_order_id')
        razorpay_signature = data.get('razorpay_signature')
        order_id = data.get('order_id')

        try:
            order = Order.objects.get(id=order_id)
            if not order.payment or order.payment.status != 'pending':
                return JsonResponse({'success': False, 'error': 'Invalid order or payment status'}, status=400)
            client = razorpay.Client(auth =(settings.RAZORPAY_KEY,settings.RAZORPAY_SECRET)) 
            # Verify the payment signature
            # This is where you should add your Razorpay signature verification logic
            # If verification succeeds:
            data = {
            'razorpay_order_id': razorpay_order_id,
            'razorpay_payment_id': razorpay_payment_id,
            'razorpay_signature': razorpay_signature
        }
            client.utility.verify_payment_signature(data)
            order.payment.status = 'completed'
            order.razorpay_order_id=razorpay_order_id
            order.razorpay_payment_id =razorpay_payment_id
            order.razorpay_payment_signature=razorpay_signature
            order.payment.save()
            OrderProduct.objects.filter(order=order).update(status='Processing')

            return JsonResponse({'success': True, 'order_id': order_id})
        except Order.DoesNotExist:
            return JsonResponse({'success': False, 'error': 'Order not found'}, status=404)
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)}, status=400)

def aboutus(request):

    return render(request,'aboutus.html')
def contactus(request):
    
    return render(request,'contactus.html')

def custom_404_view(request, exception):
    return render(request, '404.html', status=404)