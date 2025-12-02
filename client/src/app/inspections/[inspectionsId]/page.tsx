import { getInspectionById } from "@/features/inspections/fetchers";
import { FileUploadDemo } from "@/features/inspections/FileUploadDemo";
export default async function InspectonsIdPage({
  params,
}: {
  params: Promise<{ inspectionsId: string }>;
}) {
  const { inspectionsId } = await params;
  const inspection = await getInspectionById(inspectionsId);

  return (
    <div className="mx-auto flex max-w-lg flex-col gap-4">
      <h1 className="mb-10 text-center text-4xl">
        {inspection?.full_name} Inspection
      </h1>
      <div className="flex items-center justify-between">
        <p className="flex gap-4">
          <span> address:</span>
          {inspection?.address}
        </p>
        <p className="flex gap-4">
          <span>location:</span>
          {inspection?.location}
        </p>
      </div>

      <div className="mb-20 flex items-center justify-between">
        <p className="flex gap-4">
          <span> status:</span>
          {inspection?.status}
        </p>
        <p className="flex gap-4">
          <span>telephone:</span>
          {inspection?.telephone}
        </p>
      </div>
      <FileUploadDemo inspectionId={inspectionsId} />
      <div className="grid grid-cols-2">
        {inspection?.images?.map((item) => {
          const url = item.file_data.replace(
            "foc-internal-server:8000",
            "localhost:8080",
          );
          if (item.data_type === 0) {
            return (
              <div key={item.id} className="relative h-full w-full">
                <img src={url} className="h-full w-full object-cover" />
              </div>
            );
          }
          if (item.data_type === 1) {
            return (
              <video controls key={item.id}>
                <source src={url} type={`video/${item.extension}`} />
              </video>
            );
          }
        })}
      </div>
    </div>
  );
}
