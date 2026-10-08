from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import RegisterView, MeView, UserViewSet

router = DefaultRouter()
router.register("users", UserViewSet, basename="users")

urlpatterns = [
    path("auth/register/", RegisterView.as_view()),
    path("users/me/", MeView.as_view()),
]

urlpatterns += router.urls
