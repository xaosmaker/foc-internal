import CreateAppointmentForm from "@/features/appointment/CreateAppointmentForm";
import { getStatusCodes } from "@/shared/fetchers";

export default async function CreateAppointmentPage() {
  const statusCodes = await getStatusCodes();

  return <CreateAppointmentForm statusCodes={statusCodes} />;
}
