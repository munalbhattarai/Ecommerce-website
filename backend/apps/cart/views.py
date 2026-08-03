from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serializers import AddToCartSerializer
from .models import Cart, CartItem
from django.shortcuts import get_object_or_404
from apps.products.models import Product

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