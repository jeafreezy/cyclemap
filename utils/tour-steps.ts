/**
 * The IDs for the elements that will be used in the guided tour.
 */
export const TOUR_IDS = {
  SEARCH_INPUT: "search-input",
  COUNTRY_FILTER: "country-filter",
  ZOOM_CONTROL: "zoom-control",
  NEAR_ME: "near-me",
  PAGINATION: "pagination",
  BIKE_NETWORK: "bike-network",
  TABLE_SORTER: "table-sorter",
  MAP: "popup",
  STATIONS_PAGINATOR: "stations-paginator",
  TOUR_STARTER: "tour-starter",
};

/**
 *  The steps for the guided tour of the home page.
 */
export const HOME_TOUR_STEPS = [
  {
    selector: `#${TOUR_IDS.SEARCH_INPUT}`,
    content:
      "Search for a bike network by network name or operating companies.",
  },
  {
    selector: `#${TOUR_IDS.COUNTRY_FILTER}`,
    content: "Filter the map and list by country.",
  },
  {
    selector: `#${TOUR_IDS.BIKE_NETWORK}`,
    content: "Click on a bike network to see more details.",
  },
  {
    selector: `#${TOUR_IDS.PAGINATION}`,
    content: "Navigate through the list of bike networks.",
  },
  {
    selector: `#${TOUR_IDS.NEAR_ME}`,
    content: "Discover bike networks near you.",
  },
  {
    selector: `#${TOUR_IDS.ZOOM_CONTROL}`,
    content: "Control the zoom level of the map.",
  },
  {
    selector: `#${TOUR_IDS.TOUR_STARTER}`,
    content: "Click here to restart the guided tour.",
  },
];

/**
 * The steps for the guided tour of the bike network details page.
 */
export const DETAIL_TOUR_STEPS = [
  {
    selector: `#${TOUR_IDS.TABLE_SORTER}`,
    content: "Sort stations by availability.",
  },
  {
    selector: `#${TOUR_IDS.STATIONS_PAGINATOR}`,
    content: "Navigate through station pages.",
  },
  {
    selector: `#${TOUR_IDS.MAP}`,
    content:
      "Click on each point on the map to see the availability in a tooltip.",
  },
];
