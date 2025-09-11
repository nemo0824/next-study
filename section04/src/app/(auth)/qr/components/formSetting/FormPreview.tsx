import React from "react";
import { FormField } from "./FormField";
import { Flex } from "@mantine/core";
import { Button } from "@/components/Button";

export const FormPreview = ({
  qrFormList,
}: {
  qrFormList: { field: string; required: boolean }[];
}) => {
  return (
    <div className="bg-[#F1F1F1] w-1/2 p-8 rounded-lg">
      <h3 className="font-bold">폼 미리보기</h3>
      <div className="bg-white p-4 rounded-lg mt-4">
        <h3 className="font-bold">출석 확인</h3>
        <Flex gap={8} direction={"column"} mt={8}>
          {qrFormList.map((form, index) => (
            <FormField
              key={index}
              field={form.field}
              required={form.required}
            />
          ))}
        </Flex>
        <Button
          styles={{
            root: {
              width: "100%",
              marginTop: "16px",
              background: "#1251D4",
              color: "white",
            },
          }}
        >
          제출하기
        </Button>
      </div>
    </div>
  );
};
