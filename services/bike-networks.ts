import { BikeNetworkDetail, BikeNetworks } from "@/types";
import { API_ROUTES } from "@/services";

class BikeNetworksService {
  /**
   *  Fetches a list of bike networks.
   * @returns A promise that resolves to a list of bike networks.
   */
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

  /**
   *  Fetches a bike network by its id.
   * @param id - The id of the bike network to fetch.
   * @returns  A promise that resolves to the bike network detail.
   */
  async getBikeNetworkById(id: string): Promise<BikeNetworkDetail> {
    try {
      const response = await fetch(`${API_ROUTES.GET_BIKE_NETWORK_BY_ID(id)}`);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch bike network with id ${id}: ${response.statusText}`,
        );
      }
      const data = await response.json();
      return data.network;
    } catch (error) {
      console.error(`Error fetching bike network with id ${id}:`, error);
      throw error;
    }
  }
}

export const bikeNetworksService = new BikeNetworksService();
