import React from "react";
import { FormInput } from "./FormInput";

export const FormSelect = ({
  qrFormList,
  onDeleteFormField,
}: {
  qrFormList: { field: string; required: boolean }[];
  onDeleteFormField: (fieldName: string) => void;
}) => {
  return (
    <div className="bg-[#F1F1F1] w-full p-8 rounded-lg">
      <h3 className="font-bold">출석 폼 필드 설정</h3>
      <div className="flex flex-col gap-4">
        {qrFormList.map((formItem) => (
          <FormInput
            formName={formItem.field}
            required={formItem.required}
            key={formItem.field}
            onDeleteFormField={onDeleteFormField}
          />
        ))}
      </div>
    </div>
  );
};
