import { StatusCodes } from "@/shared/fetchers";
import type { RowData } from "@tanstack/react-table";
declare module "@tanstack/react-table" {
  export interface TableMeta<TData extends RowData> {
    statusCodes: StatusCodes;
  }
}
