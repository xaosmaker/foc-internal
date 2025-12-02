from core_apps.inspection.models import Inspection, InspectionFilesData
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer


class InspectionFilesDataSerializer(ModelSerializer):

    class Meta:
        model = InspectionFilesData
        fields = "__all__"


class InspectionSerializer(ModelSerializer):
    images = InspectionFilesDataSerializer(
        many=True, source="inspectionsFilesData_set", read_only=True
    )

    class Meta:
        model = Inspection
        fields = [
            "id",
            "created_at",
            "edited_at",
            "full_name",
            "telephone",
            "address",
            "status",
            "details",
            "inspection_start",
            "inspection_finish",
            "location",
            "user",
            "appointment",
            "verify_by",
            "images",
        ]
        read_only_fields = ["images", "status", "user"]
