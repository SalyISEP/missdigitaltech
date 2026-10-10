from rest_framework import serializers
from .models import Payment
from reservations.models import Reservation


class PaymentSerializer(serializers.ModelSerializer):
    reservation = serializers.PrimaryKeyRelatedField(
        queryset=Reservation.objects.all(),
        required=True
    )

    class Meta:
        model = Payment
        fields = "__all__"
        read_only_fields = [
            "id", "user", "amount", "status", "created_at"
        ]

    def validate_reservation(self, reservation):
        request = self.context.get("request")

        if request and reservation.user_id != request.user.id:
            raise serializers.ValidationError(
                "Cette réservation ne vous appartient pas."
            )

        if reservation.formation is None:
            raise serializers.ValidationError(
                "Cette réservation n'est liée à aucune formation."
            )

        if reservation.formation.price <= 0:
            raise serializers.ValidationError(
                "Cette formation est gratuite : aucun paiement n'est nécessaire."
            )

        if self.instance is None and Payment.objects.filter(
            reservation=reservation,
            status__in=[Payment.Status.PENDING, Payment.Status.PAID]
        ).exists():
            raise serializers.ValidationError(
                "Une demande de paiement est déjà en cours ou cette réservation est déjà payée."
            )

        return reservation

    def validate_method(self, value):
        if value not in ("wave", "orange_money"):
            raise serializers.ValidationError(
                "Choisissez Wave ou Orange Money."
            )
        return value
