"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { setupMapboxMap } from "@/components/map/setup-mapbox";
import { ZoomControl, GeolocationControl } from "@/components/map/controls";
import { Map } from "mapbox-gl";
import { BikeNetworks } from "@/types";
import { BikeNetworksLayer } from "@/components/map/layers/bike-networks-layer";

export const BikeNetworksMap = ({
  bikeNetworks,
}: {
  bikeNetworks: BikeNetworks;
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  useEffect(() => {
    if (!mapContainerRef.current || map) return;
    setMap(setupMapboxMap(mapContainerRef));
    return () => {
      if (map) {
        map.remove();
        setMap(null);
      }
    };
  }, [map]);

  return (
    <div className="relative w-full h-full" ref={mapContainerRef}>
      {/* Zoom control. */}
      {map && <ZoomControl map={map} />}
      {/* Geolocation control. */}
      {map && <GeolocationControl map={map} />}
      {/* Bikes Layer */}
      {map && <BikeNetworksLayer bikeNetworks={bikeNetworks} map={map} />}
    </div>
  );
};
