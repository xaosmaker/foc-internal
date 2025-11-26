import { DataTable } from "@/components/data-table";
import { getAppointments } from "@/features/appointment/fetchers";
import { appointmentTableColumns } from "@/features/appointment/tableCols";

export default async function AppointmentPage() {
  const appointments = await getAppointments();
  console.log(appointments);

  return (
    <>
      <div>appointment</div>
      <DataTable columns={appointmentTableColumns} data={appointments} />
    </>
  );
}
