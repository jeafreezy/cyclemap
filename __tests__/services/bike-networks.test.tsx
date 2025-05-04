import { describe, it, expect, vi, beforeEach } from "vitest";
import { bikeNetworksService } from "@/services";
import { API_ROUTES } from "@/services";

describe("bikeNetworksService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("getBikeNetworks", () => {
    it("returns bike networks on success", async () => {
      const mockNetworks = [{ id: "abc", name: "Test Network" }];
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ networks: mockNetworks }),
      });

      const result = await bikeNetworksService.getBikeNetworks();
      expect(result).toEqual(mockNetworks);
      expect(fetch).toHaveBeenCalledWith(API_ROUTES.GET_BIKE_NETWORKS);
    });

    it("throws an error if response is not ok", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: "Internal Server Error",
      });

      await expect(bikeNetworksService.getBikeNetworks()).rejects.toThrow(
        "Failed to fetch bike networks: Internal Server Error",
      );
    });
  });

  describe("getBikeNetworkById", () => {
    it("returns bike network detail on success", async () => {
      const mockNetwork = { id: "xyz", name: "Network XYZ" };
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ network: mockNetwork }),
      });

      const result = await bikeNetworksService.getBikeNetworkById("xyz");
      expect(result).toEqual(mockNetwork);
      expect(fetch).toHaveBeenCalledWith(
        API_ROUTES.GET_BIKE_NETWORK_BY_ID("xyz"),
      );
    });

    it("throws an error if response is not ok", async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        statusText: "Not Found",
      });

      await expect(
        bikeNetworksService.getBikeNetworkById("xyz"),
      ).rejects.toThrow("Failed to fetch bike network with id xyz: Not Found");
    });
  });
});
