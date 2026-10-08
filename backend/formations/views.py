from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAdminUser

from .models import Formation
from .serializers import FormationSerializer


class FormationViewSet(viewsets.ModelViewSet):
    queryset = Formation.objects.all()
    serializer_class = FormationSerializer

    def get_permissions(self):
        if self.request.method in ["GET", "HEAD", "OPTIONS"]:
            return [AllowAny()]
        return [IsAdminUser()]
