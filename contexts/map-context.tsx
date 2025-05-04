"use client";

import { Map } from "mapbox-gl";
import { createContext, useContext } from "react";

export const MapContext = createContext<Map | null>(null);

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a <MapProvider />");
  }
  return context;
};
