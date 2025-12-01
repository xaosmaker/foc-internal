from core_apps.common.models import BaseAppointmentInspectionModel
from django.db import models


class Appointment(BaseAppointmentInspectionModel):

    appointment_date = models.DateTimeField(blank=False, null=False)
    objects = models.Manager()

    def __str__(self):
        return f"{self.full_name} - {self.appointment_date}"

    class Meta:
        ordering = ["appointment_date__date", "status", "appointment_date__time"]
