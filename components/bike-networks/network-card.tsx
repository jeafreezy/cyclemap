import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BikeNetwork } from "@/types";
import { APPLICATION_ROUTES } from "@/configs";
import { BikeNetworkCity } from "@/components/bike-networks/network-city";
import { BikeNetworkCompany } from "@/components/bike-networks/network-company";
import { Button } from "@/components/ui/button";
import { TOUR_IDS } from "@/utils/tour-steps";

export const BikeNetworkCard: React.FC<{ network: BikeNetwork }> = ({
  network,
}) => {
  return (
    <Link
      href={`${APPLICATION_ROUTES.NETWORK_DETAILS(network.id)}`}
      aria-label={`View details for ${network.name}`}
      id={TOUR_IDS.BIKE_NETWORK}
    >
      <div className="p-4 border-b border-b-accent cursor-pointer hover:bg-accent transition-colors duration-300 group relative space-y-0.5 overflow-clip">
        {/* Network Name */}
        <h3 className="font-bold text-lg text-primary truncate">
          {network.name}
        </h3>
        {/* Location */}
        <BikeNetworkCity networkLocation={network.location} />
        <div className="flex flex-col items-start sm:flex-row md:items-center gap-3 justify-between w-full">
          <BikeNetworkCompany network={network} />
          <Button
            variant="ghost"
            size="icon"
            aria-label={`View details for ${network.name}`}
            className="flex items-center cursor-pointer bg-white rounded-full px-4 py-2 gap-x-2 min-w-[7rem] sm:w-28 sm:justify-end hover:bg-white"
          >
            <span className="overflow-hidden text-grenadier-500 whitespace-nowrap max-w-0 group-hover:max-w-16 transition-all duration-300">
              Details
            </span>
            <ArrowRight
              className="size-4 text-grenadier-400 -translate-x-12 sm:-translate-x-0 transition-transform group-hover:-translate-x-1"
              aria-hidden
            />
          </Button>
        </div>
      </div>
    </Link>
  );
};
