from core_apps.common.models import BaseModel, Location
from django.contrib.auth import get_user_model
from django.db import models

from server.core_apps.common.utils import same


class Appointment(BaseModel):
    full_name = models.CharField(max_length=255, blank=False, null=False)
    telephone = models.CharField(max_length=20, blank=False, null=False)
    address = models.CharField(max_length=255, blank=False, null=False)
    date_time = models.DateTimeField(blank=False, null=False)
    location = models.ForeignKey(Location, on_delete=models.CASCADE)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.full_name} - {self.date_time}"


class StatusCodes(models.IntegerChoices):
    """
    CANCELED = the work is cancelled
    IN_PROGRESS = the work is currently being done and the worker is on site
                the data of the job cant be changed anymore when in this stage.

    INSPECTION_PENDING =  the appointment is done, and the dates are valid and waiting the
                          technician to do the inspection

    INSPECTION_DONE =  the inspection is done by the technician, waiting for review

    INSPECTION_REVIEW = admin reviewing the inspection result
                        and deciding the next steps

    WORK_SCHEDULED = created Job from the inspection review
                    then the admin has to create a work schedule.

    WORK_PENDING =  admin has scheduled the work and assigned to a worker.

    WORK_FINISHED = the technician has finished the work on site and take the
                    necessary notes and photos.

    COMPLETED = admin has reviewed the finished work and closed the job.

    """

    # INFO: color code statuses for UI

    CANCELLED = (0, "Cancelled")  # red

    INSPECTION_PENDING = (10, "Inspection Pending")  # yellow
    INSPECTION_DONE = (11, "Inspection Done")  # brown
    INSPECTION_REVIEW = (12, "Inspection Review")  # gray

    WORK_SCHEDULED = (20, "Work Scheduled")  # purple
    WORK_PENDING = (21, "Work Pending")  # teal
    IN_PROGRESS = 30, "In Progress"  # orange

    WORK_FINISHED = (40, "Work Finished")  # blue
    COMPLETED = 50, "Completed"  # green
