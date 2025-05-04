"use client";

import {
  CountryFilter,
  SearchBarFilter,
} from "@/components/bike-networks/filters";
import { Header } from "@/components/layouts/header";
import { BikeNetworks } from "@/types";
import { BikeNetworkCard } from "@/components/bike-networks/network-card";
import { BIKE_NETWORKS_PAGE_SIZE, SEARCH_PARAMS_KEYS } from "@/configs";
import { Paginator } from "@/components/bike-networks/pagination";
import useQueryParam from "@/hooks/use-query-params";
import { TOUR_IDS } from "@/utils/tour-steps";

export const BikeNetworksSidebar = ({
  bikeNetworks,
  totalBikeNetworks,
}: {
  bikeNetworks: BikeNetworks;
  totalBikeNetworks: number;
}) => {
  const { queryParam: page, handleParamChange } = useQueryParam(
    SEARCH_PARAMS_KEYS.PAGE,
  );
  const pageNumber = parseInt(page) || 1;
  return (
    <div className="h-full flex flex-col overflow-y-auto no-scrollbar relative w-full">
      <div className="p-6">
        <Header />
        <div className="flex gap-2 sticky top-0 bg-base-white py-4 z-10 flex-wrap md:flex-nowrap">
          <SearchBarFilter />
          <CountryFilter />
        </div>
        <div className="flex-1">
          {bikeNetworks.length > 0 ? (
            <ul>
              {bikeNetworks.map((network) => (
                <li key={`bike-network-${network.id}`}>
                  <BikeNetworkCard network={network} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-grenadier-400 text-sm">
              <p>No bike network(s) found.</p>
            </div>
          )}
        </div>
        {totalBikeNetworks > BIKE_NETWORKS_PAGE_SIZE ? (
          <div id={TOUR_IDS.PAGINATION}>
            <Paginator
              totalItems={totalBikeNetworks}
              itemsPerPage={BIKE_NETWORKS_PAGE_SIZE}
              currentPage={pageNumber}
              handlePageChange={(page: number) => {
                handleParamChange(page.toString());
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
