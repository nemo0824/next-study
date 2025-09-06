"use client";

import React, { useState } from "react";
import { LocationBtn } from "./LocationBtn";
import { LocationView } from "./LocationView";

interface LocationInfo {
  latitude: number;
  longitude: number;
  accuracy: number;
}

export const LocationContainer = () => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  // test
  return (
    <div>
      <LocationBtn onLocationUpdate={setLocationInfo} />
      <LocationView locationInfo={locationInfo} />
    </div>
  );
};
