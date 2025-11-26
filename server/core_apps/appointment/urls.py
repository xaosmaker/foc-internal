from core_apps.appointment.views import AppointmentView
from rest_framework.routers import SimpleRouter

router = SimpleRouter()
router.register("appointments", AppointmentView)
urlpatterns = router.urls
