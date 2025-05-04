import mapboxgl, { LngLatLike, Map } from "mapbox-gl";
import {
  MAPBOX_STYLE,
  MAPBOX_ACCESS_TOKEN,
  STARTING_CENTER,
  STARTING_ZOOM,
} from "@/configs";

/**
 * Setup the Mapbox map.
 * @param containerRef - The reference to the map container.
 * @returns The Mapbox map instance.
 */
mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
export const setupMapboxMap = (
  containerRef: React.RefObject<HTMLDivElement | null>,
): Map => {
  // Check if RTL plugin is needed and set it.
  if (mapboxgl.getRTLTextPluginStatus() === "unavailable") {
    mapboxgl.setRTLTextPlugin(
      "https://unpkg.com/@mapbox/mapbox-gl-rtl-text@0.2.3/mapbox-gl-rtl-text.min.js",
    );
  }

  if (!containerRef.current) {
    throw new Error("Map container reference is not valid.");
  }

  const map = new mapboxgl.Map({
    container: containerRef.current,
    style: MAPBOX_STYLE,
    center: STARTING_CENTER as LngLatLike,
    zoom: STARTING_ZOOM,
    projection: "mercator",
  });

  /**
   * Prevent the map from rotating.
   */
  map.on("rotatestart", () => {
    map.setBearing(0);
  });

  map.on("rotate", () => {
    map.setBearing(0);
  });

  map.on("rotateend", () => {
    map.setBearing(0);
  });

  return map;
};
