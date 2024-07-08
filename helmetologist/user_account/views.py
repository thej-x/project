from django.shortcuts import render
from django.shortcuts import redirect,render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.contrib import messages
from django.views.decorators.cache import never_cache
import re
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
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import logout as auth_logout
from .models import Address
from category.models import Category
from products.models import Products,Colour_product,Colour_image
from django.contrib.auth import get_user_model


# Create your views here.

def index(request):
    Categories = Category.objects.all()
    products = Products.objects.all().prefetch_related('colour_variants__images')
    
    return render(request,'index.html',
                    {
                    'Categories': Categories,
                    'Products':products,
                    }
                  )

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
        if len(pass1) < 8:
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
            print('Session expired, no user_id in session.')
            return JsonResponse({'success': False, 'message': "Session expired. Please sign up again."}, status=400)

        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            print('User not found for user_id:', user_id)
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
        print('Session expired, no user_id in session.')
        return JsonResponse({'success': False, 'message': 'Session expired. Please sign up again.'}, status=400)

    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        print('User not found for user_id:', user_id)
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
            print (user,'user')
            if user is not None:
                login(request, user)
                return redirect('index')  
            else:
                messages.error(request, "Invalid email or password")

    return render(request, 'login.html')

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
        
        # Validate that all fields are provided
        # if not all([name, phone, email, house_no, city, state, country, pincode]):
        #     messages.error(request, "Please provide all fields.")
        #     return redirect('add_address')
        
        # Validate state
        # indian_state = [
        #     "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh",
        #     "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu",
        #     "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand",
        #     "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
        #     "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
        #     "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
        # ]
        # if state.casefold() not in [state_name.casefold() for state_name in indian_state]:
        #     messages.error(request, "Please provide a valid state.")
        #     return redirect('add_address')
            
        # Validate pincode
        # if not re.match(r'^[1-9][0-9]{5}$', pincode):
        #     messages.error(request, "Invalid pincode format. Please enter a valid Indian pincode.")
        #     return redirect('add_address')
        
        # Validate email format
        # if not re.match(r'^[^@]+@[^@]+\.[^@]+$', email):
        #     messages.error(request, "Invalid email format.")
        #     return redirect('add_address')
        
        # Validate phone number (assuming 10 digits for Indian phone numbers)
        # if not re.match(r'^\d{10}$', phone):
        #     messages.error(request, "Invalid phone number. Please enter a 10-digit phone number.")
        #     return redirect('view_address')

        # Create the address object
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
    user = request.user
    address = Address.objects.filter(user = user, is_delete=False)
    
    context = {
        'user' : user,
        'Addresses':address,
        
    }

    return render(request, 'address.html',context)    

def delete_address(request, add_id):
        user = request.user
        address = Address.objects.get(pk=add_id)
        address.is_delete = True
        address.delete()
        return redirect('add_address')
    

def edit_address(request,address_id):
    address = Address.objects.get(pk=address_id)
    
    if request.method == "POST":
        name = request.POST.get("firstname", "").strip()
        email = request.POST.get("email", "").strip()
        phone = request.POST.get("phone", "").strip()
        house_no = request.POST.get("house_no", "").strip()
        city = request.POST.get("city", "").strip()
        state = request.POST.get("state", "").strip()
        country = request.POST.get("country", "").strip()
        pincode = request.POST.get("pincode", "").strip()
        
        address.name = name
        address.email = email
        address.phone = phone 
        address.house_no = house_no
        address.city = city
        address.state = state
        address.country = country
        address.pincode = pincode

        address.save()
        
        messages.success(request,'Adress updates sucessfully')
        return redirect('add_address')
    
    context = {
        'address': address
    }
    return render(request, 'add_address.html', context)
        
@login_required
def useraccount(request,user_id):
    user = User.objects.get(id = user_id )
    address = Address.objects.filter(user=user)
    context = {
        'user':user,
        'Addresses':address,
    }
     
    return render(request, 'useraccount.html',context)

@login_required
def orders(request,user_id):
    user = User.objects.get(id = user_id )
    
    context = {
        'user':user,
    }
     
    return render(request, 'orders.html',context)

@login_required
def order_tracking(request,user_id):
    user = User.objects.get(id = user_id )
    
    context = {
        'user':user,
    }
     
    return render(request, 'orders.html',context)

@login_required
def user_details(request, user_id):
    user = User.objects.get(id=user_id)
    
    if request.method == 'POST':
        uname = request.POST.get('username')
        fname = request.POST.get('firstname')
        lname = request.POST.get('lastname')
        
        password = request.POST.get('password')
        
        # Validation
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
    }
    
    return render(request, 'userdetails.html', context)