"use server";
import { BASE_URL } from "@/lib/baseUrl";
import { InspectionSchema } from "../inspectionSchema";
import { baseDeleteRequest, basePutRequest } from "@/lib/baseRequests";
import { redirect } from "next/navigation";

export async function editInspectionAction(
  _previousState: undefined,
  data: InspectionSchema,
) {
  let res;
  try {
    res = await basePutRequest({
      url: `${BASE_URL}/api/inspections/${data.id}/`,
      data: data,
    });
  } catch (e) {
    console.log(e);
  }

  // if (res && res.status === 201) {
  //   return revalidatePath(`/inspections/${data.id}/edit`);
  // }
  return undefined;
}

export async function deleteInspectionAction(
  _previousState: undefined,
  id: string,
) {
  try {
    await baseDeleteRequest({
      url: `${BASE_URL}/api/inspections/${id}/`,
    });
  } catch (e) {
    console.log("delete inspection Error: ", e);
    return;
  }
  redirect("/inspections");
}
