from django.shortcuts import render,redirect
from django.contrib.auth.models import User
from django.views.decorators.http import require_POST
from django.views.decorators.cache import never_cache
from django.contrib.auth.decorators import login_required,user_passes_test
from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_POST
from django.contrib import messages
from cart.models import Coupon
from .models import *
from django.db import transaction

# Create your views here.



def is_superuser(user):
    return user.is_superuser


@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def adminorders(request):
    order_products = OrderProduct.objects.select_related('product')
    orders = Order.objects.all().prefetch_related(
        Prefetch('order', queryset=order_products)
    ).order_by('-created_at')
    
    context = {
        'orders': orders,
    }
    return render(request, 'adminorders.html', context)

@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def order_products(request, order_id):
    order = get_object_or_404(Order, id=order_id)
    products = OrderProduct.objects.filter(order=order)
    
    
    context = {
        'order': order,
        'products' : products,
        'status_choices': OrderProduct.ORDER_STATUS_CHOICES,
        
    }
    
    return render(request, 'order_products.html', context)



@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def update_order_product_status(request, id, order_product_id):
    order = get_object_or_404(Order, orderid=id)
    order_product = get_object_or_404(OrderProduct, id=order_product_id, order=order)
    pending_transactions = Transaction.objects.filter(wallet__user=order.user, status='pending')
    
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
        'status_choices': OrderProduct.ORDER_STATUS_CHOICES,
        'pending_transactions': pending_transactions,

    }
    return render(request, 'order_product_details.html', context)


from django.db import transaction as db_transaction

def update_wallet_status(request, id, order_product_id):
    order = get_object_or_404(Order, orderid=id)
    order_product = get_object_or_404(OrderProduct, id=order_product_id, order=order)
    
    if request.method == 'POST':
        transaction_id = request.POST.get('transaction_id')
        action = request.POST.get('action')

        if transaction_id and action:
            with db_transaction.atomic():
                transaction = get_object_or_404(Transaction, id=transaction_id)
                if action == 'approve':
                    if transaction.status == 'pending':
                        transaction.status = 'approved'
                        transaction.save()
                        
                        # Update wallet balance only when approving
                        transaction.wallet.balance += transaction.amount
                        transaction.wallet.save()
                        
                        messages.success(request, 'Transaction approved and wallet credited.')
                    else:
                        messages.warning(request, 'This transaction has already been processed.')
                elif action == 'reject':
                    if transaction.status == 'pending':
                        transaction.status = 'rejected'
                        transaction.save()
                        messages.success(request, 'Transaction rejected.')
                    else:
                        messages.warning(request, 'This transaction has already been processed.')
    
    # Fetch pending transactions after processing
    pending_transactions = Transaction.objects.filter(wallet__user=order.user, status='pending')
    
    context = {
        'order': order,
        'order_product': order_product,
        'status_choices': OrderProduct.ORDER_STATUS_CHOICES,
        'pending_transactions': pending_transactions,
    }
    return render(request, 'order_product_details.html', context)
    


@login_required(login_url="login/")
def view_order(request,order_product_id):
    user=request.user
    
    order_product = OrderProduct.objects.get(id=order_product_id, user=user)    
    
    context ={
        'order_product':order_product,
    }
    return render(request,'order_details.html',context)

@login_required(login_url="login/")
def cancel_order_request(request, order_product_id):
    user = request.user

    order_product = get_object_or_404(OrderProduct, id=order_product_id)
    payment_method = order_product.order.payment.method
    
    wallet,created = Wallet.objects.get_or_create(user=user)
    wallet.approvel = False
    wallet.save()
    if request.method == 'POST':
        cancellation_reason = request.POST.get('cancellation_reason')
        
        refund_amount = calculate_refund_amount(order_product)
        if payment_method in ['Razorpay', 'Wallet'] :
            
          
        
            # Create a Transaction record for the credit
            Transaction.objects.create(
                wallet=wallet,
                amount=refund_amount,
                transaction_type='credit',

            )
        
        order_product.status = 'Cancelled'
        
        order_product.cancellation_reason = cancellation_reason
        order_product.product.quantity += order_product.quantity
        order_product.product.save()
        order_product.save()
        
        messages.success(request, 'Your order has been cancelled.')
        return redirect('view_order',order_product_id)
    
    return render(request, 'view_order.html', {'order_product': order_product})
    
