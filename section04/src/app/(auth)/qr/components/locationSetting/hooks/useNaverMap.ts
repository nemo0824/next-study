import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

export const useNaverMap = () => {
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const mapRef = useRef<naver.maps.Map | null>(null);

  useEffect(() => {
    // IP 기반 위치 정보 가져오기
    const getIPLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        return {
          lat: data.latitude || 37.3595704,
          lng: data.longitude || 127.105399,
          city: data.city || "서울",
        };
      } catch (error) {
        console.log("IP 위치 정보 가져오기 실패:", error);
        // 서울시청 기본값
        return {
          lat: 37.3595704,
          lng: 127.105399,
          city: "서울",
        };
      }
    };

    const script = document.createElement("script");
    script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&submodules=geocoder`;
    script.async = true;

    script.onload = async () => {
      // 스크립트 로드 완료 후 잠시 대기
      setTimeout(async () => {
        // IP 기반 위치 정보 가져오기
        const ipLocation = await getIPLocation();
        console.log("IP 위치:", ipLocation);

        const map = new window.naver.maps.Map("map", {
          center: new window.naver.maps.LatLng(ipLocation.lat, ipLocation.lng),
          zoom: 14,
          zoomControl: true,
          zoomControlOptions: {
            style: naver.maps.ZoomControlStyle.SMALL,
            position: naver.maps.Position.RIGHT_BOTTOM,
          },
          scaleControl: false,
          logoControl: true,
          logoControlOptions: {
            position: naver.maps.Position.BOTTOM_LEFT,
          },
        });
        mapRef.current = map;

        // IP 기반 초기 좌표를 상태에 저장
        setCoordinates({ lat: ipLocation.lat, lng: ipLocation.lng });
      }, 100);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return { mapRef, coordinates, setCoordinates };
};
