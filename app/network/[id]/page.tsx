import { BikeNetworkDetailPageWrapper } from "@/components/wrappers/bike-network-detail-wrapper";
import { bikeNetworksService } from "@/services";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { APPLICATION_ROUTES } from "@/configs";



/**
 * Revalidation for ISR.
 */
export const revalidate = parseInt(
  process.env.NEXT_PUBLIC_BIKE_DEDAIL_PAGE_REVALIDATE_TIME_IN_SECONDS || "0",
  10,
);

export async function generateStaticParams() {
  const networks = await bikeNetworksService.getBikeNetworks();
  return networks.map((network) => ({ id: network.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id } = await params;
    const bike = await bikeNetworksService.getBikeNetworkById(id);
    return {
      title: `${bike.name} - CycleMap`,
      description: `Explore ${bike.name}, a bike network in ${bike.location.city}, ${bike.location.country}. View company details and live map.`,
      openGraph: {
        title: `${bike.name} - CycleMap`,
        description: `Explore ${bike.name}, a bike network in ${bike.location.city}, ${bike.location.country}.`,
        images: [`/og/opengraph-image.png`],
        type: "website",
        url: new URL(
          `${process.env.NEXT_PUBLIC_SITE_URL}${APPLICATION_ROUTES.NETWORK_DETAILS(id)}`,
        ),
      },
    };
  } catch {
    return {
      title: "Bike Network Not Found - CycleMap",
      description: "The requested bike network does not exist.",
    };
  }
}

export default async function BikeNetworkDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  try {
    const bikeNetworkDetail = await bikeNetworksService.getBikeNetworkById(id);
    return <BikeNetworkDetailPageWrapper bikeNetwork={bikeNetworkDetail} />;
  } catch {
    notFound();
  }
}
