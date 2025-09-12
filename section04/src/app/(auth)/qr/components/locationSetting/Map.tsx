import { Button } from "@/components/Button";
import { Input } from "@mantine/core";
import { Flex } from "@mantine/core";
import React from "react";
import { useNaverMap } from "./hooks/useNaverMap";
import { useMapMarker } from "./hooks/useMapMarker";
import { useGeocoding } from "./hooks/useGeocoding";

export const Map = () => {
  const { mapRef, coordinates, setCoordinates } = useNaverMap();
  const { markerRef } = useMapMarker();
  const { searchQuery, setSearchQuery, searchAddress } = useGeocoding(
    mapRef,
    markerRef,
    setCoordinates
  );

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
      <span>
        위도: {coordinates?.lat} / 경도: {coordinates?.lng}
      </span>
    </section>
  );
};
