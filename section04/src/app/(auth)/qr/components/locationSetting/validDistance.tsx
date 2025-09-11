import React from "react";
import { Slider } from "@mantine/core";
import { LectureQrForm } from "../QrContainer";

interface ValidDistanceProps {
  validRadius: number;
  onChange: (
    lecture: Partial<
      Pick<
        LectureQrForm,
        "qrRefreshInterval" | "formSubmitLimit" | "validRadius"
      >
    >
  ) => void;
}

export const ValidDistance = ({
  validRadius,
  onChange,
}: ValidDistanceProps) => {
  const handleSliderChange = (newValue: number) => {
    onChange({ validRadius: newValue });
  };

  return (
    <div className="bg-[#F1F1F1] w-full p-8 rounded-lg border-1 border-[#D8D8D8]">
      <h3 className="my-4 font-bold">유효 반경 설정</h3>
      <span className="my-4 font-bold text-[#1251D4]">{validRadius}</span>
      <span>m</span>
      <Slider
        value={validRadius}
        onChange={handleSliderChange}
        min={0}
        max={300}
        step={1}
        label={(value) => `${value}m`}
        marks={[
          { value: 0, label: "0m" },
          { value: 100, label: "100m" },
          { value: 200, label: "200m" },
          { value: 300, label: "300m" },
        ]}
        styles={{
          track: {
            backgroundColor: "#D8D8D8",
          },
          bar: {
            backgroundColor: "#1251D4",
          },
        }}
      />
      <p className="mt-8 text-[#666666]">강의실 중심에서 출석 인정 범위</p>
    </div>
  );
};
