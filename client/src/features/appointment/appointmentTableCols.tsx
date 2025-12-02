"use client";
import type { ColumnDef } from "@tanstack/react-table";
import type { Appointment } from "./types";
import StatusCodeColors, { StatusColors } from "@/components/StatusCodeColors";
import DropDownActions from "@/components/DropDownActions";
import DeleteItem from "@/components/DeleteItem";
import {
  deleteAppointmentAction,
  FinishAppointmentAction,
} from "./actions/createAppointmentAction";
import Link from "next/link";
import { Pencil } from "lucide-react";
import FinishJob from "@/components/FinishJob";

export const appointmentTableColumns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "full_name",
    header: "Full Name",
    cell: ({ row: { original } }) => {
      return (
        <Link href={`/appointment/${original.id}/`}>{original.full_name}</Link>
      );
    },
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

      const statusCode = table.options.meta?.statusCodes?.find(
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
      return original.appointment_date;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row, table }) => {
      const location = table.options.meta?.locations?.find(
        (item) => item.id === row.original.location,
      );
      return location?.name;
    },
  },
  {
    id: "Appointment Actions",
    header: "Action",
    cell: ({ row: { original } }) => {
      if (original.status === 50) {
        return;
      }
      return (
        <DropDownActions
          items={[
            <FinishJob
              key={`finishAppointment${original.id}`}
              name={original.full_name}
              action={() =>
                FinishAppointmentAction(undefined, original.id.toString())
              }
            />,
            <DeleteItem
              key={`deleteAppointment${original.id}`}
              name={original.full_name}
              action={() =>
                deleteAppointmentAction(undefined, original.id.toString())
              }
            />,
            <Link
              key={`editAppointment${original.id}`}
              href={`/appointment/${original.id}/edit`}
              className="flex justify-center gap-2 text-lg"
            >
              <Pencil />
              Edit
            </Link>,
          ]}
        />
      );
    },
  },
];
