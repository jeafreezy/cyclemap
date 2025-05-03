"use client";
import { BikeNetworks } from "@/types";
import { BikeNetworksSidebar } from "@/components/layouts/sidebars";
import { useSearchParams } from "next/navigation";
import { BIKE_NETWORKS_PAGE_SIZE, SEARCH_PARAMS_KEYS } from "@/configs";
import { useMemo } from "react";
import { AppLayout } from "@/components/layouts/app-layout";
import { BikeNetworksLayer } from "@/components/map/layers/bike-networks-layer";
import { usePaginator } from "@/hooks/use-pagination";

export const BikeNetworksPageWrapper = ({
  bikeNetworks,
}: {
  bikeNetworks: BikeNetworks;
}) => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get(SEARCH_PARAMS_KEYS.SEARCH);
  const country = searchParams.get(SEARCH_PARAMS_KEYS.COUNTRY);
  const page = parseInt(searchParams.get(SEARCH_PARAMS_KEYS.PAGE) || "1", 10);

  const filteredBikeNetworks = useMemo(() => {
    return bikeNetworks.filter((network) => {
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
  }, [bikeNetworks, searchQuery, country]);

  const paginatedBikeNetworks = usePaginator(
    filteredBikeNetworks,
    page,
    BIKE_NETWORKS_PAGE_SIZE,
  ) as BikeNetworks;
  return (
    <AppLayout
      sidebar={
        <BikeNetworksSidebar
          bikeNetworks={paginatedBikeNetworks}
          totalBikeNetworks={filteredBikeNetworks.length}
        />
      }
      mapLayer={<BikeNetworksLayer bikeNetworks={filteredBikeNetworks} />}
    />
  );
};
