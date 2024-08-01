from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.views.decorators.http import require_POST
from django.views.decorators.cache import never_cache
from django.contrib.auth.decorators import login_required,user_passes_test
from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_POST
from django.contrib import messages

from .models import *
# Create your views here.



def is_superuser(user):
    return user.is_superuser



def adminorders(request):
    order_products = OrderProduct.objects.select_related('product')
    orders = Order.objects.all().prefetch_related(
        Prefetch('order', queryset=order_products)
    ).order_by('-id')
    
    context = {
        'orders': orders,
    }
    return render(request, 'adminorders.html', context)

def order_products(request, id):
    order = get_object_or_404(Order, orderid=id)
    products = OrderProduct.objects.filter(order=order)
    context = {
        'order': order,
        'products' : products,
        'status_choices': OrderProduct.ORDER_STATUS_CHOICES

    }
    
    return render(request, 'order_products.html', context)




def update_order_product_status(request, id, order_product_id):
    order = get_object_or_404(Order, orderid=id)
    order_product = get_object_or_404(OrderProduct, id=order_product_id, order=order)
    
    if request.method == 'POST':
        status = request.POST.get('status')
        
        if not status:
            messages.error(request, 'Status is missing.')
        elif status not in dict(OrderProduct.ORDER_STATUS_CHOICES).keys():
            messages.error(request, 'Invalid status.')
        else:
            order_product.status = status
            order_product.save()
            messages.success(request, 'Order status updated successfully.')
            return redirect('update_order_product_status', id=id, order_product_id=order_product_id)

    context = {
        'order': order,
        'order_product': order_product,
        'status_choices': OrderProduct.ORDER_STATUS_CHOICES
    }
    return render(request, 'order_product_details.html', context)


def view_order(request,order_product_id):
    user=request.user
    print(order_product_id,'id')
    order_product = OrderProduct.objects.get(id=order_product_id, user=user)    
    print(order_product,'working')
    context ={
        'order_product':order_product,
    }
    return render(request,'order_details.html',context)


def cancel_order_request(request, order_product_id):
    order_product = get_object_or_404(OrderProduct, id=order_product_id)
    
    if request.method == 'POST':
        cancellation_reason = request.POST.get('cancellation_reason')
        
        order_product.status = 'Cancelled'
        order_product.cancellation_reason = cancellation_reason
        order_product.product.quantity += order_product.quantity
        order_product.product.save()
        order_product.save()
        
        messages.success(request, 'Your order has been cancelled.')
        return redirect('view_order',order_product_id)
    
    return render(request, 'view_order.html', {'order_product': order_product})
    