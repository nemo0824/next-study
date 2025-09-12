import React from "react";
import { ValidDistance } from "./validDistance";
import { LectureQrForm } from "../QrContainer";
import { Button } from "@/components/Button";
import { Flex } from "@mantine/core";
import { Map } from "./Map";

interface LocationSettingProps {
  validRadius: number;
  onChange: (
    lecture: Partial<
      Pick<
        LectureQrForm,
        "qrRefreshInterval" | "formSubmitLimit" | "validRadius"
      >
    >
  ) => void;
  onClickNext: () => void;
  onClickPrev: () => void;
}

export const LocationSetting = ({
  validRadius,
  onChange,
  onClickNext,
  onClickPrev,
}: LocationSettingProps) => {
  return (
    <>
      <ValidDistance validRadius={validRadius} onChange={onChange} />
      <Map />
      <Flex
        className="mt-4 gap-4
      "
      >
        <Button onClick={onClickPrev}>이전</Button>
        <Button
          onClick={onClickNext}
          styles={{
            root: {
              background: "#1251D4",
              color: "white",
            },
          }}
        >
          다음
        </Button>
      </Flex>
    </>
  );
};
