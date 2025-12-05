import { DataTable } from "@/components/data-table";
import { getInspections } from "@/features/inspections/fetchers";
import { inspectionTableColumns } from "@/features/inspections/inpectionTableCols";

export default async function InspectionPage() {
  const inspections = await getInspections();

  return (
    <>
      <h1 className="text-6x text-center uppercase">inspections</h1>
      <DataTable columns={inspectionTableColumns} data={inspections} />
    </>
  );
}
