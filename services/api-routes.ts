export const API_BASE_URL = "https://api.citybik.es/v2";

export const API_ROUTES = {
  GET_BIKE_NETWORKS: `${API_BASE_URL}/networks`,
  GET_BIKE_NETWORK_BY_ID: (id: string) => `${API_BASE_URL}/networks/${id}`,
};
