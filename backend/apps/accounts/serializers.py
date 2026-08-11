from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Profile


class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(
        choices=[
            (Profile.BUYER, "Buyer"),
            (Profile.SELLER, "Seller"),
        ],
        default=Profile.BUYER
    )

    class Meta:
        model = User
        fields = ["username", "email", "password", "role"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        role = validated_data.pop("role", Profile.BUYER)

        user = User.objects.create_user(**validated_data)

        # Profile was automatically created by the post_save signal
        user.profile.role = role
        user.profile.save()

        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = [
            "user",
            "role",
            "phone",
            "address",
            "profile_image",
        ]