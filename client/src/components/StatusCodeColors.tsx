import { cn } from "@/lib/utils";

const colors = {
  Cancelled: "bg-red-500",
  Inspection_Pending: "bg-yellow-500",
  Inspection_Done: "bg-purple-500",
  Inspection_Review: "bg-sky-500",
  Work_Scheduled: "bg-gray-500",
  Work_Pending: "bg-amber-600",
  In_Progress: "bg-white",
  Work_Finished: "bg-blue-700",
  Completed: "bg-green-700",
};

export type StatusColors = keyof typeof colors;
export default function StatusCodeColors({
  variant,
  children,
}: {
  variant: StatusColors;
  children: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto max-w-fit rounded-2xl px-4 text-black",
        colors[variant],
      )}
    >
      {children}
    </div>
  );
}
