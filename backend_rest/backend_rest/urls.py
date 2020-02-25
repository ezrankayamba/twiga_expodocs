from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('oauth2/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('users/', include('users.urls')),
    path('sales/', include('sales.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
