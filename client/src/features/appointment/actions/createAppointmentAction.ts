"use server";

import {
  baseDeleteRequest,
  basePatchRequest,
  basePostRequest,
  basePutRequest,
} from "@/lib/baseRequests";
import { BASE_URL } from "@/lib/baseUrl";
import { AppointmentPost } from "../types";
import { redirect } from "next/navigation";

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
    console.error(e);
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
  } catch (e) {
    console.log("delete appointment: ", e);
    return;
  }
  redirect("/appointment");
}
export async function editAppointmentAction(
  _previousState: undefined,
  data: AppointmentPost,
) {
  let res;
  try {
    res = await basePutRequest({
      url: `${BASE_URL}/api/appointments/${data.id}/`,
      data: data,
    });
  } catch (e) {
    console.error(e);
  }

  if (res && res.status === 200) {
    return redirect(`/appointment/${data.id}`);
  }
}

export async function FinishAppointmentAction(
  _previousState: undefined,
  id: string,
) {
  let res;
  try {
    res = await basePatchRequest({
      url: `${BASE_URL}/api/appointments/${id}/`,
    });
  } catch (e) {
    console.error("finish appointment: ", e);
    return;
  }
  if (res.status === 201) {
    const data = await res.json();
    return redirect(`/inspections/${data.id}/edit`);
  }
  redirect("/appointment");
}
