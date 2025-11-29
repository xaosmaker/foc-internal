import CreateAppointmentForm from "@/features/appointment/CreateAppointmentForm";
import { getLocations } from "@/shared/fetchers";

export default async function CreateAppointmentPage() {
  const location = await getLocations();

  return <CreateAppointmentForm location={location} />;
}
