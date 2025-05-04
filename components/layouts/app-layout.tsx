"use client";
import { MapLayout } from "@/components/layouts/map-layout";
import { SiteTourDialog } from "@/components/dialogs/site-tour-dialog";
import { Button } from "@/components/ui/button";
import { CircleHelp } from "lucide-react";
import { TOUR_IDS } from "@/utils/tour-steps";
import { useAppTour } from "@/hooks/use-app-tour";

export const AppLayout = ({
  mapLayer,
  sidebar,
}: {
  sidebar: React.ReactNode;
  mapLayer: React.ReactNode;
}) => {
  const {
    openTourDialog,
    handleSkipTour,
    handleTourButtonClick,
    handleStartTour,
  } = useAppTour();

  return (
    <>
      {openTourDialog && (
        <SiteTourDialog
          open={openTourDialog}
          onClose={handleSkipTour}
          onStartTour={handleStartTour}
        />
      )}
      <div className="font-[family-name:var(--font-poppins)] h-screen bg-background ">
        <main className="flex flex-col md:flex-row min-h-screen  md:h-full w-full">
          {/* Sidebar */}
          <aside className="w-full md:w-1/2 xl:w-1/3 h-screen md:h-full">
            {sidebar}
          </aside>
          {/* Map */}
          <div
            className="w-full h-[400px] md:h-full md:w-1/2 xl:w-2/3 relative"
            id={TOUR_IDS.MAP}
          >
            <MapLayout>{mapLayer}</MapLayout>
            {/* Help/Tour trigger Button */}
            <Button
              variant="ghost"
              id={TOUR_IDS.TOUR_STARTER}
              onClick={handleTourButtonClick}
              className="absolute w-10 h-10 bg-white text-primary right-6 bottom-10 cursor-pointer"
              aria-label="Start site tour"
            >
              <CircleHelp className="size-10 text-primary" aria-hidden="true" />
            </Button>
          </div>
        </main>
      </div>
    </>
  );
};
