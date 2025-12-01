import { DateISOStr, DateLocalStr } from "@/types/sharedTypes";

type AppointmentBase = {
  pkid: number;
  id: string;
  created_at: Date;
  edited_at: Date;
  full_name: string;
  telephone: string;
  address: string;
  status: number;
  location: number;
  user: number;
};

export interface AppointmentISO extends AppointmentBase {
  appointment_date: DateISOStr;
}

export interface Appointment extends AppointmentBase {
  appointment_date: DateLocalStr;
}

export interface AppointmentPost
  extends Pick<
    AppointmentBase,
    "full_name" | "telephone" | "address" | "location"
  > {
  pkid?: number;
  appointment_date: DateISOStr;
}
