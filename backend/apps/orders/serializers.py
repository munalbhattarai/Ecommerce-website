from rest_framework import serializers
from .models import Order

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