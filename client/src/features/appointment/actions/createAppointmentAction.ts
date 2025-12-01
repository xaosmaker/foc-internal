"use server";

import {
  baseDeleteRequest,
  basePostRequest,
  basePutRequest,
} from "@/lib/baseRequests";
import { BASE_URL } from "@/lib/baseUrl";
import { AppointmentPost } from "../types";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createAppointmentAction(
  _previousState: undefined,
  formData: AppointmentPost,
) {
  let res;
  try {
    res = await basePostRequest({
      url: `${BASE_URL}/api/appointments/`,
      data: formData,
    });
  } catch (e) {
    console.log(e);
  }

  if (res && res.status === 201) {
    return redirect("/appointment");
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
export async function editAppointmentAction(
  _previousState: undefined,
  data: AppointmentPost,
) {
  let res;
  try {
    res = await basePutRequest({
      url: `${BASE_URL}/api/appointments/${data.pkid}/`,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }

  if (res && res.status === 201) {
    return revalidatePath(`/appointment/${data.pkid}/edit`);
  }
}
