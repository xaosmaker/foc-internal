"use server";
import { BASE_URL } from "@/lib/baseUrl";
import { InspectionSchema } from "../inspectionSchema";
import { baseDeleteRequest, basePutRequest } from "@/lib/baseRequests";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

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
    console.error(e);
  }

  if (res && res.status === 200) {
    return redirect(`/inspections/${data.id}`);
  }
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
    console.error("delete inspection Error: ", e);
    return;
  }
  redirect("/inspections");
}

export async function createInspectionImagesAction(
  _previousState: undefined,
  dataForm: FormData,
) {
  const session = await auth();
  if (!session) {
    throw new Error("can't upload images no auth user");
  }
  let res;
  try {
    res = await fetch(`${BASE_URL}/api/inspectionsFilesUpload/`, {
      method: "POST",
      headers: {
        cookie: session?.user.access,
      },
      body: dataForm,
    });
  } catch (e) {
    console.error("uploald Image error: ", e);
  }
  if (res?.status === 204) {
    redirect(`/inspections/${dataForm.get("id")}`);
  }
  return undefined;
}
