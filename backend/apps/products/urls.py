from django.urls import path
from .views import CategoryListCreateView , ProductListCreateView , ProductRetriveUpdateDestroy

urlpatterns = [
    path('categories/', CategoryListCreateView.as_view(), name = 'category-list'),
  
    path('products/', ProductListCreateView.as_view(), name= "product-list"),
    
    path('products/<int:pk>/', ProductRetriveUpdateDestroy.as_view() , name ="product"),
    
]