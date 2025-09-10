"use client";

import { Button } from "@/components/Button";
import React, { useState } from "react";
import { QrSetting } from "./QrSetting";
import { LocationSetting } from "./LocationSetting";
import { FormSetting } from "./FormSetting";
import { Group } from "@mantine/core";

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

const DEFAULT_FORM_FIELDS = [
  { field: "이름", required: true },
  { field: "연락처", required: true },
  { field: "소속", required: false },
  { field: "주소", required: false },
  { field: "전공", required: false },
] as const;

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

  const renderTabContent = () => {
    switch (tab) {
      case 0:
        return (
          <QrSetting
            qrRefreshInterval={qrForm.qrRefreshInterval}
            formSubmitLimit={qrForm.formSubmitLimit}
            onChange={onChange}
          />
        );
      case 1:
        return (
          <LocationSetting
            validRadius={qrForm.validRadius}
            onChange={onChange}
          />
        );
      case 2:
        return (
          <FormSetting
            qrFormList={qrForm.qrFormList}
            onDeleteFormField={onDeleteFormField}
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
