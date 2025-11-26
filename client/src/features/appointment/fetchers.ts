import { BASE_URL } from "@/lib/baseUrl";

export async function getAppointments() {
  try {
    const res = await fetch(
      `http://foc-internal-server:8000/api/appointments/`,
    );
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);

    if (e instanceof Error) console.log("error", e.message, e.name, e.cause);
  }
}
