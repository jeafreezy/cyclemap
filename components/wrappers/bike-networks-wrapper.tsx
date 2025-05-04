"use client";
import { BikeNetworks } from "@/types";
import { BikeNetworksSidebar } from "@/components/layouts/sidebars";
import { useSearchParams } from "next/navigation";
import { BIKE_NETWORKS_PAGE_SIZE, SEARCH_PARAMS_KEYS } from "@/configs";
import { useEffect, useMemo, useState } from "react";
import { AppLayout } from "@/components/layouts/app-layout";
import { BikeNetworksLayer } from "@/components/map/layers/bike-networks-layer";
import { usePaginator } from "@/hooks/use-pagination";
import { ErrorFallbackDialog } from "@/components/dialogs/error-fallback-dialog";

export const BikeNetworksPageWrapper = ({
  bikeNetworks,
  hasError,
}: {
  bikeNetworks: BikeNetworks;
  hasError: boolean;
}) => {
  const [openErrorDialog, setOpenErrorDialog] = useState<boolean>(hasError);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get(SEARCH_PARAMS_KEYS.SEARCH);
  const country = searchParams.get(SEARCH_PARAMS_KEYS.COUNTRY);
  const page = parseInt(searchParams.get(SEARCH_PARAMS_KEYS.PAGE) || "1", 10);

  const filteredBikeNetworks = useMemo(() => {
    return bikeNetworks.filter((network) => {
      if (searchQuery && country) {
        return (
          (network.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            network.company.some((company) =>
              company.toLowerCase().includes(searchQuery.toLowerCase()),
            )) &&
          network.location.country.toLowerCase() === country.toLowerCase()
        );
      } else if (searchQuery) {
        return (
          network.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          network.company.some((company) =>
            company.toLowerCase().includes(searchQuery.toLowerCase()),
          )
        );
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

  /**
   * Sync the openErrorDialog state with the hasError prop.
   */
  useEffect(() => {
    setOpenErrorDialog(hasError);
  }, [hasError]);

  return (
    <>
      {openErrorDialog && (
        <ErrorFallbackDialog
          open={openErrorDialog}
          onClose={() => setOpenErrorDialog(false)}
        />
      )}
      <AppLayout
        sidebar={
          <BikeNetworksSidebar
            bikeNetworks={paginatedBikeNetworks}
            totalBikeNetworks={filteredBikeNetworks.length}
          />
        }
        mapLayer={
          <BikeNetworksLayer
            bikeNetworks={filteredBikeNetworks}
            key="bike-networks-layer"
          />
        }
      />
    </>
  );
};
