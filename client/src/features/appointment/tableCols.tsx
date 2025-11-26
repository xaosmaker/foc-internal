"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
/*
  "pkid": 1,
  "id": "0373d83e-396d-4006-a8e0-5ffaa4a0a91d",
  "created_at": "2025-11-22T08:25:03.208002Z",
  "edited_at": "2025-11-25T08:40:57.359843Z",
  "full_name": "Dhmhtrhs Prasinakis",
  "telephone": "1234568907",
  "address": "some address",
  "date_time": "2025-11-22T08:24:50Z",
  "status": 12,
  "location": 1,
  "user": 1
*/
export type Appointment = {
  pkid: string;
  id: string;
  created_at: Date;
  edited_at: Date;
  full_name: string;
  telephone: string;
  address: string;
  appointment_date: Date;
  status: number;
  location: number;
  user: number;
};

export const appointmentTableColumns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "telephone",
    header: "Phone Number",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "appointment_date",
    header: "Appointment Date",
  },
  {
    accessorKey: "location",
    header: "Location",
  },
];
