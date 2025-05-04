"use client";
import { BikeNetworksMap } from "@/components/map";
import { BikeNetworks } from "@/types";
import { Sidebar } from "@/components/layouts/sidebar";
import { useSearchParams } from "next/navigation";
import { BIKE_NETWORKS_PAGE_SIZE, SEARCH_PARAMS_KEYS } from "@/configs";
import { useMemo } from "react";

export const AppLayout = ({
  initialBikeNetworks,
}: {
  initialBikeNetworks: BikeNetworks;
}) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get(SEARCH_PARAMS_KEYS.SEARCH);
  const country = searchParams.get(SEARCH_PARAMS_KEYS.COUNTRY);
  const page = parseInt(searchParams.get("page") || "1", 10);

  const filteredBikeNetworks = useMemo(() => {
    return initialBikeNetworks.filter((network) => {
      if (searchQuery && country) {
        return (
          network.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          network.location.country.toLowerCase() === country.toLowerCase()
        );
      } else if (searchQuery) {
        return network.name.toLowerCase().includes(searchQuery.toLowerCase());
      } else if (country) {
        return network.location.country.toLowerCase() === country.toLowerCase();
      }
      return true;
    });
  }, [initialBikeNetworks, searchQuery, country]);

  const paginatedBikeNetworks = useMemo(() => {
    const start = (page - 1) * BIKE_NETWORKS_PAGE_SIZE;
    const end = start + BIKE_NETWORKS_PAGE_SIZE;
    return filteredBikeNetworks.slice(start, end);
  }, [filteredBikeNetworks, page]);

  return (
    <div className="font-[family-name:var(--font-poppins)] w-screen h-screen bg-background">
      <main className="grid grid-cols-12 h-full w-full">
        {/* Sidebar */}
        <aside className="col-span-4 h-full">
          <Sidebar
            bikeNetworks={paginatedBikeNetworks}
            totalBikeNetworks={filteredBikeNetworks.length}
          />
        </aside>
        {/* Map container */}
        <div className="col-span-8">
          {/* The map does not need to be paginated. */}
          <BikeNetworksMap bikeNetworks={filteredBikeNetworks} />
        </div>
      </main>
    </div>
  );
};
