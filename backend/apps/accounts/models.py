from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):

    BUYER = "BUYER"
    SELLER = "SELLER"
    ADMIN = "ADMIN"

    ROLE_CHOICES = [
        (BUYER, "Buyer"),
        (SELLER, "Seller"),
        (ADMIN, "Admin"),
    ]

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="profile"
    )

    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default=BUYER
    )

    def __str__(self):
        return f"{self.user.username} - {self.role}"