import { APP_STATUS_CODES } from "@/shared/statusCodes";
import { Inspection, InspectionISO } from "../types/inpectionsTypes";
import { Location } from "@/types/sharedTypes";

export function inspectionISOToInspection(
  inspectionIso: InspectionISO,
  location: Location[],
): Inspection {
  return {
    ...inspectionIso,
    locationId: inspectionIso.location,
    status: APP_STATUS_CODES[inspectionIso.status],
    location:
      location.find((loc) => loc.id === inspectionIso.location)?.name || "",
  };
}
