import uuid

from django.db import models


# WARN: on change of status code please update the front End
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

    CANCELLED = (100, "Cancelled")  # red

    INSPECTION_PENDING = (10, "Inspection Pending")  # yellow
    INSPECTION_DONE = (11, "Inspection Done")  # brown
    INSPECTION_REVIEW = (12, "Inspection Review")  # gray

    WORK_SCHEDULED = (20, "Work Scheduled")  # purple
    WORK_PENDING = (21, "Work Pending")  # teal
    IN_PROGRESS = 30, "In Progress"  # orange

    WORK_FINISHED = (40, "Work Finished")  # blue
    COMPLETED = 50, "Completed"  # green

    class Meta:
        abstract = True


class BaseModel(models.Model):
    pkid = models.BigAutoField(primary_key=True, unique=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()

    class Meta:
        abstract = True


class Location(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
