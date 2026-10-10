from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Payment
from .serializers import PaymentSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if getattr(user, "role", None) == "admin":
            return Payment.objects.all().order_by("-created_at")
        return Payment.objects.filter(user=user).order_by("-created_at")

    def perform_create(self, serializer):
        reservation = serializer.validated_data["reservation"]
        # Le prix vient du serveur, jamais du montant envoyé par Angular.
        serializer.save(
            user=self.request.user,
            amount=reservation.formation.price,
            status=Payment.Status.PENDING,
        )
