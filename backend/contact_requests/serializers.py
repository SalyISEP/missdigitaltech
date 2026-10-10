from rest_framework import serializers
from .models import ContactRequest

class ContactRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactRequest
        fields = ("id", "name", "email", "subject", "message", "created_at")
        read_only_fields = ("id", "created_at")

    def validate_name(self, value):
        value = value.strip()
        if len(value) < 2:
            raise serializers.ValidationError("Veuillez saisir votre nom complet.")
        return value

    def validate_subject(self, value):
        value = value.strip()
        if len(value) < 3:
            raise serializers.ValidationError("Le sujet doit contenir au moins 3 caractères.")
        return value

    def validate_message(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError("Votre message doit contenir au moins 10 caractères.")
        return value
