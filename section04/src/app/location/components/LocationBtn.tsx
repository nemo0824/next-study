"use client";
import React from "react";

interface LocationInfo {
  latitude: number;
  longitude: number;
  accuracy: number;
}

interface LocationBtnProps {
  onLocationUpdate: (location: LocationInfo) => void;
}

export const LocationBtn = ({ onLocationUpdate }: LocationBtnProps) => {
  const locationSearch = () => {
    if (!("geolocation" in navigator)) {
      console.log("이 브라우저는 Geolocation을 지원하지 않습니다.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          const locationInfo = { latitude, longitude, accuracy };
          onLocationUpdate(locationInfo);
          console.log("성공", {
            latitude,
            longitude,
            accuracy,
            ts: new Date(pos.timestamp).toISOString(),
          });
        },
        (err) => {
          // 1: PERMISSION_DENIED, 2: POSITION_UNAVAILABLE, 3: TIMEOUT
          console.log("에러", err.code, err.message);
        },
        { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 }
      );
    }
  };

  return <button onClick={locationSearch}>현재 유저의 위치 버튼</button>;
};
