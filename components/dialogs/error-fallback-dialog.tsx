"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type ErrorFallbackDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const ErrorFallbackDialog = ({
  open,
  onClose,
}: ErrorFallbackDialogProps) => {
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Could not load bike networks</DialogTitle>
          <DialogDescription>
            An error occurred while fetching data. Please try again.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            onClick={() => {
              router.refresh();
            }}
            className="cursor-pointer"
          >
            Retry
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
