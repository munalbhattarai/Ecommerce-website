from rest_framework import serializers
from .models import Order, OrderItem

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["shipping_address"]
        
        
class OrderListSerializer(serializers.ModelSerializer):
    class Meta :
        model = Order
        fields = [
            "id",
            "status",
            "total_amount",
            "created_at",
        ]
        
class OrderItemSerializer(serializers.ModelSerializer):
    product = serializers.StringRelatedField()

    class Meta:
        model = OrderItem
        fields = [
            "product",
            "quantity",
            "price",
        ]

class OrderDetailSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            "id",
            "status",
            "shipping_address",
            "total_amount",
            "created_at",
            "items",
        ]