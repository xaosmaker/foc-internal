import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

export default function DeleteItem({
  name,
  action,
}: {
  name: string;
  action: () => Promise<void>;
}) {
  return (
    <Dialog>
      <DialogTrigger className="flex items-center gap-2 text-nowrap">
        <Trash2 /> Delete
      </DialogTrigger>
      <DialogContent>
        <DialogTitle className="text-red-600">
          Delete Item &apos;{name}&apos;
        </DialogTitle>
        <DialogDescription className="text-red-500">
          Are you sure you want to delete this item? This action is ireversible!
        </DialogDescription>
        <form action={action} className="p flex justify-between">
          <Button type="submit" variant="destructive">
            Delete
          </Button>
          <Button asChild>
            <DialogClose>Cancel</DialogClose>
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
