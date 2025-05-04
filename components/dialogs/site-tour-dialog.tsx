"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type SiteTourDialogProps = {
  open: boolean;
  onStartTour: () => void;
  onClose: () => void;
};

export const SiteTourDialog = ({
  open,
  onStartTour,
  onClose,
}: SiteTourDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Welcome to CycleMap 👋</DialogTitle>
          <DialogDescription>
            Take a quick tour to learn how to explore bike networks, view
            station data, and use the map tools effectively.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose} className="cursor-pointer">
            Skip
          </Button>
          <Button onClick={onStartTour} className=" cursor-pointer">
            Start Tour
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
