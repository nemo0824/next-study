import React from "react";
import { ValidDistance } from "./validDistance";
import { LectureQrForm } from "../QrContainer";

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
}

export const LocationSetting = ({
  validRadius,
  onChange,
}: LocationSettingProps) => {
  return (
    <div>
      <ValidDistance validRadius={validRadius} onChange={onChange} />
    </div>
  );
};
