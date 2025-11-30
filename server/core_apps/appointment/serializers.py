from django.contrib.auth import get_user, get_user_model
from rest_framework import serializers

from .models import Appointment


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"
        read_only_fields = ["user"]

    def create(self, validated_data):
        # WARN: when i fix the auth i have to set the user to the user that validtates
        # the request
        user = self.context["request"].user

        appointment = Appointment.objects.create(**validated_data, user=user)

        return appointment
