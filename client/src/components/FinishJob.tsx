import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ClipboardCheck } from "lucide-react";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

export default function FinishJob({
  name,
  action,
}: {
  name: string;
  action: () => Promise<void>;
}) {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 text-nowrap" asChild>
        <Button className="hover: w-full bg-inherit" variant="secondary">
          <ClipboardCheck /> Finish
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-green-600">
          Delete Item &apos;{name}&apos;
        </DialogTitle>
        <DialogDescription className="text-green-500">
          Are you sure you want to finish this job? This action is ireversible!
        </DialogDescription>
        <form action={action} className="p flex justify-between">
          <Button type="submit" variant="destructive">
            Finish
          </Button>
          <Button asChild>
            <DialogClose>Cancel</DialogClose>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
