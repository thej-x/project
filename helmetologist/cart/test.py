@csrf_exempt
def checkout(request):
    if request.user.is_authenticated:
        print('222')
        user = request.user
        cart, created = Cart.objects.get_or_create(user=user)
        cart_items = cart.cartproducts_set.all()
        addresses = Address.objects.filter(user=user, is_delete=False)
        cart_total = cart.coupon_applied_cart_sub_total if cart.coupon else cart.cart_sub_total
        
        if request.method == 'POST':
            print('333')
            action = request.POST.get('action')

            if action == 'apply_coupon':
                code = request.POST.get('code')
                coupon = Coupon.objects.filter(code=code, active=True).first()

                if not coupon:
                    messages.warning(request, 'Invalid coupon')
                    return redirect('checkout_view')

                if cart.coupon:
                    messages.warning(request, 'Coupon already applied')
                    return redirect('checkout_view')
                if coupon.quantity == 0:
                    messages.warning(request, 'Coupon exceeds the limit')
                    return redirect('checkout_view')

                cart.coupon = coupon
                coupon.quantity -= 1
                coupon.save()

                cart.save()
                messages.success(request, 'Coupon applied')
                return redirect('checkout_view')

            elif action == 'remove_coupon':
                cart.coupon.quantity += 1
                cart.coupon.save()
                if cart.coupon:
                    cart.coupon = None
                    cart.save()

                    messages.success(request, 'Coupon removed')
                else:
                    messages.warning(request, 'No coupon to remove')
                return redirect('checkout_view')

            elif action == 'place_order':
                print('444')
                if cart_items.count() == 0:
                    print('cart emty aay')
                    messages.error(request, "Your cart is empty. Add any product.")
                    return redirect('cart_show')

                billing_address_id = request.POST.get('billing_address')
                payment_method = request.POST.get('payment_method')
                if payment_method == 'COD':
                    if not billing_address_id or not payment_method:
                        messages.error(request, "Please select a billing address and payment method.")
                        return redirect('checkout_view')

                    try:
                        billing_address = Address.objects.get(id=billing_address_id, user=user)
                    except Address.DoesNotExist:
                        messages.error(request, "Invalid address selected.")
                        return redirect('checkout_view')

                    order_amount = cart.coupon_applied_cart_sub_total if cart.coupon else cart.cart_sub_total
                    if order_amount < 1.00:
                        messages.error(request, "Order amount must be at least ₹1.00.")
                        return redirect('checkout_view')

                    payment = Payment.objects.create(
                        user=user,
                        method=payment_method,
                        amount=order_amount,
                        status="pending"
                    )
                    print('payment create aay')

                    order = Order.objects.create(
                        user=user,
                        payment=payment,
                        billing_address=billing_address,
                        total_amount=order_amount,
                        payment_method=payment_method,
                        orderid=str(uuid.uuid4())[:8]
                    )
                    print('order create aay')

                    for item in cart_items:
                        OrderProduct.objects.create(
                            order=order,
                            product=item.products,
                            price=item.products.price,
                            quantity=item.quantity,
                            user=user
                        )

                    cart.cartproducts_set.all().delete()
                    print('payment create aay')
                    cart.coupon = None
                    cart.save()
                if payment_method == 'Razorpay':
                    print('razor pay method')
                    if not billing_address_id or not payment_method:
                        messages.error(request, "Please select a billing address and payment method.")
                        return redirect('checkout_view')

                    try:
                        billing_address = Address.objects.get(id=billing_address_id, user=user)
                    except Address.DoesNotExist:
                        messages.error(request, "Invalid address selected.")
                        return redirect('checkout_view')

                    order_amount = cart.coupon_applied_cart_sub_total if cart.coupon else cart.cart_sub_total
                    if order_amount < 1.00:
                        messages.error(request, "Order amount must be at least ₹1.00.")
                        return redirect('checkout_view')

                    payment = Payment.objects.create(
                        user=user,
                        method=payment_method,
                        amount=order_amount,
                        status="pending"
                    )
                    print('payment create aay')

                    order = Order.objects.create(
                        user=user,
                        payment=payment,
                        billing_address=billing_address,
                        total_amount=order_amount,
                        payment_method=payment_method,
                        orderid=str(uuid.uuid4())[:8]
                    )
                    print('order create aay')

                    for item in cart_items:
                        OrderProduct.objects.create(
                            order=order,
                            product=item.products,
                            price=item.products.price,
                            quantity=item.quantity,
                            user=user
                        )

                   
                     
                    amount = order_amount
                    print(amount,'razorpay')
                    client = razorpay.Client(auth=(settings.RAZORPAY_KEY, settings.RAZORPAY_SECRET))
                    print(client)
                    try:
                        razorpay_order = client.order.create({
                            'amount': int(amount * 100), 
                            'currency': 'INR',
                            'payment_capture': '1'
                        })
                    except razorpay.errors.BadRequestError as e:
                        messages.error(request, f"Razorpay Error: {str(e)}")
                        return redirect('checkout_view')
               

                    context = {
                        'order': order,
                        'razorpay_order_id': razorpay_order['id'],
                        'razorpay_key': settings.RAZORPAY_KEY,
                        'amount': amount,
                        'user_email': user.email,
                        'user_name': user.first_name,
                        'addresses': addresses,
                        'cart': cart,
                        'cart_items': cart_items,
                        'cart_total': cart_total,
                    }
                    # return redirect( 'checkout', context)
                    return render(request, 'checkout.html', context)
                else:
                    url = reverse('checkout_success', args=[order.id])
                    return redirect(url)

        return render(request, 'checkout.html', {
            'addresses': addresses,
            'cart': cart,
            'cart_items': cart_items,
            'cart_total': cart_total,
            
        })

    else:
        return redirect('login')
    
