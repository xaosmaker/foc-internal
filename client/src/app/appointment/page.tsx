import { DataTable } from "@/components/data-table";
import { appointmentTableColumns } from "@/features/appointment/appointmentTableCols";
import { getAppointments } from "@/features/appointment/fetchers";
import { getLocations, getStatusCodes } from "@/shared/fetchers";

export default async function AppointmentPage() {
  const appointments = await getAppointments();
  const statusCodes = await getStatusCodes();
  const locations = await getLocations();

  return (
    <>
      <h1 className="text-6x text-center uppercase">appointment</h1>
      <DataTable
        columns={appointmentTableColumns}
        data={appointments}
        statusCodes={statusCodes}
        locations={locations}
      />
    </>
  );
}
