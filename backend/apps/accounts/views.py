from rest_framework import generics
from .serializers import RegisterSerializer , ProfileSerializer
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return self.request.user
