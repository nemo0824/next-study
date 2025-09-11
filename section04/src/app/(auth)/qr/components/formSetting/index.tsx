import React from "react";
import { FormSelect } from "./FormSelect";
import { FormPreview } from "./FormPreview";
import { Flex } from "@mantine/core";

export const FormSetting = ({
  qrFormList,
  onDeleteFormField,
}: {
  qrFormList: { field: string; required: boolean }[];
  onDeleteFormField: (fieldName: string) => void;
}) => {
  return (
    <Flex gap={16}>
      <FormSelect
        qrFormList={qrFormList}
        onDeleteFormField={onDeleteFormField}
      />
      <FormPreview qrFormList={qrFormList} />
    </Flex>
  );
};
