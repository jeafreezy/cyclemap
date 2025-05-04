
import {
  CountryFilter,
  PaginationFilter,
  SearchBarFilter,
} from "@/components/bike-networks/filters";
import { Header } from "@/components/layouts/header";
import { BikeNetworks } from "@/types";
import { BikeNetworkCard } from "@/components/bike-networks/network-card";
import { BIKE_NETWORKS_PAGE_SIZE } from "@/configs";


export const Sidebar = ({
  bikeNetworks,
  totalBikeNetworks,
}: {
  bikeNetworks: BikeNetworks;
  totalBikeNetworks: number;
}) => {

  return (
    <aside className="h-screen flex flex-col overflow-y-auto no-scrollbar">
      <div className="p-6">
        <Header />
        <div className="flex gap-x-2 sticky top-0 bg-base-white py-4 z-10">
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
        {totalBikeNetworks > BIKE_NETWORKS_PAGE_SIZE
          ?
          <PaginationFilter
            bikeNetworks={bikeNetworks}
            totalBikeNetworks={totalBikeNetworks}
          />
          : null}
      </div>
    </aside>
  );
};
