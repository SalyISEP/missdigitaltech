from django.conf import settings
from django.db import models
from formations.models import Formation


class Reservation(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "En attente"
        CONFIRMED = "confirmed", "Confirmée"
        CANCELLED = "cancelled", "Annulée"
        COMPLETED = "completed", "Terminée"

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="reservations"
    )
    formation = models.ForeignKey(
        Formation,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    date = models.DateField()
    time = models.TimeField(null=True, blank=True)
    notes = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.email} - {self.date}"
