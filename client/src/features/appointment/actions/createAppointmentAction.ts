"use server";

import { basePostRequest } from "@/lib/baseRequests";
import { BASE_URL } from "@/lib/baseUrl";

export async function createAppointmentAction(_previousState, formData: any) {
  //WARN: fix the any
  const res = await basePostRequest<any>({
    url: `${BASE_URL}/api/appointments/`,
    data: formData,
  });
  const data = await res.json();

  return data;
}
