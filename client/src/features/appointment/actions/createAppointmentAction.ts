"use server";

import { baseDeleteRequest, basePostRequest } from "@/lib/baseRequests";
import { BASE_URL } from "@/lib/baseUrl";
import { AppointmentPost } from "../types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

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

export async function deleteAppointmentAction(
  _previousState: undefined,
  id: string,
) {
  try {
    await baseDeleteRequest({
      url: `${BASE_URL}/api/appointments/${id}/`,
    });

    revalidatePath("/appointment");
  } catch (e) {
    console.log("delete appointment: ", e);
  }
}
