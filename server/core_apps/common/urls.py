from core_apps.common.views import LocationView, StatusCodeListView
from django.urls import path
from rest_framework.routers import SimpleRouter

router = SimpleRouter()

router.register("locations", LocationView)

urlpatterns = [
    *router.urls,
    path("StatusCodes", StatusCodeListView.as_view(), name="status_codes"),
]
