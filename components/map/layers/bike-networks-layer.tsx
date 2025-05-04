"use client";

import {
  BIKE_NETWORK_POINTS_LAYER_ID,
  BIKE_NETWORK_POINTS_SOURCE_ID,
} from "@/configs";
import { useMap } from "@/contexts";
import { BikeNetworks } from "@/types";
import { AllGeoJSON } from "@turf/helpers";
import { GeoJSONSource } from "mapbox-gl";
import { useEffect, useMemo } from "react";

export const BikeNetworksLayer = ({
  bikeNetworks,
}: {
  bikeNetworks: BikeNetworks;
}) => {
  const map = useMap();
  const bikeNetworkFeatureCollection: AllGeoJSON = useMemo(
    () => ({
      type: "FeatureCollection",
      features: bikeNetworks.map((network) => ({
        type: "Feature",
        id: network.id,
        geometry: {
          type: "Point",
          coordinates: [network.location.longitude, network.location.latitude],
        },
        properties: {},
      })),
    }),
    [bikeNetworks],
  );

  useEffect(() => {
    if (!map) return;

    const handleLoad = () => {
      if (!map.getSource(BIKE_NETWORK_POINTS_SOURCE_ID)) {
        map.addSource(BIKE_NETWORK_POINTS_SOURCE_ID, {
          type: "geojson",
          data: bikeNetworkFeatureCollection,
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50,
        });
      }

      if (!map.getLayer(`${BIKE_NETWORK_POINTS_LAYER_ID}-clusters`)) {
        map.addLayer({
          id: `${BIKE_NETWORK_POINTS_LAYER_ID}-clusters`,
          type: "circle",
          source: BIKE_NETWORK_POINTS_SOURCE_ID,
          filter: ["has", "point_count"],
          paint: {
            "circle-radius": [
              "step",
              ["get", "point_count"],
              15,
              10,
              20,
              50,
              25,
            ],
            "circle-color": "#f37b44",
          },
        });
      }

      if (!map.getLayer(`${BIKE_NETWORK_POINTS_LAYER_ID}-cluster-count`)) {
        map.addLayer({
          id: `${BIKE_NETWORK_POINTS_LAYER_ID}-cluster-count`,
          type: "symbol",
          source: BIKE_NETWORK_POINTS_SOURCE_ID,
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 10,
          },
        });
      }

      if (!map.getLayer(BIKE_NETWORK_POINTS_LAYER_ID)) {
        map.addLayer({
          id: BIKE_NETWORK_POINTS_LAYER_ID,
          type: "circle",
          source: BIKE_NETWORK_POINTS_SOURCE_ID,
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": 5,
            "circle-color": "#f37b44",
            "circle-stroke-width": 2,
            "circle-stroke-color": "#f37b44",
            "circle-opacity": 0.7,
          },
        });
      }
    };

    if (map.isStyleLoaded()) {
      handleLoad();
    } else {
      map.once("load", handleLoad);
    }

    return () => {
      if (!map || !map.isStyleLoaded()) return;
      if (map.getLayer(`${BIKE_NETWORK_POINTS_LAYER_ID}-clusters`)) {
        map.removeLayer(`${BIKE_NETWORK_POINTS_LAYER_ID}-clusters`);
      }
      if (map.getLayer(`${BIKE_NETWORK_POINTS_LAYER_ID}-cluster-count`)) {
        map.removeLayer(`${BIKE_NETWORK_POINTS_LAYER_ID}-cluster-count`);
      }
      if (map.getLayer(BIKE_NETWORK_POINTS_LAYER_ID)) {
        map.removeLayer(BIKE_NETWORK_POINTS_LAYER_ID);
      }
      if (map.getSource(BIKE_NETWORK_POINTS_SOURCE_ID)) {
        map.removeSource(BIKE_NETWORK_POINTS_SOURCE_ID);
      }
    };
  }, [map, bikeNetworkFeatureCollection]);

  useEffect(() => {
    if (!map || !map.getSource(BIKE_NETWORK_POINTS_SOURCE_ID)) return;

    const source = map.getSource(
      BIKE_NETWORK_POINTS_SOURCE_ID,
    ) as GeoJSONSource;
    source.setData(bikeNetworkFeatureCollection);
  }, [map, bikeNetworkFeatureCollection]);

  return null;
};
