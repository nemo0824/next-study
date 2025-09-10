import React from "react";
import { FormSelect } from "./formSetting/FormSelect";

export const FormSetting = ({
  qrFormList,
  onDeleteFormField,
}: {
  qrFormList: { field: string; required: boolean }[];
  onDeleteFormField: (fieldName: string) => void;
}) => {
  return (
    <>
      <FormSelect
        qrFormList={qrFormList}
        onDeleteFormField={onDeleteFormField}
      />
    </>
  );
};
