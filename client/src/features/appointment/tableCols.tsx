"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Appointment } from "./types";

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
  {
    id: "Appointment Actions",
    header: "Action",
  },
];
