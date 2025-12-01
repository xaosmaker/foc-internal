"use client";

import { formatISO } from "date-fns";
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
import { AppointmentSchema, appointmentSchema } from "./AppointmentSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Location } from "@/types/sharedTypes";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { z } from "zod/v4";
import { useActionState, useTransition } from "react";
import {
  createAppointmentAction,
  editAppointmentAction,
} from "./actions/createAppointmentAction";
import { Appointment, AppointmentPost } from "./types";

export default function CreateAppointmentForm({
  location,
  editData,
}: {
  location: Location[];
  editData?: Appointment;
}) {
  let time;
  if (editData) {
    time = formatISO(new Date(editData?.appointment_date));
  }
  console.log(time);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AppointmentSchema>({
    defaultValues: {
      location: editData?.location || 1,
      time: time?.slice(11, 16) || "00:00",
      date: time?.slice(0, 10) || new Date().toISOString().slice(0, 10),
      address: editData?.address || "",
      telephone: editData?.telephone || "",
      full_name: editData?.full_name || "",
    },
    resolver: zodResolver(appointmentSchema),
    mode: "onChange",
  });
  const [_, action] = useActionState(
    editData ? editAppointmentAction : createAppointmentAction,
    undefined,
  );
  const [isPending, startTransition] = useTransition();

  const onSubmit = (data: AppointmentSchema) => {
    //INFO: need to move the logic elsewhare for the mobile app
    const date = new Date(data.date);
    const [hours, mins] = data.time.split(":");
    date.setUTCHours(Number(hours) || 0, Number(mins) || 0);

    const appointment_date = date.toISOString();
    const { success } = z.iso.datetime().safeParse(appointment_date);
    if (!success) {
      throw new Error("Invalid datetime iso String");
    }

    const appointmentData: AppointmentPost = {
      location: data.location,
      full_name: data.full_name,
      telephone: data.telephone,
      address: data.address,

      appointment_date: appointment_date,
    };
    if (editData) {
      appointmentData.id = editData.id;
    }
    startTransition(() => {
      action(appointmentData);
    });
  };

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>
          {editData ? "Edit" : "Create"} Appointment{"  "}
          {editData && `'${editData?.full_name}'`}
        </CardTitle>
        <CardDescription>
          {editData ? "Edit" : "Create"} an appointment for inspection <br />{" "}
          The fields with (*) are required
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
            name="date"
            render={({ field: { onChange, value } }) => {
              return (
                <FormField
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  type="date"
                  id="appointment_date"
                  label="Appointment Date"
                  error={errors.date?.message}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="time"
            render={({ field: { onChange, value } }) => {
              return (
                <FormField
                  value={value}
                  onChange={(e) => onChange(e.target.value)}
                  type="text"
                  id="appointment_time"
                  label="Appointment Time"
                  error={errors.time?.message}
                />
              );
            }}
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
            {editData ? "Edit" : "Create"} Appointment
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
