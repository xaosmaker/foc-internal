import { Appointment } from "./types";

export async function getAppointments() {
  try {
    const res = await fetch(
      `http://foc-internal-server:8000/api/appointments/`,
    );
    const data: Appointment[] = await res.json();
    return data;
  } catch (e) {
    console.log(e);
  }
}
