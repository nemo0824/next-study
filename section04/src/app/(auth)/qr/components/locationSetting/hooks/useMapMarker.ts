import { useRef } from "react";

export const useMapMarker = () => {
  const markerRef = useRef<naver.maps.Marker | null>(null);

  return {
    markerRef,
  };
};
