from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Order(models.Model):
    STATUS_CHOICES = [
        ("PENDING","Pending"),
        ("PROCESSING", "Processing"),
        ("SHIPPED", "Shipped"),
        ("DELIVERED", "Delivered"),
        ("CANELLED", "Cancelled"),
    ]
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="orders"
    )
    shipping_address = models.TextField()
    total_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="PENDING"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"order #{self.id}"