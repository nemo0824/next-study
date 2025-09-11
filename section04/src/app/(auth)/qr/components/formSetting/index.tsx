import React from "react";
import { FormSelect } from "./FormSelect";
import { FormPreview } from "./FormPreview";
import { Flex } from "@mantine/core";
import { Button } from "@/components/Button";

export const FormSetting = ({
  qrFormList,
  onDeleteFormField,
  onClickPrev,
}: {
  qrFormList: { field: string; required: boolean }[];
  onDeleteFormField: (fieldName: string) => void;
  onClickPrev: () => void;
}) => {
  return (
    <>
      <Flex gap={16}>
        <FormSelect
          qrFormList={qrFormList}
          onDeleteFormField={onDeleteFormField}
        />
        <FormPreview qrFormList={qrFormList} />
      </Flex>
      <Flex className="mt-4 gap-4">
        <Button onClick={onClickPrev}>이전</Button>
        <Button
          styles={{
            root: {
              background: "#1251D4",
              color: "white",
            },
          }}
        >
          저장
        </Button>
      </Flex>
    </>
  );
};
