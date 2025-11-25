from core_apps.common.models import BaseModel, Location, StatusCodes
from django.contrib.auth import get_user_model
from django.db import models


class Appointment(BaseModel):
    full_name = models.CharField(max_length=255, blank=False, null=False)
    telephone = models.CharField(max_length=20, blank=False, null=False)
    address = models.CharField(max_length=255, blank=False, null=False)
    date_time = models.DateTimeField(blank=False, null=False)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    status = models.IntegerField(choices=StatusCodes)

    def __str__(self):
        return f"{self.full_name} - {self.date_time}"

    class Meta:
        ordering = ["date_time"]
