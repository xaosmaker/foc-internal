from core_apps.appointment.models import Appointment
from core_apps.common.models import BaseAppointmentInspectionModel, BaseModel
from django.contrib.auth import get_user_model
from django.db import models


class DataType(models.IntegerChoices):
    IMAGE = (0, "Images")
    VIDEO = (1, "Video")
    TEXT = (3, "Text")
    FIND = (4, "Find")

    class Meta:
        abstract = True


class Inspection(BaseAppointmentInspectionModel):
    appointment = models.OneToOneField(Appointment, on_delete=models.CASCADE, null=True)

    verify_by = models.ForeignKey(
        get_user_model(),
        on_delete=models.DO_NOTHING,
        blank=True,
        null=True,
        related_name="verify_by",
    )
    details = models.TextField(blank=True, null=True)
    inspection_start = models.DateTimeField(blank=False, null=False, auto_now_add=True)
    inspection_finish = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.full_name} {self.address}"


class InspectionFilesData(BaseModel):
    data_type = models.IntegerField(choices=DataType)
    extension = models.CharField()
    file_data = models.CharField()
    inspection = models.ForeignKey(
        Inspection, on_delete=models.CASCADE, related_name="inspectionsFilesData_set"
    )

    def __str__(self):
        return f"{self.file_data}, {self.data_type}, {self.inspection.full_name}"
