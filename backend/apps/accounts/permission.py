from rest_framework.permissions import BasePermission

class IsSeller(BasePermission):
    message = "Only seller can perform this action"
    
    def has_permission(self, request, view):
        return (
            request.user.is_autheenticated and 
            request.user.profile.role == "SELLER"
        )