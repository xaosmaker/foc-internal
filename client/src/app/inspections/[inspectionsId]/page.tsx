import FinishJob from "@/components/FinishJob";
import { Button } from "@/components/ui/button";
import { finishInspectionAction } from "@/features/inspections/actions/inspectionsActions";
import { getInspectionById } from "@/features/inspections/fetchers";
import { FileUploadDemo } from "@/features/inspections/FileUploadDemo";
import { APP_STATUS_CODES } from "@/shared/statusCodes";
import { Pencil } from "lucide-react";
import Link from "next/link";
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
      {inspection?.status === APP_STATUS_CODES[10] && (
        <FileUploadDemo inspectionId={inspectionsId} />
      )}
      <div className="grid max-w-4xl grid-cols-2 gap-2">
        {inspection?.images?.map((item) => {
          if (item.data_type === 0) {
            return (
              <div key={item.id} className="relative h-full w-full">
                <img
                  src={item.file_data}
                  className="h-full w-full object-cover"
                  alt="inspection img"
                />
              </div>
            );
          }
          if (item.data_type === 1) {
            return (
              <video controls key={item.id}>
                <source src={item.file_data} type={`video/${item.extension}`} />
              </video>
            );
          }
        })}
      </div>
      {inspection?.status === APP_STATUS_CODES[10] && (
        <div className="flex w-fit items-center justify-between">
          <FinishJob
            name={inspection?.full_name || ""}
            action={async () => {
              "use server";
              return finishInspectionAction(undefined, inspection?.id || -1);
            }}
          />
          <Link href={`/inspections/${inspectionsId}/edit`}>
            <Button className="hover:bg-secondary w-full bg-inherit text-inherit">
              <Pencil />
              Edit
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
