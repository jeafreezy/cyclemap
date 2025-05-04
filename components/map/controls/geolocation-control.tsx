import { GEOLOCATION_ZOOM_LEVEL } from "@/configs";
import { LocateIcon } from "lucide-react";
import { Map } from "mapbox-gl";
import { toast } from "sonner";

export const GeolocationControl = ({ map }: { map: Map }) => {
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
        (error) => {
          toast.error(
            `Unable to retrieve your location. Reason: ${error.message}.`,
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
      <button
        className="bg-primary py-2 px-4 rounded-full shadow-md flex items-center gap-x-2 cursor-pointer text-base-white"
        onClick={handleGeolocation}
      >
        <LocateIcon className="size-4" />
        <span className="font-bold text-sm">Near me</span>
      </button>
    </div>
  );
};
