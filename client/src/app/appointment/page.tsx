import { DataTable } from "@/components/data-table";
import { appointmentTableColumns } from "@/features/appointment/appointmentTableCols";
import { getAppointments } from "@/features/appointment/fetchers";

export default async function AppointmentPage() {
  const appointments = await getAppointments();

  return (
    <>
      <h1 className="text-6x text-center uppercase">appointment</h1>
      <DataTable columns={appointmentTableColumns} data={appointments} />
    </>
  );
}
