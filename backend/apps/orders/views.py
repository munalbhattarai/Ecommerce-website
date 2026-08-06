from django.db import transaction
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics

from .serializers import OrderSerializer
from .models import Order, OrderItem

from .serializers import OrderListSerializer, OrderDetailSerializer, OrderStatusSerializer
from rest_framework.exceptions import ValidationError
from django.shortcuts import get_object_or_404

from apps.accounts.permission import IsSeller
from django.db.models import Sum, Count, DecimalField, F, ExpressionWrapper
from decimal import Decimal
from apps.products.models import Product
from .models import Order, OrderItem


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
            if item.quantity > item.product.quantity:
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
                item.product.quantity -= item.quantity
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
        return (
            Order.objects.filter(user=self.request.user)
            .prefetch_related("items__product")
            .order_by("-created_at")
        )
        
class OrderDetailView(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderDetailSerializer

    def get_queryset(self):
        return Order.objects.filter(
        user=self.request.user
    ).prefetch_related(
        "items__product"
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
                item.product.quantity += item.quantity
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
    permission_classes = [IsAuthenticated, IsSeller]
    
    def get_queryset(self):
        return Order.objects.filter(
            items__product__seller = self.request.user
        ).distinct().order_by("-created_at")
        

class SellerDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsSeller]
    
    def get(self, request):
        seller_product = Product.objects.filter(
            seller= request.user
        )
        total_products = seller_product.count()
        seller_orders = Order.objects.filter(
            items__product__seller= request.user
        ).distinct()
        total_orders = seller_orders.count()
        pending_orders = seller_orders.filter(
            status = Order.PENDING
        ).count()
        revenue = OrderItem.objects.filter(
            product__seller=request.user,
            order__status=Order.DELIVERED
        ).aggregate(
            total=Sum(
                ExpressionWrapper(
                    F("price")* F("quantity"),
                    output_field=DecimalField()
                )
            )
        )["total"] or Decimal("0.00")
        
        return Response({
            "total_products" : total_products,
            "total_orders": total_orders,
            "pending_orders": pending_orders,
            "revenue": revenue,
        })
        
    
class SellerOrderUpdateView(generics.UpdateAPIView):
    serializer_class = OrderStatusSerializer
    permission_classes = [IsAuthenticated, IsSeller]
    
    def get_queryset(self):
        return Order.objects.filter(
            items__product__seller = self.request.user
        ).distinct()
        
    def perform_update(self, serializer):
        order = self.get_object()
        new_status = serializer.validated_data["status"]
        
        allowed = {
            Order.PENDING: Order.PROCESSING,
            Order.PROCESSING :Order.SHIPPED,
            Order.SHIPPED : Order.DELIVERED,
        }
        current_status = order.status
        
        if allowed.get(current_status) != new_status:
            raise ValidationError(
                f"Cannot change order status from {current_status} to {new_status}."
            )

        serializer.save()