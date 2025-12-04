import os

from core_apps.common.models import StatusCodes
from core_apps.inspection.models import DataType, Inspection, InspectionFilesData
from core_apps.inspection.serializers import (
    InspectionFilesDataSerializer,
    InspectionSerializer,
)
from django.conf import settings
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.forms.forms import datetime
from django.utils import timezone
from rest_framework import status
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet


class InspectionViews(ModelViewSet):
    queryset = Inspection.objects.all()
    serializer_class = InspectionSerializer
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        id = kwargs.get("pk")

        instance = Inspection.objects.get(id=id)
        print(instance, 124)
        instance.status = StatusCodes.INSPECTION_REVIEW
        instance.inspection_finish = timezone.now()
        instance.save()

        return Response(status=status.HTTP_204_NO_CONTENT)


class InspectionFilesDataViews(ModelViewSet):
    queryset = InspectionFilesData.objects.all()
    serializer_class = InspectionFilesDataSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser]

    def create(self, request, *args, **kwargs):
        domain = getattr(settings, "DOMAIN_NAME", None)
        if not domain:
            raise ValueError("Domain name is empty")

        try:
            images = request.FILES.getlist("images")
            id = request.data.get("id")

            addr = f"{domain}/media"
            inspection = Inspection.objects.get(id=id)

            for img in images:
                extension = img.name.split(".")[-1].lower()
                data_type = DataType.FIND

                image_path = os.path.join("images", img.name)
                path = default_storage.save(image_path, ContentFile(img.read()))
                if extension in ["mp4"]:
                    data_type = DataType.VIDEO
                elif extension in ["jpg", "png"]:
                    data_type = DataType.IMAGE
                file_data = os.path.join(addr, path)

                InspectionFilesData.objects.create(
                    extension=extension,
                    data_type=data_type,
                    inspection=inspection,
                    file_data=file_data,
                )
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_204_NO_CONTENT)
