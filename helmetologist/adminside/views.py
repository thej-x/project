from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required,user_passes_test
from django.contrib import messages
from django.views.decorators.cache import never_cache
from user_account.models import User
from django.http import JsonResponse
from django.views.decorators.http import require_POST

from django.contrib.auth import logout as auth_logout


def is_superuser(user):
    return user.is_superuser

@never_cache
def adminlogin(request):

    if request.method == 'POST':
        uname = request.POST.get('uname')
        password = request.POST.get('password')

        user = authenticate(request, username=uname, password=password)
        
        if user is not None:
            if user.is_superuser:
                login(request, user)
                return redirect('admindashboard')
            else:
                messages.error(request, "You do not have permission to access this page.")
        else:
            messages.error(request, "Invalid username or password.")

    return render(request, 'adminlogin.html')

@never_cache
@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def admindashboard(request):
    return render(request, 'admindashboard.html')

@never_cache
@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def adminuser(request):
    
    if request.user.is_authenticated :
        users = User.objects.exclude(is_superuser=True)
        context = {'users': users}
        return render(request, 'adminuser.html', context)       
            
@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
@require_POST
def block_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.is_active = False
        user.save()
        return JsonResponse({'success': True})
    except User.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'User not found'})


@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
@require_POST
def unblock_user(request, user_id):
    try:
        user = User.objects.get(id=user_id)
        user.is_active = True
        user.save()
        return JsonResponse({'success': True})
    except User.DoesNotExist:
        return JsonResponse({'success': False, 'message': 'User not found'})    


@never_cache 
def adminlogout(request):
    auth_logout(request)
    return render(request,'adminlogin.html')