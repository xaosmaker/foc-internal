import { DataTable } from "@/components/data-table";
import { getAppointments } from "@/features/appointment/fetchers";
import { appointmentTableColumns } from "@/features/appointment/tableCols";
import { getLocations, getStatusCodes } from "@/shared/fetchers";

export default async function AppointmentPage() {
  const appointments = await getAppointments();
  const statusCodes = await getStatusCodes();
  const locations = await getLocations();

  return (
    <>
      <div>appointment</div>
      <DataTable
        columns={appointmentTableColumns}
        data={appointments}
        statusCodes={statusCodes}
        locations={locations}
      />
    </>
  );
}
