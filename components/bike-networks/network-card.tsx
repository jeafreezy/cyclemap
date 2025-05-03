import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BikeNetwork } from "@/types";
import { APPLICATION_ROUTES } from "@/configs";
import { BikeNetworkCity } from "@/components/bike-networks/network-city";
import { BikeNetworkCompany } from "@/components/bike-networks/network-company";
import { Button } from "@/components/ui/button";

export const BikeNetworkCard: React.FC<{ network: BikeNetwork }> = ({
  network,
}) => {
  return (
    <Link href={`${APPLICATION_ROUTES.NETWORK_DETAILS(network.id)}`}>
      <div className="p-4 border-b border-b-accent cursor-pointer hover:bg-accent transition-colors duration-300 group relative space-y-0.5">
        {/* Network Name */}
        <h3 className="font-bold text-lg text-primary truncate">
          {network.name}
        </h3>
        {/* Location */}
        <BikeNetworkCity networkLocation={network.location} />
        <div className="flex items-center gap-x-3 justify-between w-full">
          <BikeNetworkCompany network={network} />
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center cursor-pointer bg-white rounded-full px-4 py-2 gap-x-2 min-w-[7rem] sm:w-28 justify-end hover:bg-white"
          >
            <span className="overflow-hidden text-grenadier-500 whitespace-nowrap max-w-0 group-hover:max-w-16 transition-all duration-300">
              Details
            </span>
            <ArrowRight className="size-4 text-grenadier-400 transition-transform group-hover:-translate-x-1" />
          </Button>
        </div>
      </div>
    </Link>
  );
};
