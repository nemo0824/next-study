import React from "react";
import { LocationContent } from "./LocationContent";

interface LocOption {
  mode: "permission" | "error";
  // 화면전환 관련 작성 필요
  handleLocationSuccess: (locationInfo: "성공" | "실패") => void;
}

export const LocOption = ({ mode, handleLocationSuccess }: LocOption) => {
  const onClickLocation = () => {
    if (!("geolocation" in navigator)) {
      console.log("이 브라우저는 Geolocation을 지원하지 않습니다.");
    } else {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          const locationInfo = { latitude, longitude, accuracy };
          console.log(locationInfo, "locationInfo");
          // locationInfo 저장하는 로직 작성 필요 .. 성공 또는 실패로
          handleLocationSuccess("성공");
        },
        (err) => {
          console.log("에러", err.code, err.message);
        },
        { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 }
      );
    }
  };
  return <LocationContent mode={mode} onClickLocation={onClickLocation} />;
};
