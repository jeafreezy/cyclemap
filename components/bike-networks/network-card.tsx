import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, MapPin } from "lucide-react";
import { BikeNetwork } from "@/types";
import countryData from "@/data/countries.json";

export const BikeNetworkCard: React.FC<{ network: BikeNetwork }> = ({
  network,
}) => {
  const countryName = useMemo(() => {
    const country = countryData.data.find(
      (country) => country.code === network.location.country,
    );
    return country?.name || network.location.country;
  }, [network.location.country]);

  const companyDisplay = useMemo(() => {
    if (network.company.length === 0) {
      return <span className="italic truncate">No companies available</span>;
    }

    const displayedCompanies = network.company.slice(0, 2).join(", ");
    const additionalCount = network.company.length - 2;

    return (
      <>
        <span className="truncate min-w-0">{displayedCompanies}</span>
        {additionalCount > 0 && (
          <span className="text-grenadier-400 border border-grenadier-400 px-1.5 py-1 w-6 h-6 inline-flex items-center justify-center rounded shrink-0 whitespace-nowrap">
            +{additionalCount}
          </span>
        )}
      </>
    );
  }, [network.company]);

  return (
    <Link href={`/bike-network/${network.id}`}>
      <div className="p-4 border-b border-b-accent cursor-pointer hover:bg-accent transition-colors duration-300 group relative space-y-0.5">
        {/* Network Name */}
        <h3 className="font-bold text-lg text-primary truncate">
          {network.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-x-3">
          <div className="flex items-center justify-center size-6 bg-toreabay-50 rounded-sm">
            <MapPin className="text-grenadier-400 size-4" />
          </div>
          <p className="text-sm text-muted-foreground leading-7 truncate">
            {network.location.city}, {countryName}
          </p>
        </div>

        <div className="flex items-center gap-x-3 justify-between w-full">
          <div className="flex items-center gap-x-3">
            <div className="flex items-center justify-center w-6 h-6 bg-toreabay-50 rounded-sm">
              <BriefcaseBusiness className="text-grenadier-400 w-4 h-4" />
            </div>
            <p className="text-sm text-muted-foreground leading-7 sm:max-w-[150px] truncate flex items-center gap-x-1 min-w-0">
              {companyDisplay}
            </p>
          </div>

          <button className="flex items-center cursor-pointer bg-white rounded-full px-4 py-2 gap-x-2 min-w-[7rem] sm:w-28 justify-end">
            <span className="overflow-hidden text-grenadier-500 whitespace-nowrap max-w-0 group-hover:max-w-16 transition-all duration-300">
              Details
            </span>
            <ArrowRight className="size-4 text-grenadier-400 transition-transform group-hover:-translate-x-1" />
          </button>
        </div>
      </div>
    </Link>
  );
};
