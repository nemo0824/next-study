import { useState } from "react";

type SetCoordinatesType = (coords: { lat: number; lng: number }) => void;

export const useGeocoding = (
  mapRef: React.RefObject<naver.maps.Map | null>,
  markerRef: React.RefObject<naver.maps.Marker | null>,
  setCoordinates: SetCoordinatesType
) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchAddress = (query: string) => {
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
        if (status !== naver.maps.Service.Status.OK) {
          return alert("검색실패");
        }

        const addresses = response.v2.addresses;

        if (addresses && addresses.length > 0) {
          const address = addresses[0];
          const lat = parseFloat(address.y);
          const lng = parseFloat(address.x);

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

  return {
    searchQuery,
    setSearchQuery,
    searchAddress,
  };
};
