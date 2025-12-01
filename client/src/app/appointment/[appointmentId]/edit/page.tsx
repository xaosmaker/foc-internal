import CreateAppointmentForm from "@/features/appointment/CreateAppointmentForm";
import { getAppointmentById } from "@/features/appointment/fetchers";
import { getLocations } from "@/shared/fetchers";

export default async function AppointmentEditPage({
  params,
}: {
  params: Promise<{ appointmentId: string }>;
}) {
  const { appointmentId } = await params;
  const location = await getLocations();
  const appointment = await getAppointmentById(appointmentId);
  return <CreateAppointmentForm location={location} editData={appointment} />;
}
