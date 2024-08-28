from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required,user_passes_test
from django.contrib import messages
from django.views.decorators.cache import never_cache
from user_account.models import User
from django.http import JsonResponse
import json
from django.db.models.functions import TruncDate, TruncWeek, TruncMonth

from django.views.decorators.http import require_POST
from order.models import *
from django.contrib.auth import logout as auth_logout
from django.db.models import Sum, Count, F
from django.db.models.functions import TruncMonth
from datetime import datetime,timedelta
from datetime import datetime, timedelta
from django.db.models import Sum, Case, When, Value, BooleanField
from django.shortcuts import render
from cart.models import *
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

from django.core.serializers.json import DjangoJSONEncoder

class DecimalEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return float(obj)
        return super().default(obj)

from django.db.models import Sum, Count,Max
from django.conf import settings
@never_cache
@login_required(login_url='/adminlogin/')
@user_passes_test(is_superuser)
def admindashboard(request):
    if request.method == 'GET':
        orders = OrderProduct.objects.filter(status='Delivered').select_related('order').order_by('order__created_at')
        top_products = OrderProduct.objects.values('product__id', 'product__name', 'product__price', 'product__thumbnail', 'product__category__cat_name') \
            .annotate(total_quantity=Sum('quantity')) \
            .order_by('-total_quantity')[:10]
        
        max_quantity = top_products.aggregate(max_quantity=Max('total_quantity'))['max_quantity']
        for product in top_products:
            product['percentage'] = (product['total_quantity'] / max_quantity) * 100
            if product['product__thumbnail']:
                product['thumbnail_url'] = settings.MEDIA_URL + str(product['product__thumbnail'])
            else:
                product['thumbnail_url'] = None

        report_type = request.GET.get('report_type')
        today = timezone.now()

        if report_type == 'day':
            orders = orders.filter(order__created_at__date=today.date())
        elif report_type == 'week':
            start_of_week = today - timedelta(days=today.weekday())
            orders = orders.filter(order__created_at__date__gte=start_of_week, order__created_at__date__lte=today)
        elif report_type == 'month':
            month = int(request.GET.get('month', today.month))
            year = int(request.GET.get('year', today.year))
            orders = orders.filter(order__created_at__month=month, order__created_at__year=year)
        elif report_type == 'year':
            year = int(request.GET.get('year', today.year))
            orders = orders.filter(order__created_at__year=year)
        elif report_type == 'custom':
            start_date = request.GET.get('start_date')
            end_date = request.GET.get('end_date')
            if start_date and end_date:
                orders = orders.filter(order__created_at__date__gte=start_date, order__created_at__date__lte=end_date)

        
        total_order_count = 0
        total_sales_amount = Decimal('0.00')
        total_discount_amount = Decimal('0.00')
        total_final_total = Decimal('0.00')
        earnings = Decimal('0.00')

        
        grouped_orders = {}
        for order_product in orders:
            order_id = order_product.order_id

            
            product_total_amount = order_product.price * order_product.quantity
            product_discount_amount = (product_total_amount * order_product.discount_percentage) / 100 if order_product.discount_percentage else Decimal('0.00')
            product_final_total = product_total_amount - product_discount_amount

            
            if order_id not in grouped_orders:
                grouped_orders[order_id] = {
                    'order': order_product.order,
                    'products': [],
                    'total_amount': Decimal('0.00'),
                    'discount_amount': Decimal('0.00'),
                    'final_total': Decimal('0.00')
                }

            grouped_orders[order_id]['products'].append({
                'product': order_product.product,
                'quantity': order_product.quantity,
                'product_total_amount': product_total_amount,
                'product_discount_amount': product_discount_amount,
                'product_final_total': product_final_total
            })

            # Aggregate totals
            grouped_orders[order_id]['total_amount'] += product_total_amount
            grouped_orders[order_id]['discount_amount'] += product_discount_amount
            grouped_orders[order_id]['final_total'] += product_final_total

            # Update overall totals
            total_order_count += 1
            total_sales_amount += product_total_amount
            total_discount_amount += product_discount_amount
            total_final_total += product_final_total

        # Calculate earnings
        earnings = total_sales_amount - total_discount_amount

        # Prepare data for the chart
        chart_labels = []
        chart_data = []

        for order in grouped_orders.values():
            for product in order['products']:
                product_name = product['product'].name
                product_sales = float(product['product_final_total'])  
                
                if product_name in chart_labels:
                    index = chart_labels.index(product_name)
                    chart_data[index] += product_sales
                else:
                    chart_labels.append(product_name)
                    chart_data.append(product_sales)
        total_sales_labels = []
        total_sales_data = []

        if report_type == 'day':
            sales_by_date = orders.annotate(date=TruncDate('order__created_at')).values('date').annotate(total_sales=Sum('price')).order_by('date')
            for entry in sales_by_date:
                total_sales_labels.append(entry['date'].strftime('%Y-%m-%d'))
                total_sales_data.append(float(entry['total_sales']))
        elif report_type == 'week':
            sales_by_week = orders.annotate(week=TruncWeek('order__created_at')).values('week').annotate(total_sales=Sum('price')).order_by('week')
            for entry in sales_by_week:
                total_sales_labels.append(entry['week'].strftime('%Y-%m-%d'))
                total_sales_data.append(float(entry['total_sales']))
        else:  # month, year, and custom
            sales_by_month = orders.annotate(month=TruncMonth('order__created_at')).values('month').annotate(total_sales=Sum('price')).order_by('month')
            for entry in sales_by_month:
                total_sales_labels.append(entry['month'].strftime('%Y-%m'))
                total_sales_data.append(float(entry['total_sales']))

        context = {
            'orders': grouped_orders.values(),
            'total_order_count': total_order_count,
            'total_sales_amount': total_sales_amount,
            'total_discount_amount': total_discount_amount,
            'earnings': earnings,
            'total_final_total': total_final_total,
            'months': range(1, 13),
            'years': range(2020, timezone.now().year + 1),
            'chart_labels': json.dumps(chart_labels),
            'chart_data': json.dumps(chart_data, cls=DecimalEncoder),
            'total_sales_labels': json.dumps(total_sales_labels),
            'total_sales_data': json.dumps(total_sales_data, cls=DecimalEncoder),
            'report_type': report_type,
            'top_products': top_products,
        }

        return render(request, 'admindashboard.html', context)
    
    
