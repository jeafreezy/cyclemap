import { BikeNetworks } from "@/types";
import { API_ROUTES } from "./api-routes";

class BikeNetworksService {
  async getBikeNetworks(): Promise<BikeNetworks> {
    try {
      const response = await fetch(API_ROUTES.GET_BIKE_NETWORKS);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch bike networks: ${response.statusText}`,
        );
      }
      const data = await response.json();
      return data.networks;
    } catch (error) {
      console.error("Error fetching bike networks:", error);
      throw error;
    }
  }
}

export const bikeNetworksService = new BikeNetworksService();
