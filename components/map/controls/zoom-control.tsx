"use client";

import { MAX_ZOOM_LEVEL, MIN_ZOOM_LEVEL } from "@/configs";
import { Map } from "mapbox-gl";
import { Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";

export const ZoomControl = ({ map }: { map: Map }) => {
  const [zoomLevel, setZoomLevel] = useState<number>(map.getZoom());

  useEffect(() => {
    const handleZoom = () => setZoomLevel(map.getZoom());
    map.on("zoom", handleZoom);
    return () => {
      map.off("zoom", handleZoom);
    };
  }, [map]);

  const isZoomInDisabled = zoomLevel >= MAX_ZOOM_LEVEL;
  const isZoomOutDisabled = zoomLevel <= MIN_ZOOM_LEVEL;

  const handleZoomIn = () => {
    if (!isZoomInDisabled) {
      map.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (!isZoomOutDisabled) {
      map.zoomOut();
    }
  };

  return (
    <div className="absolute top-8 right-6 z-10">
      <div className="bg-white rounded-full shadow-md flex flex-col items-center w-8 h-16 p-1">
        <ZoomControlButton
          disabled={isZoomInDisabled}
          onClick={handleZoomIn}
          icon={<Plus className="size-4 " />}
        />
        <ZoomControlButton
          disabled={isZoomOutDisabled}
          onClick={handleZoomOut}
          icon={<Minus className="size-4" />}
        />
      </div>
    </div>
  );
};

const ZoomControlButton = ({
  disabled,
  onClick,
  icon,
}: {
  disabled: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) => {
  return (
    <button
      className={`text-primary w-full flex items-center justify-center h-full ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
    </button>
  );
};
