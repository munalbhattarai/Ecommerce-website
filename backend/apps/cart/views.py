from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import AddToCartSerializer, CartSerializer
from .models import Cart, CartItem
from django.shortcuts import get_object_or_404
from apps.products.models import Product
from rest_framework import generics
from .serializers import UpdateCartIemSerializer
# Create your views here.

class AddToCartView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = AddToCartSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        
        product_id = serializer.validated_data["product_id"]
        quantity = serializer.validated_data["quantity"]
        
        product = get_object_or_404(Product,id=product_id)
        cart, created = Cart.objects.get_or_create(user=request.user)
        cart_item, created = CartItem.objects.get_or_create(
            cart=cart,
            product=product,
            defaults={"quantity": quantity}
        )
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
            
        return Response({
                "message": "Product added to cart."},
                status=status.HTTP_200_OK)
        
class CartView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        cart,created = Cart.objects.get_or_create(user= request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    
class UpdateCartItemView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateCartIemSerializer
    
    def get_queryset(self):
        return CartItem.objects.filter(
            cart__user= self.request.user
        )
        
class DeleteCartItemView(generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return CartItem.objects.filter(
            cart__user= self.request.user
        )