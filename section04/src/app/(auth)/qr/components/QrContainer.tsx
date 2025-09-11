"use client";

import { Button } from "@/components/Button";
import React, { useState } from "react";
import { QrSetting } from "./QrSetting";
import { LocationSetting } from "./locationSetting";
import { FormSetting } from "./formSetting";
import { Group } from "@mantine/core";
import { DEFAULT_FORM_FIELDS } from "@/constants/qr";

export interface LectureQrForm {
  qrRefreshInterval: number;
  formSubmitLimit: number;
  validRadius: number;
  lectureLocation: {
    latitude: number;
    longitude: number;
  };
  qrFormList: { field: string; required: boolean }[];
}

export const QrContainer = () => {
  const [tab, setTab] = useState(0);
  const tabsName = ["Qr설정", "위치설정", "폼 설정"];
  const [qrForm, setQrForm] = useState<LectureQrForm>({
    qrRefreshInterval: 30,
    formSubmitLimit: 3,
    validRadius: 100,
    lectureLocation: {
      latitude: 37.5665,
      longitude: 126.978,
    },
    qrFormList: [...DEFAULT_FORM_FIELDS],
  });

  const onClickTab = (index: number) => {
    setTab(index);
  };

  const onDeleteFormField = (fieldName: string) => {
    if (fieldName === "이름" || fieldName === "연락처") {
      alert("이름, 연락처 항목은 삭제가 불가능합니다.");
      return;
    }
    const newFormField = qrForm.qrFormList.filter(
      (form) => form.field !== fieldName
    );
    setQrForm((prev) => ({ ...prev, qrFormList: newFormField }));
  };

  const onChange = (
    lectureElment: Partial<
      Pick<
        LectureQrForm,
        "qrRefreshInterval" | "formSubmitLimit" | "validRadius"
      >
    >
  ) => {
    setQrForm((prev) => ({ ...prev, ...lectureElment }));
  };

  const onClickNext = () => {
    setTab((prev) => prev + 1);
  };
  const onClickPrev = () => {
    setTab((prev) => prev - 1);
  };

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return (
          <QrSetting
            qrRefreshInterval={qrForm.qrRefreshInterval}
            formSubmitLimit={qrForm.formSubmitLimit}
            onChange={onChange}
            onClickNext={onClickNext}
          />
        );
      case 1:
        return (
          <LocationSetting
            validRadius={qrForm.validRadius}
            onChange={onChange}
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
          />
        );
      case 2:
        return (
          <FormSetting
            qrFormList={qrForm.qrFormList}
            onDeleteFormField={onDeleteFormField}
            onClickPrev={onClickPrev}
          />
        );
    }
  };

  return (
    <>
      <Group justify="space-between">
        {tabsName.map((tabName, index) => {
          const isSelected = tab === index;
          return (
            <Button
              size="md"
              onClick={() => onClickTab(index)}
              key={index}
              styles={{
                root: {
                  backgroundColor: isSelected ? "#1251D4" : "#F1F1F1",
                  color: isSelected ? "white" : "black",
                  border: "1px solid #ddd",
                },
              }}
            >
              {tabName}
            </Button>
          );
        })}
      </Group>

      <div className="mt-4">{renderTabContent()}</div>
    </>
  );
};
