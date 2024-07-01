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

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile
from django.core.mail import send_mail
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import logout as auth_logout
from .models import UserData
from category.models import Category
from products.models import Products
from django.contrib.auth import get_user_model


# Create your views here.

def index(request):
    Categories = Category.objects.all()
    products = Products.objects.all()
    return render(request,'index.html',{'Categories': Categories,'Products':products})

def signuppage(request):
    if request.method == 'POST':
        fname = request.POST.get('firstname')
        lname = request.POST.get('lastname')
        email = request.POST.get('email')
        pass1 = request.POST.get('password1')
        pass2 = request.POST.get('password2')

        # Basic validation checks
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
                username=email,
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
        email = request.POST.get('email')
        password = request.POST.get('password')

        if not email:
            messages.error(request, "Email field is required.")
        elif not password:
            messages.error(request, "Password field is required.")
        else:
            user = authenticate(request, username=email, password=password)
            if user is not None:
                login(request, user)
                return redirect('index')  
            else:
                messages.error(request, "Invalid email or password")

    return render(request, 'login.html')

def logout(request):
    auth_logout(request)
    return redirect("index")

@login_required
def useraccount(request):
    return render(request, 'useraccount.html')