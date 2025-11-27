from core_apps.common.models import Location, StatusCodes
from core_apps.common.serializers import LocationSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet


class StatusCodeListView(APIView):
    def get(self, request):
        choices = StatusCodes.choices
        res_choices = [{"value": k, "label": v} for k, v in choices]
        return Response(res_choices)


class LocationView(ModelViewSet):

    queryset = Location.objects.all()
    serializer_class = LocationSerializer
