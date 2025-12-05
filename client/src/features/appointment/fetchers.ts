import { BASE_URL } from "@/lib/baseUrl";
import { Appointment, AppointmentISO } from "./types";
import { baseApiRequest } from "@/lib/baseRequests";
import { getLocations } from "@/shared/fetchers";
import { appointmentISOToAppointment } from "@/features/appointment/utils/appointmentIsoToAppointment";

export async function getAppointments() {
  const location = (await getLocations()) || [];

  const res = await baseApiRequest({ url: `${BASE_URL}/api/appointments/` });
  if (!res?.ok) {
    return [];
  }

  const data: AppointmentISO[] = await res.json();
  const localTimeData: Appointment[] = data.map((appointment) => {
    return appointmentISOToAppointment(appointment, location);
  });
  return localTimeData;
}

export async function getAppointmentById(id: string) {
  const location = (await getLocations()) || [];

  const res = await baseApiRequest({
    url: `${BASE_URL}/api/appointments/${id}/`,
  });

  if (!res.ok) {
    console.log(res, "error get appointment by id");
    throw new Error("");
  }

  const data: AppointmentISO = await res.json();
  return appointmentISOToAppointment(data, location);
}
