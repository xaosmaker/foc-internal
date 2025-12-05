import { Location } from "@/types/sharedTypes";
import { Appointment, AppointmentISO } from "../types";
import { APP_STATUS_CODES } from "@/shared/statusCodes";

export function appointmentISOToAppointment(
  appointmentIso: AppointmentISO,
  location: Location[],
) {
  const appointment: Appointment = {
    ...appointmentIso,
    appointment_date: new Date(
      appointmentIso.appointment_date,
    ).toLocaleString(),
    status: APP_STATUS_CODES[appointmentIso.status] || "",
    locationId: appointmentIso.location,
    location:
      location.find((loc) => loc.id === appointmentIso.location)?.name || "",
  };
  return appointment;
}
