import { BikeNetworksPageWrapper } from "@/components/wrappers/bike-networks-wrapper";
import { bikeNetworksService } from "@/services";

export default async function BikeNetworksPage() {
  try {
    const bikeNetworks = await bikeNetworksService.getBikeNetworks();
    return (
      <BikeNetworksPageWrapper bikeNetworks={bikeNetworks} hasError={false} />
    );
  } catch {
    return <BikeNetworksPageWrapper bikeNetworks={[]} hasError={true} />;
  }
}
