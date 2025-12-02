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

export interface InspectionGet extends InspectionBase {
  inspection_start: DateISOStr;
  inspection_finish: DateISOStr;
}

export interface Inspection extends InspectionBase {
  inspection_start: DateLocalStr;
  inspection_finish: DateLocalStr;
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
