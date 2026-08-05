from django.db import transaction
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics

from .serializers import OrderSerializer
from .models import Order, OrderItem

from .serializers import OrderListSerializer, OrderDetailSerializer
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404

class PlaceOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Validate request data
        serializer = OrderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Get the user's cart
        cart = request.user.cart

        # Check if the cart is empty
        if not cart.items.exists():
            return Response(
                {"detail": "Cart is empty."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Check product stock
        for item in cart.items.all():
            if item.quantity > item.product.stock:
                return Response(
                    {
                        "detail": f"Not enough stock for {item.product.name}."
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # Calculate total amount
        total_amount = sum(
            item.product.price * item.quantity
            for item in cart.items.all()
        )

        # Create order and order items atomically
        with transaction.atomic():

            order = Order.objects.create(
                user=request.user,
                shipping_address=serializer.validated_data["shipping_address"],
                total_amount=total_amount,
            )

            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price,
                )

                # Reduce stock
                item.product.stock -= item.quantity
                item.product.save()

            # Clear the cart
            cart.items.all().delete()

        return Response(
            {
                "message": "Order placed successfully.",
                "order_id": order.id,
            },
            status=status.HTTP_201_CREATED,
        )
        

class OrderListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderListSerializer
    
    def get_queryset(self):
        return Order.objects.filter(
            user = self.request.user
        ).order_by("-created_at")
        
class OrderDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderDetailSerializer

    def get_queryset(self):
        return Order.objects.filter(
            user=self.request.user
        )

class CancelOrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request , pk):
        order = get_object_or_404(
            Order,
            id=pk,
            user = request.user
        )
        
        if order.status != Order.PENDING:
            raise ValidationError(
                "only pending order can be cancelled"
            )
            
        with transaction.atomic():
            for item in order.items.all():
                item.product.stock += item.quantity
                item.product.save()
                
            order.status = Order.CANCELLED
            order.save()
            
            return Response(
                {
                    "message": "Order Cancelled Successfully"
                }
            )
            
class SellerOrderListView(generics.ListAPIView):
    serializer_class = OrderListSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(
            items__product__seller = self.request.user
        ).distinct().order_by("-created_at")