"use client";

import {
  BIKE_NETWORK_STATIONS_LAYER_ID,
  BIKE_NETWORK_STATIONS_SOURCE_ID,
  BIKE_NETWORK_STATIONS_ZOOM_LEVEL,
} from "@/configs";
import { useMap } from "@/contexts";
import { Station } from "@/types";
import {
  GeoJSONSource,
  LngLatBoundsLike,
  MapMouseEvent,
  Popup,
} from "mapbox-gl";
import { useEffect, useMemo, useRef } from "react";
import bbox from "@turf/bbox";
import { AllGeoJSON } from "@turf/helpers";
import { createRoot } from "react-dom/client";
import { BikeStationTooltip } from "@/components/map/station-tooltip";

export const BikeNetworkDetailLayer = ({
  stations,
}: {
  stations: Station[];
}) => {
  const map = useMap();
  const popupRef = useRef<HTMLDivElement | null>(null);
  const popupRoot = useRef<ReturnType<typeof createRoot> | null>(null);

  const featureCollection: AllGeoJSON = useMemo(
    () => ({
      type: "FeatureCollection",
      features: stations.map((station) => ({
        type: "Feature",
        id: station.id,
        geometry: {
          type: "Point",
          coordinates: [station.longitude, station.latitude],
        },
        properties: {
          ...station,
        },
      })),
    }),
    [stations],
  );

  useEffect(() => {
    if (!map) return;

    /**
     *  Setup the popup container and root.
     *  This is used to render the tooltip component inside the popup.
     */
    const popupContainer = document.createElement("div");
    popupRef.current = popupContainer;
    popupRoot.current = createRoot(popupContainer);
    const popup = new Popup({ closeButton: false }).setDOMContent(
      popupContainer,
    );

    const handleLoad = () => {
      if (!map.getSource(BIKE_NETWORK_STATIONS_SOURCE_ID)) {
        map.addSource(BIKE_NETWORK_STATIONS_SOURCE_ID, {
          type: "geojson",
          data: featureCollection,
        });
      }

      if (!map.getLayer(BIKE_NETWORK_STATIONS_LAYER_ID)) {
        map.addLayer({
          id: BIKE_NETWORK_STATIONS_LAYER_ID,
          type: "circle",
          source: BIKE_NETWORK_STATIONS_SOURCE_ID,
          paint: {
            "circle-radius": 7,
            "circle-color": "#f37b44", // --grenadier-400
          },
        });
      }

      const bounds = bbox(featureCollection);
      map.fitBounds(bounds as LngLatBoundsLike, {
        padding: 20,
        maxZoom: BIKE_NETWORK_STATIONS_ZOOM_LEVEL,
      });
    };

    /**
     * Add a hover effect to the bike network stations.
     */
    map.on("mouseenter", BIKE_NETWORK_STATIONS_LAYER_ID, () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", BIKE_NETWORK_STATIONS_LAYER_ID, () => {
      map.getCanvas().style.cursor = "";
    });

    /**
     * Show the popup when the user clicks on a station.
     */
    const handlePopupClick = (e: MapMouseEvent) => {
      const features = map.queryRenderedFeatures(e.point, {
        layers: [BIKE_NETWORK_STATIONS_LAYER_ID],
      });

      if (features.length && popupRef.current && popupRoot.current) {
        const feature = features[0];
        const station = feature.properties as Station;
        if (station.latitude && station.longitude) {
          popup.setLngLat([station.longitude, station.latitude]).addTo(map);
          popupRoot.current.render(
            <BikeStationTooltip
              name={station.name}
              freeBikes={station.free_bikes}
              emptySlots={station.empty_slots}
            />,
          );
        }
      }
    };

    map.on("click", BIKE_NETWORK_STATIONS_LAYER_ID, handlePopupClick);

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
      popup.remove();
      if (popupRef.current) {
        popupRef.current.remove();
      }
      map.off("click", BIKE_NETWORK_STATIONS_LAYER_ID, handlePopupClick);
    };
  }, [map, featureCollection]);

  useEffect(() => {
    if (!map || !map.getSource(BIKE_NETWORK_STATIONS_SOURCE_ID)) return;
    const source = map.getSource(
      BIKE_NETWORK_STATIONS_SOURCE_ID,
    ) as GeoJSONSource;
    source.setData(featureCollection);
  }, [map, featureCollection]);

  return null;
};
