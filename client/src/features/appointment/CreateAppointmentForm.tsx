"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { StatusCodes } from "@/shared/fetchers";
import { AppointmentSchema } from "./AppointmentSchema";
export default function CreateAppointmentForm({}: {
  statusCodes: StatusCodes;
}) {
  const { register } = useForm<AppointmentSchema>();
  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create Appointment</CardTitle>
        <CardDescription>
          Create an appointment for inspection <br /> The fields with (*) is
          required
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="full_name">Full Name</Label>
              <Input
                id="full_name"
                type="text"
                placeholder="John Doe"
                required
                {...register("full_name")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="appointment_date">Appointment Date</Label>
              <Input
                id="appointment_date"
                type="dateime-local"
                required
                {...register("appointment_date")}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Adress</Label>
              <Input
                id="address"
                type="text"
                placeholder="St. Peters 17"
                required
                {...register("address")}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
          Login
        </Button>
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>
      </CardFooter>
    </Card>
  );
}
