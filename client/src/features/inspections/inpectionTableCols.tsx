"use client";
import type { ColumnDef } from "@tanstack/react-table";
import StatusCodeColors, { StatusColors } from "@/components/StatusCodeColors";
import DropDownActions from "@/components/DropDownActions";
import Link from "next/link";
import { CLIENT_URL } from "@/lib/baseUrl";
import { Pencil } from "lucide-react";
import { Inspection } from "./types/inpectionsTypes";

export const inspectionTableColumns: ColumnDef<Inspection>[] = [
  {
    accessorKey: "full_name",
    header: "Full Name",
    cell: ({ row: { original } }) => {
      return (
        <Link href={`/inspections/${original.id}/`}>{original.full_name}</Link>
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
      console.log(original.id);

      return (
        <DropDownActions
          items={[
            <Link
              key={`edit${original.id}`}
              href={`${CLIENT_URL}/inspections/${original.id}/edit`}
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
