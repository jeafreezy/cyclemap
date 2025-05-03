/**
 * Mapbox access token for the map.
 */
export const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

/**
 * Mapbox style URL.
 */
export const MAPBOX_STYLE = "mapbox://styles/mapbox/light-v10";

/**
 * The starting zoom level for the map.
 */
export const STARTING_ZOOM = 2;
/**
 * The maximum zoom level for the map.
 */
export const MAX_ZOOM_LEVEL = 22;

/**
 * The zoom level for geolocation.
 */
export const GEOLOCATION_ZOOM_LEVEL = 14;
/**
 * The minimum zoom level for the map.
 */
export const MIN_ZOOM_LEVEL = 2;
/**
 * The starting center coordinates for the map.
 */
export const STARTING_CENTER = [0, 0];

/**
 * The source ID for the bike network points.
 */
export const BIKE_NETWORK_POINTS_SOURCE_ID = "bike-network-points";

/**
 * The source ID for the bike network points layer.
 */
export const BIKE_NETWORK_POINTS_LAYER_ID = "bike-network-points-layer";

/**
 * The source ID for the bike network stations points.
 */
export const BIKE_NETWORK_STATIONS_SOURCE_ID = "bike-network-stations";

/**
 * The source ID for the bike network stations points layer.
 */
export const BIKE_NETWORK_STATIONS_LAYER_ID = "bike-network-stations-layer";

export const SEARCH_PARAMS_KEYS = {
  COUNTRY: "country",
  SEARCH: "search",
  PAGE: "page",
};

/**
 * The maximum number of bike networks to display on the sizebar.
 */
export const BIKE_NETWORKS_PAGE_SIZE = 10;

/**
 * The application routes.
 */
export const APPLICATION_ROUTES = {
  NETWORK_DETAILS: (id: string) => `/network/${id}`,
};
