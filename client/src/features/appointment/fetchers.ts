import { BASE_URL } from "@/lib/baseUrl";
import { Appointment, AppointmentISO } from "./types";
import { baseGetRequest } from "@/lib/baseRequests";

export async function getAppointments() {
  try {
    const res = await baseGetRequest({ url: `${BASE_URL}/api/appointments/` });
    const data: AppointmentISO[] = await res.json();
    const localTimeData: Appointment[] = data.map((item) => {
      item.appointment_date = new Date(item.appointment_date).toLocaleString();
      return item;
    });
    return localTimeData;
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function getAppointmentById(id: string) {
  try {
    const res = await baseGetRequest({
      url: `${BASE_URL}/api/appointments/${id}/`,
    });
    const data: AppointmentISO = await res.json();
    const localTimeData: Appointment = data;
    localTimeData.appointment_date = new Date(
      data.appointment_date,
    ).toLocaleString();
    return localTimeData;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}
