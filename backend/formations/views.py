from rest_framework import viewsets
from .models import Formation
from .serializers import FormationSerializer


class FormationViewSet(viewsets.ModelViewSet):
    queryset = Formation.objects.all()
    serializer_class = FormationSerializer
