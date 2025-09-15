import React from "react";
import { DEFAULT_FORM_FIELDS } from "@/constants/qr";
import { FormField } from "@/app/(auth)/qr/components/formSetting/FormField";
import { Flex } from "@mantine/core";
import { PersonalInfoAgree } from "./PersonalInfoAgree";
import { Button } from "@/components/Button";

export default function QrForm() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 bg-white p-4 rounded-lg mt-4 border-1 border-[#D8D8D8]">
        <h3 className="font-bold mb-8">출석 정보 입력</h3>
        <Flex gap={12} direction={"column"} mt={8}>
          {/* 기관이 설정한 Field관련된것들 반영해서 RHF 예정 */}
          {DEFAULT_FORM_FIELDS.map((field) => (
            <FormField
              key={field.field}
              field={field.field}
              required={field.required}
            />
          ))}
          {/* 동의 여부 checkbox RHF으로 반영 */}
          <PersonalInfoAgree />
          {/* 나중에 Button 유효성관련된것 RHF 도입예정 */}
          <Button>출석완료</Button>
        </Flex>
      </div>
    </div>
  );
}
