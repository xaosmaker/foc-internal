from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class InspectionConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "core_apps.inspection"
    verbose_name = _("Inspection")
