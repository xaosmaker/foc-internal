from core_apps.inspection.views import InspectionViews
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("inspections", InspectionViews)
urlpatterns = router.urls
