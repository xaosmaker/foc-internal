import uuid

from django.db import models


class BaseModel(models.Model):
    pkid = models.BigAutoField(primary_key=True, unique=True, editable=False)
    id = models.UUIDField(default=uuid.uuid4, unique=True, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    edited_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Location(BaseModel):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
