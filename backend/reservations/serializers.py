from rest_framework import serializers
from .models import Reservation


class ReservationSerializer(serializers.ModelSerializer):
    formationTitle = serializers.CharField(
        source="formation.title",
        read_only=True
    )

    class Meta:
        model = Reservation
        fields = [
            "id",
            "formation",
            "formationTitle",
            "date",
            "time",
            "notes",
            "status",
            "created_at",
        ]
        read_only_fields = ["id", "status", "created_at"]
