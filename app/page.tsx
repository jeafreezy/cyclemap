import { SuspenseFallback } from "@/components/suspense-fallback";
import { BikeNetworksPageWrapper } from "@/components/wrappers/bike-networks-wrapper";
import { bikeNetworksService } from "@/services";
import { Suspense } from "react";
export default async function BikeNetworksPage() {
  try {
    const bikeNetworks = await bikeNetworksService.getBikeNetworks();
    return (
      <Suspense fallback={<SuspenseFallback />}>
        <BikeNetworksPageWrapper bikeNetworks={bikeNetworks} hasError={false} />
      </Suspense>
    );
  } catch {
    return (
      <Suspense fallback={<SuspenseFallback />}>
        <BikeNetworksPageWrapper bikeNetworks={[]} hasError={true} />;
      </Suspense>
    );
  }
}
