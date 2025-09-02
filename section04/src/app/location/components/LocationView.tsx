import React from "react";

interface LocationInfo {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface LocationViewProps {
  locationInfo: LocationInfo | null;
}

export const LocationView = ({ locationInfo }: LocationViewProps) => {
  if (!locationInfo) return null;

  return (
    <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc" }}>
      <h3>위치 정보:</h3>
      <p>위도: {locationInfo.latitude}</p>
      <p>경도: {locationInfo.longitude}</p>
      <p>정확도: {locationInfo.accuracy}m</p>
    </div>
  );
};