from core_apps.inspection.models import Inspection
from rest_framework.serializers import ModelSerializer


class InspectionSerializer(ModelSerializer):
    class Meta:
        model = Inspection
        fields = "__all__"
