"use client";

import { BikeNetworkDetail, Station } from "@/types";
import { BIKE_NETWORK_STATIONS_PAGE_SIZE, SEARCH_PARAMS_KEYS } from "@/configs";
import { BikeNetworkStationsTable } from "@/components/bike-networks/stations-table";
import { BikeNetworkHero } from "@/components/bike-networks/bike-network-hero";
import { motion } from "framer-motion";
import { usePaginator } from "@/hooks/use-pagination";
import { Paginator } from "@/components/bike-networks/pagination";
import useQueryParam from "@/hooks/use-query-params";

export function BikeNetworkDetailSidebar({
  network,
}: {
  network: BikeNetworkDetail;
}) {
  const { queryParam: page, handleParamChange } = useQueryParam(
    SEARCH_PARAMS_KEYS.PAGE,
  );
  const pageNumber = parseInt(page) || 1;
  const paginatedBikeNetworkStations = usePaginator(
    network.stations,
    pageNumber,
    BIKE_NETWORK_STATIONS_PAGE_SIZE,
  ) as Station[];

  return (
    <div className="relative">
      <motion.aside
        key={network.id}
        className="absolute top-0 right-0 h-screen w-full bg-toreabay-800 text-white flex flex-col  overflow-y-auto no-scrollbar "
        initial={{ x: "100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: "100%", opacity: 0 }}
        transition={{ type: "tween", duration: 0.4 }}
      >
        <BikeNetworkHero network={network} />
        <section className="px-10 flex flex-col space-y-3">
          <div className="text-sm flex items-center gap-x-2 text-base-white">
            All
            <span className="text-grenadier-400 border border-grenadier-400 px-1.5 py-1 inline-flex items-center justify-center rounded whitespace-nowrap">
              {network.stations.length}
            </span>
            stations
          </div>
          <BikeNetworkStationsTable stations={paginatedBikeNetworkStations} />
          {network.stations.length > BIKE_NETWORK_STATIONS_PAGE_SIZE ? (
            <Paginator
              totalItems={network.stations.length}
              itemsPerPage={BIKE_NETWORK_STATIONS_PAGE_SIZE}
              variant="secondary"
              currentPage={pageNumber}
              handlePageChange={(page: number) =>
                handleParamChange(page.toString())
              }
            />
          ) : null}
        </section>
      </motion.aside>
    </div>
  );
}
