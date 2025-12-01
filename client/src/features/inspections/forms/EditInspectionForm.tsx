"use client";

import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import FormField from "@/components/FormField";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Location } from "@/types/sharedTypes";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { useActionState, useTransition } from "react";
import { inspectionSchema, InspectionSchema } from "../inspectionSchema";
import { editInspectionAction } from "../actions/inspectionsActions";

export default function EditInspectionForm({
  location,
  editData,
}: {
  location: Location[];
  editData: InspectionSchema;
}) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InspectionSchema>({
    defaultValues: {
      id: editData.id,
      address: editData.address,
      telephone: editData.telephone,
      full_name: editData.full_name,
      location: editData.location,
    },
    resolver: zodResolver(inspectionSchema),
    mode: "onChange",
  });

  const [isPending, startTransition] = useTransition();
  const [_, action] = useActionState(editInspectionAction, undefined);

  const onSubmit = (data: InspectionSchema) => {
    startTransition(() => {
      action(data);
    });
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Edit Inspection &apos;{editData?.full_name}&apos;</CardTitle>
        <CardDescription>
          Edit an inspection <br /> The fields with (*) are required
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <FormField
            id="full_name"
            label="Full Name *"
            type="text"
            placeholder="John Doe"
            register={register("full_name")}
            error={errors.full_name?.message}
          />
          <FormField
            id="telephone"
            label="Telephone *"
            type="text"
            placeholder="0123456789"
            register={register("telephone")}
            error={errors.telephone?.message}
          />

          <FormField
            id="address"
            label="Address *"
            type="text"
            placeholder="St. Peters 17"
            register={register("address")}
            error={errors.address?.message}
          />

          <Controller
            control={control}
            name="location"
            render={({ field: { onChange, value } }) => {
              return (
                <Select
                  defaultValue={value.toString()}
                  onValueChange={(val) => onChange(Number(val))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select A location" />
                  </SelectTrigger>
                  <SelectContent>
                    {location.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />

          <Button disabled={isPending} type="submit" className="mt-4 w-full">
            Continue
          </Button>

          {/* INFO: here is the code for the summary error later will be api errors */}

          {/* {Object.keys(errors).length > 0 && ( */}
          {/*   <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-700"> */}
          {/*     <p className="mb-1 font-semibold"> */}
          {/*       Please fix the following errors: */}
          {/*     </p> */}
          {/*     <ul className="ml-4 list-disc"> */}
          {/*       {Object.entries(errors).map(([key, value]) => ( */}
          {/*         <li key={key}>{value?.message}</li> */}
          {/*       ))} */}
          {/*     </ul> */}
          {/*   </div> */}
          {/* )} */}
        </form>
      </CardContent>
    </Card>
  );
}
