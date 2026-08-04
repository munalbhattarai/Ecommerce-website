from rest_framework import serializers
from apps.products.serializers import ProductSerializer
from .models import CartItem, Cart

class AddToCartSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()
    quantity = serializers.IntegerField(min_value= 1)
    
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only = True)
    
    class Meta:
        model = CartItem
        fields = ["id", "product", "quantity"]
        

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ["id", "items", "created_at"]
        
class UpdateCartIemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CartItem
        fields = ["quantity"]
    