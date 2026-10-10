from django.db import models

class ContactRequest(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Demande de contact"
        verbose_name_plural = "Demandes de contact"

    def __str__(self):
        return f"{self.subject} — {self.name}"
