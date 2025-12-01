import { getInspectionById } from "@/features/inspections/fetchers";
import EditInspectionForm from "@/features/inspections/forms/EditInspectionForm";
import { getLocations } from "@/shared/fetchers";

export default async function EditInspectionsPage({
  params,
}: {
  params: Promise<{ inspectionsId: string }>;
}) {
  const { inspectionsId } = await params;
  const inspection = await getInspectionById(inspectionsId);
  const location = await getLocations();

  return <EditInspectionForm location={location} editData={inspection} />;
}
