from django.urls import path
from .views import PublicContactView

urlpatterns = [
    path("", PublicContactView.as_view(), name="public-contact"),
]
