from core_apps.appointment.models import Appointment
from core_apps.appointment.serializers import AppointmentSerializer
from rest_framework import viewsets


class AppointmentView(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
