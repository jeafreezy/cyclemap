export type BikeNetworkLocation = {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
};
export type BikeNetwork = {
  id: string;
  name: string;
  company: string[];
  href: string;
  location: BikeNetworkLocation;
  system?: string;
  source?: string;
  gbfs_href?: string;
};
export type BikeNetworks = BikeNetwork[];

export type StationExtra = {
  uid: number;
  normal_bikes: number;
  ebikes: number;
  slots: number;
  online: boolean;
};

export type Station = {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  free_bikes: number;
  empty_slots: number;
  extra: StationExtra;
};

export type BikeNetworkDetail = {
  id: string;
  name: string;
  location: BikeNetworkLocation;
  href: string;
  company: string[];
  system?: string;
  stations: Station[];
};
