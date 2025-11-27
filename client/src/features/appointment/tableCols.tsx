"use client";
import type { ColumnDef } from "@tanstack/react-table";
import type { Appointment } from "./types";
import StatusCodeColors, { StatusColors } from "@/components/StatusCodeColors";

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
    cell: ({ row, table }) => {
      const code = row.original.status;

      const statusCode = table.options.meta?.statusCodes.find(
        (data) => data.value === code,
      );
      const variant = statusCode!.label.replace(" ", "_") as StatusColors;

      return (
        <StatusCodeColors variant={variant}>
          {statusCode!.label}
        </StatusCodeColors>
      );
    },
  },
  {
    accessorKey: "appointment_date",
    header: "Appointment Date",
    cell: ({ row: { original } }) => {
      const date = new Date(original.appointment_date);
      return date.toLocaleString();
    },
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
