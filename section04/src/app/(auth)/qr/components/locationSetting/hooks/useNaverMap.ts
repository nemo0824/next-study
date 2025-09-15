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
    let isMounted = true; // cleanup 시 비동기 작업 취소용

    // 이미 로드된 스크립트가 있는지 확인
    const existingScript = document.querySelector(
      'script[src*="oapi.map.naver.com"]'
    );
    if (existingScript) {
      console.log("네이버 지도 스크립트 이미 로드됨");
      return;
    }

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
      if (!isMounted) return; // 컴포넌트가 언마운트되었으면 중단

      // 스크립트 로드 완료 후 잠시 대기
      setTimeout(async () => {
        if (!isMounted) return; // 다시 한 번 확인

        // IP 기반 위치 정보 가져오기
        const ipLocation = await getIPLocation();
        console.log("IP 위치:", ipLocation);

        if (!isMounted) return; // 비동기 작업 후 확인

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

    script.onerror = () => {
      console.log("네이버 지도 스크립트 로드 실패");
    };

    document.head.appendChild(script);

    return () => {
      isMounted = false; // 비동기 작업 취소
      try {
        const scriptToRemove = document.querySelector(
          'script[src*="oapi.map.naver.com"]'
        );
        if (scriptToRemove && scriptToRemove.parentNode) {
          scriptToRemove.parentNode.removeChild(scriptToRemove);
        }
      } catch (error) {
        console.log("스크립트 제거 중 오류:", error);
      }
    };
  }, []);

  return { mapRef, coordinates, setCoordinates };
};
