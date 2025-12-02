import DeleteItem from "@/components/DeleteItem";
import FinishJob from "@/components/FinishJob";
import StatusCodeColors, { StatusColors } from "@/components/StatusCodeColors";
import { Button } from "@/components/ui/button";
import {
  deleteAppointmentAction,
  FinishAppointmentAction,
} from "@/features/appointment/actions/createAppointmentAction";
import { getAppointmentById } from "@/features/appointment/fetchers";
import { getStatusCodes } from "@/shared/fetchers";
import { Pencil } from "lucide-react";
import Link from "next/link";
//TODO: need refactor all the logic here and the StatusCode need the most Refactor
export default async function AppointmentIdPage({
  params,
}: {
  params: Promise<{ appointmentId: string }>;
}) {
  const { appointmentId } = await params;
  const appointment = await getAppointmentById(appointmentId);
  const statusCodes = await getStatusCodes();

  if (!appointment) {
    return <div>Try Again Later</div>;
  }
  const statusCode = statusCodes.find(
    (item) => item.value === appointment.status,
  )?.label;
  if (!statusCode) {
    return <div>Try Again Later</div>;
  }
  return (
    <div>
      <h1 className="text-center text-4xl">Appointment Details</h1>
      <div className="mx-auto mt-10 flex max-w-xl flex-col gap-10">
        <div className="flex justify-between">
          <p>{appointment.full_name}</p>
          <StatusCodeColors
            variant={statusCode.replace(" ", "_") as StatusColors}
          >
            {statusCode}
          </StatusCodeColors>
        </div>
        <div className="flex justify-between">
          <p>{appointment.appointment_date}</p>
          <p>{appointment.address}</p>
        </div>
        <div className="flex justify-between">
          <p>{appointment.telephone}</p>
          <p>{appointment.location}</p>
        </div>

        {appointment.status === 10 && (
          <div className="flex w-fit items-center justify-between">
            <FinishJob
              name={appointment.full_name}
              action={async () => {
                "use server";
                return FinishAppointmentAction(
                  undefined,
                  appointment.id.toString(),
                );
              }}
            />
            <Link
              href={`/appointment/${appointment.id}/edit`}
              className="flex w-full gap-2"
            >
              <Button className="hover:bg-secondary w-full bg-inherit text-inherit">
                <Pencil />
                Edit
              </Button>
            </Link>
            <DeleteItem
              name={appointment.full_name}
              action={async () => {
                "use server";
                return deleteAppointmentAction(
                  undefined,
                  appointment.id.toString(),
                );
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
