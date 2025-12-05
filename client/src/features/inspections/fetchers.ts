import { BASE_URL } from "@/lib/baseUrl";
import { Inspection, InspectionISO } from "./types/inpectionsTypes";
import { inspectionISOToInspection } from "./utils/inspectionISOToInspection";
import { getLocations } from "@/shared/fetchers";
import { baseApiRequest } from "@/lib/baseRequests";

export async function getInspections() {
  const res = await baseApiRequest({ url: `${BASE_URL}/api/inspections/` });

  const location = await getLocations();
  if (!res.ok) {
    return [];
  }
  const data: InspectionISO[] = await res.json();
  const insp: Inspection[] = data.map((item) =>
    inspectionISOToInspection(item, location),
  );
  return insp;
}

export async function getInspectionById(id: string) {
  const location = await getLocations();
  const res = await baseApiRequest({
    url: `${BASE_URL}/api/inspections/${id}/`,
  });
  if (!res.ok) {
    throw new Error("try again pls");
  }
  const data: InspectionISO = await res.json();
  return inspectionISOToInspection(data, location);
}
