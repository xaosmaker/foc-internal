import { baseGetRequest } from "@/lib/baseRequests";
import { BASE_URL } from "@/lib/baseUrl";
import { Inspection } from "./types/inpectionsTypes";

export async function getInspections() {
  try {
    const res = await baseGetRequest({ url: `${BASE_URL}/api/inspections/` });
    const data = await res.json();
    return data;
  } catch (e) {
    console.error("get inspections Error: ", e);
  }
}

export async function getInspectionById(id: string) {
  try {
    const res = await baseGetRequest({
      url: `${BASE_URL}/api/inspections/${id}/`,
    });
    const data: Inspection = await res.json();
    return data;
  } catch (e) {
    console.error("get inspections Error: ", e);
    return undefined;
  }
}
