import { Button } from "@/components/Button";
import { Input } from "@mantine/core";
import { Flex } from "@mantine/core";
import React, { useState, useRef, useEffect } from "react";

export const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [coordinates, setCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const mapRef = useRef<naver.maps.Map | null>(null);
  const markerRef = useRef<naver.maps.Marker | null>(null);

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

  const searchAddress = (query: string) => {
    console.log("검색 시작:", query);

    if (!window.naver || !mapRef.current) {
      alert("지도가 로드되지 않았습니다.");
      return;
    }

    if (!window.naver.maps.Service || !window.naver.maps.Service.geocode) {
      alert("Geocoding 서비스가 로드되지 않았습니다.");
      return;
    }

    window.naver.maps.Service.geocode(
      {
        query,
      },
      function (
        status: naver.maps.Service.Status,
        response: naver.maps.Service.GeocodeResponse
      ) {
        console.log("응답 받음:", status, response);

        if (status !== naver.maps.Service.Status.OK) {
          console.log("에러 상태:", status);
          return alert("검색실패");
        }

        const addresses = response.v2.addresses;
        console.log("응답 결과:", addresses);

        if (addresses && addresses.length > 0) {
          const address = addresses[0];
          const lat = parseFloat(address.y);
          const lng = parseFloat(address.x);

          console.log("좌표:", lat, lng);

          // 좌표를 상태에 저장
          setCoordinates({ lat, lng });

          const newCenter = new window.naver.maps.LatLng(lat, lng);
          mapRef.current!.setCenter(newCenter);
          mapRef.current!.setZoom(15);

          // 기존 마커 제거
          if (markerRef.current) {
            markerRef.current.setMap(null);
          }

          const marker = new window.naver.maps.Marker({
            position: newCenter,
            map: mapRef.current!,
            title: query,
            clickable: true,
            draggable: true,
            animation: naver.maps.Animation.DROP,
          });

          // 새 마커를 ref에 저장
          markerRef.current = marker;

          // 마커 드래그 끝날 때 이벤트
          naver.maps.Event.addListener(marker, "dragend", function () {
            const newPosition = marker.getPosition();
            const lat = newPosition.y;
            const lng = newPosition.x;

            // 드래그로 변경된 좌표를 상태에 저장
            setCoordinates({ lat, lng });
          });

          alert("검색 완료!");
        } else {
          alert("검색 결과가 없습니다.");
        }
      }
    );
  };

  return (
    <section role="application" aria-label="네이버 지도">
      <div
        id="map"
        style={{
          width: "100%",
          height: "400px",
          position: "relative",
          marginTop: "16px",
        }}
      >
        <div
          style={{
            marginBottom: "10px",
            position: "absolute",
            top: "5px",
            left: "5px",
            zIndex: "50",
          }}
        >
          <Flex gap={4}>
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색할 주소를 행정구역으로 입력하세요."
              w={300}
            />
            <Button
              onClick={() => searchQuery && searchAddress(searchQuery)}
              styles={{
                root: {
                  background: "#1251D4",
                  color: "white",
                },
              }}
            >
              검색
            </Button>
          </Flex>
        </div>
      </div>
    </section>
  );
};
