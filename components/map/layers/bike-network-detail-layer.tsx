"use client";

import {
  BIKE_NETWORK_STATIONS_LAYER_ID,
  BIKE_NETWORK_STATIONS_SOURCE_ID,
  GEOLOCATION_ZOOM_LEVEL,
} from "@/configs";
import { useMap } from "@/context";
import { Station } from "@/types";
import { GeoJSONSource, LngLatBoundsLike } from "mapbox-gl";
import { useEffect, useMemo } from "react";
import bbox from "@turf/bbox";
import { AllGeoJSON } from "@turf/helpers";
export const BikeNetworkDetailLayer = ({
  stations,
}: {
  stations: Station[];
}) => {
  const map = useMap();
  const bikeNetworkStationsFeatureCollection: AllGeoJSON = useMemo(
    () => ({
      type: "FeatureCollection",
      features: stations.map((station) => ({
        type: "Feature",
        id: station.id,
        geometry: {
          type: "Point",
          coordinates: [station.longitude, station.latitude],
        },
        properties: {},
      })),
    }),
    [stations],
  );

  useEffect(() => {
    if (!map) return;

    const handleLoad = () => {
      if (!map.getSource(BIKE_NETWORK_STATIONS_SOURCE_ID)) {
        map.addSource(BIKE_NETWORK_STATIONS_SOURCE_ID, {
          type: "geojson",
          data: bikeNetworkStationsFeatureCollection,
        });
      }

      if (!map.getLayer(BIKE_NETWORK_STATIONS_LAYER_ID)) {
        map.addLayer({
          id: BIKE_NETWORK_STATIONS_LAYER_ID,
          type: "circle",
          source: BIKE_NETWORK_STATIONS_SOURCE_ID,
          paint: {
            "circle-radius": 7,
            "circle-color": "#f37b44",
          },
        });
      }

      const bounds = bbox(bikeNetworkStationsFeatureCollection);
      map.fitBounds(bounds as LngLatBoundsLike, {
        padding: 20,
        maxZoom: GEOLOCATION_ZOOM_LEVEL,
      });
    };

    if (map.isStyleLoaded()) {
      handleLoad();
    } else {
      map.once("load", handleLoad);
    }

    return () => {
      if (!map || !map.isStyleLoaded()) return;
      if (map.getLayer(BIKE_NETWORK_STATIONS_LAYER_ID)) {
        map.removeLayer(BIKE_NETWORK_STATIONS_LAYER_ID);
      }
      if (map.getSource(BIKE_NETWORK_STATIONS_SOURCE_ID)) {
        map.removeSource(BIKE_NETWORK_STATIONS_SOURCE_ID);
      }
    };
  }, [map, bikeNetworkStationsFeatureCollection]);

  useEffect(() => {
    if (!map || !map.getSource(BIKE_NETWORK_STATIONS_SOURCE_ID)) return;

    const source = map.getSource(
      BIKE_NETWORK_STATIONS_SOURCE_ID,
    ) as GeoJSONSource;
    source.setData(bikeNetworkStationsFeatureCollection);
  }, [map, bikeNetworkStationsFeatureCollection]);

  return null;
};
