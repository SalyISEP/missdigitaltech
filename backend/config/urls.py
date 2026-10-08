from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),

    path(
        "api/auth/login/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair"
    ),

    path(
        "api/auth/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh"
    ),

    path(
        "api/",
        include("accounts.urls")
    ),

    path(
        "api/formations/",
        include("formations.urls")
    ),

    path(
        "api/reservations/",
        include("reservations.urls")
    ),

    path(
        "api/payments/",
        include("payments.urls")
    ),

    path(
        "api/messages/",
        include("messages_app.urls")
    ),
]
