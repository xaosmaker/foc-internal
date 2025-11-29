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

export default function CreateAppointmentForm({
  location,
}: {
  location: Location[];
}) {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<AppointmentSchema>({
    defaultValues: {
      location: 1,
      status: 10,
    },
    resolver: zodResolver(appointmentSchema),
    mode: "onChange",
  });

  const onSubmit = (data: AppointmentSchema) => {
    console.log(data);
  };

  console.log(watch("appointment_date"));

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create Appointment</CardTitle>
        <CardDescription>
          Create an appointment for inspection <br /> The fields with (*) are
          required
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

          <FormField
            id="appointment_date"
            label="Appointment Date *"
            type="date"
            register={register("appointment_date")}
            error={errors.appointment_date?.message}
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
                      <SelectItem key={item.pkid} value={item.pkid.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              );
            }}
          />

          <Button type="submit" className="mt-4 w-full">
            Create Appointment
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

// "use client";
//
// import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import type { StatusCodes } from "@/shared/fetchers";
// import { AppointmentSchema } from "./AppointmentSchema";
// export default function CreateAppointmentForm({}: {
//   statusCodes: StatusCodes;
// }) {
//   const { register } = useForm<AppointmentSchema>();
//   return (
//     <Card className="mx-auto w-full max-w-sm">
//       <CardHeader>
//         <CardTitle>Create Appointment</CardTitle>
//         <CardDescription>
//           Create an appointment for inspection <br /> The fields with (*) is
//           required
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form>
//           <div className="flex flex-col gap-6">
//             <div className="grid gap-2">
//               <Label htmlFor="full_name">Full Name</Label>
//               <Input
//                 id="full_name"
//                 type="text"
//                 placeholder="John Doe"
//                 required
//                 {...register("full_name")}
//               />
//             </div>
//
//             <div className="grid gap-2">
//               <Label htmlFor="appointment_date">Appointment Date</Label>
//               <Input
//                 id="appointment_date"
//                 type="dateime-local"
//                 required
//                 {...register("appointment_date")}
//               />
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="address">Adress</Label>
//               <Input
//                 id="address"
//                 type="text"
//                 placeholder="St. Peters 17"
//                 required
//                 {...register("address")}
//               />
//             </div>
//           </div>
//         </form>
//       </CardContent>
//       <CardFooter className="flex-col gap-2">
//         <Button type="submit" className="w-full">
//           Login
//         </Button>
//         <Button variant="outline" className="w-full">
//           Login with Google
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
