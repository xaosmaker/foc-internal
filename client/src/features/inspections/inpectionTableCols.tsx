"use client";
import type { ColumnDef } from "@tanstack/react-table";
import StatusCodeColors, { StatusColors } from "@/components/StatusCodeColors";
import DropDownActions from "@/components/DropDownActions";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { Inspection } from "./types/inpectionsTypes";
import { APP_STATUS_CODES } from "@/shared/statusCodes";

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
    cell: ({ row }) => {
      const code = row.original.status;

      const variant = code.replace(" ", "_") as StatusColors;

      return <StatusCodeColors variant={variant}>{code}</StatusCodeColors>;
    },
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    id: "Appointment Actions",
    header: "Action",
    cell: ({ row: { original } }) => {
      if (original.status === APP_STATUS_CODES[12]) {
        return;
      }
      return (
        <DropDownActions
          items={[
            <Link
              key={`edit${original.id}`}
              href={`/inspections/${original.id}/edit`}
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
