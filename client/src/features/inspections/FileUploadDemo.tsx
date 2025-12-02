"use client";
import { Button } from "@/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { createInspectionImagesAction } from "@/features/inspections/actions/inspectionsActions";
import { useActionState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

export function FileUploadDemo({ inspectionId }: { inspectionId: string }) {
  const { control, watch, handleSubmit } = useForm<{
    files: File[];
    id: string;
  }>({
    defaultValues: {
      files: [],
      id: inspectionId,
    },
  });

  const [isPending, startTransition] = useTransition();

  const [_, action] = useActionState(createInspectionImagesAction, undefined);

  function onFileSubmit(data: { files: File[]; id: string }) {
    const formData = new FormData();
    data.files.map((item) => {
      formData.append("images", item);
    });
    formData.append("id", data.id);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div className="mx-auto min-h-96 w-full max-w-4xl rounded-lg border border-dashed border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black">
      <form onSubmit={handleSubmit(onFileSubmit)}>
        <Controller
          control={control}
          name="files"
          render={({ field: { onChange } }) => {
            return <FileUpload onChange={onChange} />;
          }}
        />
        <Button disabled={isPending} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
