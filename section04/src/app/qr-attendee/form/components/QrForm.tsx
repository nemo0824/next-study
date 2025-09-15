import React from "react";
import { DEFAULT_FORM_FIELDS } from "@/constants/qr";
import { FormField } from "@/app/(auth)/qr/components/formSetting/FormField";
import { Flex } from "@mantine/core";
import { PersonalInfoAgree } from "./PersonalInfoAgree";

export default function QrForm() {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 bg-white p-4 rounded-lg mt-4 border-1 border-[#D8D8D8]">
        <h3 className="font-bold">출석 확인</h3>
        <Flex gap={8} direction={"column"} mt={8}>
          {DEFAULT_FORM_FIELDS.map((field) => (
            <FormField
              key={field.field}
              field={field.field}
              required={field.required}
            />
          ))}
          <PersonalInfoAgree />
        </Flex>
      </div>
    </div>
  );
}
