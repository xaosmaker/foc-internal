"use server";

import { basePostRequest } from "@/lib/baseRequests";
import { BASE_URL } from "@/lib/baseUrl";
import { AppointmentPost } from "../types";
import { redirect } from "next/navigation";

export async function createAppointmentAction(
  _previousState: undefined,
  formData: AppointmentPost,
) {
  try {
    await basePostRequest<AppointmentPost>({
      url: `${BASE_URL}/api/appointments/`,
      data: formData,
    });

    return redirect("/appointment");
  } catch (e) {
    console.log(e);
  }
}
