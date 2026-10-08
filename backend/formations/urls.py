from rest_framework.routers import DefaultRouter
from .views import FormationViewSet

router = DefaultRouter()
router.register("", FormationViewSet, basename="formations")

urlpatterns = router.urls
