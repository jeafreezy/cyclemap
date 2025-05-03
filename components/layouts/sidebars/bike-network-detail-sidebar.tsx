"use client";

import { BikeNetworkDetail } from "@/types";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Paginator } from "@/components/bike-networks/pagination";
import { BikeNetworkCity } from "@/components/bike-networks/network-city";
import { BikeNetworkCompany } from "@/components/bike-networks/network-company";
import { BIKE_NETWORKS_PAGE_SIZE, SEARCH_PARAMS_KEYS } from "@/configs";
import { useMemo } from "react";
import { BikeNetworkStationsTable } from "@/components/bike-networks/stations-table";

export function BikeNetworkDetailSidebar({
  network,
}: {
  network: BikeNetworkDetail;
}) {
  const router = useRouter();

  console.log("BikeNetworkDetailPageWrapper", network);

  const searchParams = useSearchParams();

  const page = parseInt(searchParams.get(SEARCH_PARAMS_KEYS.PAGE) || "1", 10);

  const paginatedBikeNetworkStations = useMemo(() => {
    const start = (page - 1) * BIKE_NETWORKS_PAGE_SIZE;
    const end = start + BIKE_NETWORKS_PAGE_SIZE;
    return network.stations.slice(start, end);
  }, [network.stations, page]);

  console.log(paginatedBikeNetworkStations);
  return (
    <aside className="h-screen w-full bg-gradient-to-b from-indigo-600 to-indigo-700 text-white p-4 flex flex-col no-scrollbar">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="text-white" />
        </Button>
        <h2 className="text-xl font-bold">{network.name}</h2>
      </div>

      {/* Location and companies */}
      <BikeNetworkCity networkLocation={network.location} isNetworkDetailPage />
      <BikeNetworkCompany network={network} isNetworkDetailPage />
      {/* Station Table */}
      <div className="text-sm font-medium mb-2">
        All <span className="font-bold">{network.stations.length}</span>{" "}
        stations
      </div>
      <div className="flex-1 overflow-auto no-scrollbar">
        <BikeNetworkStationsTable stations={paginatedBikeNetworkStations} />
      </div>

      {/* Pagination */}
      {/* <Paginator
        totalBikeNetworks={network.stations.length}
        stations={network.stations}
        isNetworkDetailPage
      /> */}
    </aside>
  );
}
