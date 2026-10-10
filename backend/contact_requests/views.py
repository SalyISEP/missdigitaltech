from rest_framework import generics, permissions
from .models import ContactRequest
from .serializers import ContactRequestSerializer

class PublicContactView(generics.CreateAPIView):
    queryset = ContactRequest.objects.all()
    serializer_class = ContactRequestSerializer
    permission_classes = [permissions.AllowAny]
    authentication_classes = []
