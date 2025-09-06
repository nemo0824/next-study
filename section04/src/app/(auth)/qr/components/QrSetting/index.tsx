import React from "react";
import { QrFormTime } from "./QrFormTime";
import { LectureQrForm } from "../QrContainer";

interface QrSetting {
  qrRefreshInterval: number;
  formSubmitLimit: number;
  onChange: (
    lecture: Partial<
      Pick<
        LectureQrForm,
        "qrRefreshInterval" | "formSubmitLimit" | "validRadius"
      >
    >
  ) => void;
}

export const QrSetting = ({
  qrRefreshInterval,
  formSubmitLimit,
  onChange,
}: QrSetting) => {
  const QR_UPDATE_TIMES = [30, 60, 90];
  const FORM_VALID_TIME = [3, 5, 10];

  return (
    <div className="flex gap-4 mt-10">
      <QrFormTime
        selectTime={qrRefreshInterval}
        onChange={onChange}
        fieldName="qrRefreshInterval"
        title="Qr코드 갱신 주기"
        times={QR_UPDATE_TIMES}
        timeUnit="초"
        description="권장: 30 ~ 60초 (보안성과 사용성의 균형)"
      />
      <QrFormTime
        selectTime={formSubmitLimit}
        onChange={onChange}
        fieldName="formSubmitLimit"
        title="인증 후 폼 작성 시간"
        times={FORM_VALID_TIME}
        timeUnit="분"
        description="QR 인증 후 출석 폼 작성 가능 시간"
      />
    </div>
  );
};
