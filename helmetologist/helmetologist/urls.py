from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('user_account.urls')),
    path('', include('adminside.urls')),
    path('', include('cart.urls')),
    path('', include('products.urls')),
    path('category/', include('category.urls')),
    
    path('auth/', include('social_django.urls',namespace='social')),
   
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
 # Include the user_account app's URLs