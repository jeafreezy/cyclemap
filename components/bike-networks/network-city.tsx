import { BikeNetworkLocation } from "@/types";
import { getCountryNameFromCode } from "@/utils/country-helper";
import { MapPin } from "lucide-react";
import { useMemo } from "react";

export const BikeNetworkCity = ({
  networkLocation,
  isNetworkDetailPage = false,
}: {
  networkLocation: BikeNetworkLocation;
  isNetworkDetailPage?: boolean;
}) => {
  const countryName = useMemo(() => {
    return getCountryNameFromCode(networkLocation.country);
  }, [networkLocation.country]);
  const fullLocation = `${networkLocation.city}, ${countryName}`;
  return (
    <div
      className="flex items-center gap-x-3"
      aria-label={`Location: ${fullLocation}`}
    >
      <div
        className={`flex items-center justify-center size-6 ${!isNetworkDetailPage && "bg-toreabay-50"} rounded-sm`}
      >
        <MapPin
          className={`${!isNetworkDetailPage ? "text-grenadier-400" : "text-toreabay-100"} size-4`}
        />
      </div>
      <p
        className={`${isNetworkDetailPage ? "text-toreabay-100 text-base" : "text-muted-foreground truncate text-sm"} leading-7`}
        title={fullLocation}
      >
        {fullLocation}
      </p>
    </div>
  );
};
