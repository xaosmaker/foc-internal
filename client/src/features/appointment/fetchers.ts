import { BASE_URL } from "@/lib/baseUrl";
import { Appointment } from "./types";

export async function getAppointments() {
  try {
    const res = await fetch(`${BASE_URL}/api/appointments/`);
    const data: Appointment[] = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    return [];
  }
}