@never_cache
@login_required(login_url='adminlogin')
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
    
def sales(request):
    if request.method == 'GET':
        # Fetch orders that are delivered and sort by creation date
        orders = OrderProduct.objects.filter(status='Delivered').select_related('order').order_by('order__created_at')

        # Get filter parameters from request
        report_type = request.GET.get('report_type')
        today = datetime.today()

        # Filter orders based on the report type
        if report_type == 'day':
            orders = orders.filter(order__created_at__date=today.date())
        elif report_type == 'week':
            start_of_week = today - timedelta(days=today.weekday())
            orders = orders.filter(order__created_at__date__gte=start_of_week, order__created_at__date__lte=today)
        elif report_type == 'month':
            month = request.GET.get('month', today.month)
            year = request.GET.get('year', today.year)
            orders = orders.filter(order__created_at__month=month, order__created_at__year=year)
        elif report_type == 'year':
            year = request.GET.get('year', today.year)
            orders = orders.filter(order__created_at__year=year)
        elif report_type == 'custom':
            start_date = request.GET.get('start_date')
            end_date = request.GET.get('end_date')
            if start_date and end_date:
                orders = orders.filter(order__created_at__date__gte=start_date, order__created_at__date__lte=end_date)

        # Initialize aggregated totals
        total_order_count = 0
        total_sales_amount = 0
        total_discount_amount = 0
        total_final_total = 0
        earnings = 0 

        # Calculate totals for each order and product
        grouped_orders = {}
        for order_product in orders:
            order_id = order_product.order_id

            # Calculate product level amounts
            product_total_amount = order_product.price * order_product.quantity
            product_discount_amount = (product_total_amount * order_product.discount_percentage) / 100 if order_product.discount_percentage else 0
            product_final_total = product_total_amount - product_discount_amount

            # Group by order ID
            if order_id not in grouped_orders:
                grouped_orders[order_id] = {
                    'order': order_product.order,
                    'products': [],
                    'total_amount': 0,
                    'discount_amount': 0,
                    'final_total': 0
                }

            grouped_orders[order_id]['products'].append({
                'product': order_product.product,
                'quantity': order_product.quantity,
                'product_total_amount': product_total_amount,
                'product_discount_amount': product_discount_amount,
                'product_final_total': product_final_total
            })

            # Aggregate totals
            grouped_orders[order_id]['total_amount'] += product_total_amount
            grouped_orders[order_id]['discount_amount'] += product_discount_amount
            grouped_orders[order_id]['final_total'] += product_final_total

            # Update overall totals
            total_order_count += 1
            total_sales_amount += product_total_amount
            total_discount_amount += product_discount_amount
            total_final_total += product_final_total
            earnings = total_sales_amount - total_discount_amount
        context = {
            'orders': grouped_orders.values(),
            'total_order_count': total_order_count,
            'total_sales_amount': total_sales_amount,
            'total_discount_amount': total_discount_amount,
            'earnings':earnings,
            'total_final_total': total_final_total,
            'months': range(1, 13),
            'years': range(2020, datetime.now().year + 1),
            
        }

        return render(request, 'sales.html', context)
            


@never_cache 
def adminlogout(request):
    auth_logout(request)
    return render(request,'adminlogin.html')