@login_required(login_url="login/")    
def wallet(request):
    user = request.user
    wallet, created = Wallet.objects.get_or_create(user=user)  # Unpack the tuple to get the wallet instance
   # Get all transactions, ordered by most recent
    all_transactions = wallet.transaction_set.all().order_by('-date')
    
    # Separate approved and pending transactions
    approved_transactions = all_transactions.filter(status='approved')
    pending_transactions = all_transactions.filter(status='pending')

    context = {
        'wallet': wallet,
        'approved_transactions': approved_transactions,
        'pending_transactions': pending_transactions,
    }
    return render(request, 'wallet.html', context)


def return_product(request, order_product_id):
    # Get the order product and associated order
    order_product = get_object_or_404(OrderProduct, id=order_product_id)
    order = order_product.order

    # Check if the order is delivered
    if order_product.status != "Delivered" :
        messages.error(request, "The order is not delivered yet")
        return redirect('view_order', order_product_id)

    # Calculate discount amount based on applied coupon and product-specific discount
    discount_percentage = 0
    discount_amount = 0

    # Total order amount before any discounts
    total_order_amount = sum(op.totel_price for op in order.order.all())

    # Check if a coupon was applied to the order
    if order.coupon_id:
        try:
            applied_coupon = Coupon.objects.get(id=order.coupon_id, active=True)
            if applied_coupon:
                discount_percentage = applied_coupon.discount_percentage
        except Coupon.DoesNotExist:
            applied_coupon = None

    # Calculate the proportion of the coupon discount for this product
    if discount_percentage > 0:
        product_coupon_discount = (order_product.totel_price / total_order_amount) * discount_percentage
        discount_amount += (order_product.totel_price * product_coupon_discount) / 100

    # Add product-specific discount percentage
    if order_product.discount_percentage:
        discount_amount += (order_product.totel_price * order_product.discount_percentage) / 100

    # Calculate the refund amount
    refund_amount = order_product.totel_price - discount_amount

    # Process the return
    order_product.status = "Returned"
    order_product.save()

    # Handle wallet crediting
    try:
        with transaction.atomic():
            wallet, created = Wallet.objects.get_or_create(user=order.user)
            
        
            
            pending_transaction = Transaction.objects.create(
                wallet=wallet,
                amount=refund_amount,
                transaction_type='credit',
                status='pending'  
            )

        messages.success(request, "Product return processed successfully. Credit amount is pending approval.")
        return redirect('view_order', order_product_id)
    except Exception as e:
        messages.error(request, f"An error occurred: {e}")
        return redirect('view_order', order_product_id)


def calculate_refund_amount(order_product):
    # Initialize discount amounts
    discount_percentage = 0
    discount_amount = 0

    # Get the associated order
    order = order_product.order

    # Calculate total order amount before any discounts
    total_order_amount = sum(op.totel_price for op in order.order.all())

    # Check if a coupon was applied to the order
    if order.coupon_id:
        try:
            applied_coupon = Coupon.objects.get(id=order.coupon_id, active=True)
            if applied_coupon:
                discount_percentage = applied_coupon.discount_percentage
        except Coupon.DoesNotExist:
            applied_coupon = None

    # Calculate the proportion of the coupon discount for this product
    if discount_percentage > 0:
        product_coupon_discount = (order_product.totel_price / total_order_amount) * discount_percentage
        discount_amount += (order_product.totel_price * product_coupon_discount) / 100

    # Add product-specific discount percentage
    if order_product.discount_percentage:
        discount_amount += (order_product.totel_price * order_product.discount_percentage) / 100

    # Calculate the final refund amount
    refund_amount = order_product.totel_price - discount_amount
    return refund_amount


def payment_status(request):
    user = request.user
    order_products = OrderProduct.objects.filter(user=user,status='Pending')
    
       
    context ={
        'order_products' : order_products,
    }  
    
    return render(request,'failed_order.html',context)