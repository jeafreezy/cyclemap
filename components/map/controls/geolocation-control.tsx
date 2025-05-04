import { Button } from "@/components/ui/button";
import { GEOLOCATION_ZOOM_LEVEL } from "@/configs";
import { useMap } from "@/contexts";
import { TOUR_IDS } from "@/utils/tour-steps";
import { LocateIcon } from "lucide-react";
import { toast } from "sonner";

export const GeolocationControl = () => {
  const map = useMap();
  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.flyTo({
            center: [longitude, latitude],
            zoom: GEOLOCATION_ZOOM_LEVEL,
            speed: 1.2,
            curve: 1,
            easing(t) {
              return t;
            },
          });
        },
        () => {
          toast.error(
            `Unable to retrieve your location. Please check your browser settings and try again.`,
          );
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        },
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="absolute top-8 left-8 z-10">
      <Button
        variant="ghost"
        id={TOUR_IDS.NEAR_ME}
        size="sm"
        className="bg-primary py-2 px-4 rounded-full shadow-md flex items-center gap-x-2 cursor-pointer text-base-white hover:text-primary"
        onClick={handleGeolocation}
        aria-label="Center map near your current location"
      >
        <LocateIcon className="size-4" aria-hidden="true" />
        <span className="font-bold text-sm">Near me</span>
      </Button>
    </div>
  );
};
