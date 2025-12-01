import { baseGetRequest } from "@/lib/baseRequests";
import { BASE_URL } from "@/lib/baseUrl";

export async function getInspections() {
  try {
    const res = await baseGetRequest({ url: `${BASE_URL}/api/inspections/` });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("get inspections Error: ", e);
  }
}

export async function getInspectionById(id: string) {
  try {
    const res = await baseGetRequest({
      url: `${BASE_URL}/api/inspections/${id}/`,
    });
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("get inspections Error: ", e);
  }
}
