from core_apps.appointment.models import Appointment
from core_apps.appointment.serializers import AppointmentSerializer
from core_apps.common.models import StatusCodes
from core_apps.inspection.models import Inspection
from core_apps.inspection.serializers import InspectionSerializer
from rest_framework import status, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class AppointmentView(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        try:
            newDict = {}
            pk = kwargs.get("pk")
            ap_in = Appointment.objects.get(pk=pk)
            newDict["full_name"] = getattr(ap_in, "full_name")
            newDict["telephone"] = getattr(ap_in, "telephone")
            newDict["address"] = getattr(ap_in, "address")
            newDict["location"] = getattr(ap_in, "location")

            user = self.request.user

            inspection = Inspection.objects.create(
                **newDict,
                user=user,
                status=StatusCodes.INSPECTION_PENDING,
                appointment=ap_in,
            )
            ap_in.status = StatusCodes.COMPLETED
            ap_in.save()
            s_inspection = InspectionSerializer(inspection).data

        except Exception as e:
            print(e)
            return Response(
                {"message": "Try again later"}, status=status.HTTP_400_BAD_REQUEST
            )

        return Response(s_inspection, status=status.HTTP_201_CREATED)
