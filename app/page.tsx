import { AppLayout } from "@/components/layouts/app-layout";
import { bikeNetworksService } from "@/services";

export default async function HomePage() {
  const bikeNetworks = await bikeNetworksService.getBikeNetworks();
  return <AppLayout initialBikeNetworks={bikeNetworks} />;
}
