import { BikeNetworkDetail } from "@/types";
import { AppLayout } from "@/components/layouts/app-layout";
import { BikeNetworkDetailLayer } from "@/components/map/layers";
import { BikeNetworkDetailSidebar } from "@/components/layouts/sidebars";

export const BikeNetworkDetailPageWrapper = ({
  bikeNetwork,
}: {
  bikeNetwork: BikeNetworkDetail;
}) => {
  return (
    <AppLayout
      sidebar={<BikeNetworkDetailSidebar network={bikeNetwork} />}
      mapLayer={<BikeNetworkDetailLayer stations={bikeNetwork.stations} />}
    />
  );
};
