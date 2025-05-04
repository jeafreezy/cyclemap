import { MetadataRoute } from "next";
import { bikeNetworksService } from "@/services";
import { APPLICATION_ROUTES } from "@/configs";
import { BikeNetwork } from "@/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = process.env.NEXT_PUBLIC_SITE_URL;

  let networks = [] as BikeNetwork[];
  try {
    networks = await bikeNetworksService.getBikeNetworks();
  } catch {
    networks = [];
  }

  return [
    {
      url: `${domain}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    ...networks.map((network) => ({
      url: `${domain}${APPLICATION_ROUTES.NETWORK_DETAILS(network.id)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
