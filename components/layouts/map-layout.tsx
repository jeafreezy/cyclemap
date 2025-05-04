"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import { setupMapboxMap } from "@/components/map/setup-mapbox";
import { Map } from "mapbox-gl";
import { MapContext } from "@/contexts";
import { ZoomControl, GeolocationControl } from "@/components/map/controls";

export const MapLayout = ({ children }: { children: React.ReactNode }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || map) return;
    const mapInstance = setupMapboxMap(mapContainerRef);
    setMap(mapInstance);
    return () => {
      mapInstance.remove();
      setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MapContext.Provider value={map}>
      <section className="relative w-full h-full" ref={mapContainerRef}>
        {map && (
          <>
            <ZoomControl />
            <GeolocationControl />
            {children}
          </>
        )}
      </section>
    </MapContext.Provider>
  );
};
