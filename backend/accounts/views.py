from django.contrib.auth import get_user_model
from rest_framework import generics, permissions, viewsets
from .serializers import UserSerializer, RegisterSerializer

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class MeView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all().order_by("-date_joined")
    serializer_class = UserSerializer

    def get_queryset(self):
        if not self.request.user.is_staff and self.request.user.role != "admin":
            return User.objects.filter(id=self.request.user.id)

        return super().get_queryset()
