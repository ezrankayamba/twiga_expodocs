from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.SaleListView.as_view()),
    path('<int:pk>', views.SaleDetailView.as_view()),
    path('import', views.ImportSalesView.as_view()),
]
