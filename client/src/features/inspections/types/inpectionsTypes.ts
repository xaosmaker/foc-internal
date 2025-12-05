import { DateISOStr, DateLocalStr } from "@/types/sharedTypes";

interface InspectionBase {
  id: number;
  created_at: Date;
  edited_at: Date;
  full_name: string;
  telephone: string;
  address: string;
  status: number;
  location: number;
  user: number;
  details: string | undefined;
  appointment: number;
  verify_by: number;
  images?: InspectionImages[];
}

export interface InspectionISO extends InspectionBase {
  inspection_start: DateISOStr;
  inspection_finish: DateISOStr;
}

export interface Inspection
  extends Omit<InspectionBase, "status" | "location"> {
  inspection_start: DateLocalStr;
  inspection_finish: DateLocalStr;
  status: string;
  location: string;
  locationId: number;
}

export interface InspectionImages {
  id: number;
  created_at: DateISOStr;
  edited_at: DateISOStr;
  data_type: number;
  extension: string;
  file_data: string;
  inspection: number;
}
