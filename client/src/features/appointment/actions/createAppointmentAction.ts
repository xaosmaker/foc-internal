"use server";

import { baseApiRequest } from "@/lib/baseRequests";
import { BASE_URL } from "@/lib/baseUrl";
import { AppointmentPost } from "../types";
import { redirect } from "next/navigation";

export async function createAppointmentAction(
  _previousState: undefined,
  formData: AppointmentPost,
) {
  let res;
  try {
    res = await baseApiRequest({
      method: "POST",
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
    await baseApiRequest({
      method: "DELETE",
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
    res = await baseApiRequest({
      method: "PUT",
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
    res = await baseApiRequest({
      method: "PATCH",
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
