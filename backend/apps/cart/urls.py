from django.urls import path

from .views import (
    AddToCartView,
    CartView,
    UpdateCartItemView,
    DeleteCartItemView,
)


urlpatterns = [
    path("add/", AddToCartView.as_view(), name="add-to-cart"),
    path("", CartView.as_view(), name="cart"),

    path(
        "items/<int:pk>/",
        UpdateCartItemView.as_view(),
        name="update-cart-item",
    ),

    path(
        "items/<int:pk>/delete/",
        DeleteCartItemView.as_view(),
        name="delete-cart-item",
    ),
]