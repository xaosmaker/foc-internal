from core_apps.inspection.views import InspectionFilesDataViews, InspectionViews
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("inspections", InspectionViews)
router.register("inspectionsFilesUpload", InspectionFilesDataViews)
urlpatterns = router.urls
