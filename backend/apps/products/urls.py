from django.urls import path
from .views import CategoryListCreateView , ProductListCreateView , ProductRetrieveUpdateDestroyView, SellerProductListView

urlpatterns = [
    path('categories/', CategoryListCreateView.as_view(), name = 'category-list'),
  
    path('products/', ProductListCreateView.as_view(), name= "product-list"),
    
    path('products/<int:pk>/', ProductRetrieveUpdateDestroyView.as_view() , name ="product"),
    path('seller/',SellerProductListView.as_view(), name="seller-products" )
    
]