def razorpay_init(request):
     cart, created = Cart.objects.get_or_create(user=user)
     cart_items = cart.cartproducts_set.all()
     cart_total = cart.coupon_applied_cart_sub_total if cart.coupon else cart.cart_sub_total
     amount = cart_total
     client = razorpay.Client(auth=(settings.RAZORPAY_KEY, settings.RAZORPAY_SECRET))
     razorpay_order = client.order.create({
                            'amount': int(amount * 100), 
                            'currency': 'INR',
                            'payment_capture': '1'
                        })
     
# front

{% extends "base.html" %}

{% block title %}Checkout{% endblock %}
{% load static %}

{% block extra_styles %}
<!-- Add any additional styles here -->
{% endblock %}

{% block nav_links %}
<!-- Add any additional navigation links here -->
{% endblock %}

{% block content %}
<!--Body Container-->
<div id="page-content">
    <!--Collection Banner-->
    <div class="collection-header">
        <div class="collection-hero">
            <div class="collection-hero__image"></div>
            <div class="collection-hero__title-wrapper container">
                <h1 class="collection-hero__title">Checkout</h1>
                <div class="breadcrumbs text-uppercase mt-1 mt-lg-2"><a href="{% url 'index' %}" title="Back to the home page">Home</a><span>|</span><span class="fw-bold">Checkout </span></div>
            </div>
        </div>
    </div>
    <!--End Collection Banner-->

    {% if messages %}
    {% for message in messages %}
    <div class="alert alert-{{ message.tags }} d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="{{ message.tags|title }}:">
            <use xlink:href="#exclamation-triangle-fill"/>
        </svg>
        <div>
            {{ message }}
        </div>
    </div>
    {% endfor %}
    {% endif %}

    <!--Main Content-->
    <div class="container">
        <form class="checkout-form" method="post" action="{% url 'checkout' %}" >
            {% csrf_token %}
            <input type="hidden" name="action" value="place_order">
            <div class="row">
                <div class="col-md-6 col-lg-4">
                    <div class="card card--grey"></div>
                    <div class="card card--grey mt-2">
                        <div class="card-body">
                            <h2 class="fs-6">BILLING ADDRESS</h2>
                            <div class="customCheckbox clearfix py-2 my-2">
                                <input id="formcheckoutCheckbox2" name="checkbox2" type="checkbox">
                                <label for="formcheckoutCheckbox2">The same as shipping address</label>
                                <a href="{% url 'view_address' %}">Add address/Edit address Click here!</a>
                            </div>

                            {% for address in addresses %}
                            <div class="card card--grey mt-2">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="card-title billing-address">
                                            <input type="radio" name="billing_address" value="{{ address.id }}" id="address{{ address.id }}">
                                            <label for="address{{ address.id }}">Billing Address</label>
                                        </h5>
                                        <p class="card-text">
                                            <strong>{{ address.name }}</strong><br>
                                            {{ address.house_no }},<br>
                                            {{ address.city }}, {{ address.state }},<br>
                                            {{ address.country }}<br>
                                            Pincode: {{ address.pincode }}<br>
                                            Phone: {{ address.phone }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            {% endfor %}
                        </div>
                    </div>
                </div>

                <div class="col-md-6 col-lg-4 mt-2 mt-md-0">
                    <div class="card card--grey"></div>
                    <div class="card card--grey mt-2">
                        <div class="card-body">
                            <h2 class="fs-6">PAYMENT METHOD</h2>
                            <div class="row">
                                <div class="col-6">
                                    <div class="customRadio clearfix">
                                        <input id="formcheckoutRadio4" value="COD" name="payment_method"  type="radio" class="radio" checked="checked">
                                        <label for="formcheckoutRadio4">COD</label>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="customRadio clearfix">
                                        <input id="formcheckoutRadio5" value="Razorpay" name="payment_method" value = 'razorpay' type="radio" class="radio">
                                        <label for="formcheckoutRadio5">Razorpay</label>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="customRadio clearfix">
                                        <input id="formcheckoutRadio6" value="Wallet" name="payment_method" value = 'wallet' type="radio" class="radio">
                                        <label for="formcheckoutRadio6">Wallet</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            
                <div class="col-md-12 col-lg-4 mt-2 mt-lg-0">
                    <h2 class="title fs-6">ORDER SUMMARY</h2>
                    <div class="table-responsive order-table style1">
                        <table class="table table-bordered align-middle table-hover text-center mb-1">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th class="text-start">Name</th>
                                    <th>Price</th>
                                    <th>Qty</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {% for item in cart_items %}
                                <tr>
                                    <td class="thumbImg">
                                        <img class="cart__image" data-src="{{ item.products.images.first.image.url }}" src="{{ item.products.images.first.image.url }}" alt="{{ item.products.name }}" width="80" />
                                    </td>
                                    <td class="text-start">
                                        <a href="">{{ item.products.name }}</a>
                                    </td>
                                    <td>{{ item.products.price }}</td>
                                    <td>{{ item.quantity }}</td>
                                    <td class="fw-500">{{ item.sub_total }}</td>
                                </tr>
                                {% endfor %}
                            </tbody>
                            <tfoot class="font-weight-600">
                                {% if cart.coupon %}
                                <tr>
                                    <td colspan="4" class="text-end fw-bolder">Shipping </td>
                                    <td class="fw-bolder">Free Shipping</td>
                                </tr>
                                
                                <tr>
                                    <td colspan="4" class="text-end fw-bolder">Coupon name :{{cart.coupon.title}}  </td>
                                    <td class="fw-bolder">{{cart.coupon.discount_percentage}} %</td>
                                </tr>
                                <tr>
                                    <td colspan="4" class="text-end fw-bolder">Total</td>
                                    <td class="fw-bolder">{{ cart_total }}</td>
                                </tr>
                                {% else %}
                                <tr>
                                    <td colspan="4" class="text-end fw-bolder">Shipping </td>
                                    <td class="fw-bolder">Free Shipping</td>
                                </tr>
                                
                                
                                <tr>
                                    <td colspan="4" class="text-end fw-bolder">Total</td>
                                    <td class="fw-bolder">{{ cart_total }}</td>
                                </tr>
                                {% endif %}
                            </tfoot>
                        </table>
                    </div>

                    

                   
                    <div class="order-button-payment mt-2 clearfix">
                        <button type="submit" class="cartCheckout fs-6 btn btn-lg rounded w-100 fw-600 text-white" id="place-order-button">Place Order</button>
                    </div>
                    <div class="order-button-payment mt-2 clearfix">
                        <button type="submit" id="pay_now" class="cartCheckout fs-6 btn btn-lg rounded w-100 fw-600 text-white d-none payWithRazorpay">Pay with Razorpay</button>
                    </div>
                </form>
                {% if razorpay_order_id %}
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                <script>
                    document.getElementById('pay_now').onclick = function(e){
                        e.preventDefault();
        
                        var options = {
                            "key": "{{ razorpay_key }}",
                            "amount": "{{ amount }}",
                            "currency": "INR",
                            "name": "{{ user_name }}",
                            "description": "Order #{{ order.id }}",
                            "image": "https://your-logo-url.com/logo.png",
                            "order_id": "{{ razorpay_order_id }}",
                            "handler": function (response){
                                $.ajax({
                                    url: '{% url "payment_success" %}',
                                    method: 'post',
                                    data: {
                                        "csrfmiddlewaretoken": '{{ csrf_token }}',
                                        "razorpay_payment_id": response.razorpay_payment_id,
                                        "razorpay_order_id": response.razorpay_order_id,
                                        "razorpay_signature": response.razorpay_signature,
                                        "order_id": "{{ order.id }}"
                                    },
                                    success: function (data) {
                                        window.location.href = data.redirect_url;
                                    }
                                });
                            },
                            "prefill": {
                                "name": "{{ user_name }}",
                                "email": "{{ user_email }}"
                            },
                            "notes": {
                                "order_id": "{{ order.id }}"
                            },
                            "theme": {
                                "color": "#3399cc"
                            }
                        };
        
                        var rzp1 = new Razorpay(options);
                        rzp1.open();
                    }
                </script>
                {% endif %}
                    <div class="payment-img text-center">
                        <img src="{% static 'assets/images/payment-img.jpg' %}" alt="Payment">
                    </div>


                    <div class="card card--grey mt-2">
                        <div class="card-body">
                            <h2 class="fs-6">Apply Coupon Code</h2>
                            <label class="text-uppercase d-none">Enter Coupon Code:</label>
                            <form method="post" action="{% url 'checkout' %}">
                                {% csrf_token %}
                                <input type="hidden" name="action" value="apply_coupon">
                                <div class="input-group flex-nowrap">
                                    <input class="input-group__field" type="text" placeholder="Coupon code" name="code">
                                    <span class="input-group__btn">
                                        <button type="submit" class="btn rounded-end text-nowrap">Apply</button>
                                    </span>
                                </div>
                            </form>

                            {% if cart.coupon %}
                            <form method="post" action="{% url 'checkout' %}">
                                {% csrf_token %}
                                <input type="hidden" name="action" value="remove_coupon">
                                <input type="hidden" name="remove_code" value="{{ cart.coupon.code }}"> <!-- Hidden field for the coupon code -->
                                <button type="submit" class="btn btn-danger mt-2">Remove Coupon</button>
                            </form>
                        {% endif %}
                        </div>
                    </div>
                </div>
            </div>
       
    </div>
    <!--End Main Content-->
</div>
<!--End Body Container-->
{% endblock %}

{% block scripts %}

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const placeOrderButton = document.getElementById('place-order-button');
        const payNowButton = document.getElementById('pay_now');
        const paymentRadios = document.getElementsByName('payment_method');

        paymentRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'Razorpay') {
                    placeOrderButton.classList.add('d-none');
                    payNowButton.classList.remove('d-none');
                } else {
                    placeOrderButton.classList.remove('d-none');
                    payNowButton.classList.add('d-none');
                }
            });
        });
    });
</script>

{% endblock %}
