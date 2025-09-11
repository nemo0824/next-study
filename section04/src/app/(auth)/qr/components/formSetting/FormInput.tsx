import React from "react";
import { Button } from "@mantine/core";

interface FormName {
  formName: string;
  required?: boolean;
  onDeleteFormField: (fieldName: string) => void;
}

export const FormInput = ({
  formName,
  required = false,
  onDeleteFormField,
}: FormName) => {
  return (
    <div className="bg-white rounded-lg flex justify-between items-center p-3 border-1 border-[#D8D8D8]">
      <div className="flex items-center gap-4">
        <span className="w-14">{formName}</span>
        {required && (
          <div className="bg-red-500 text-white text-xs rounded-sm px-3">
            필수
          </div>
        )}
      </div>
      <Button
        onClick={() => onDeleteFormField(formName)}
        styles={{
          root: {
            background: "transparent",
            color: "red",
          },
        }}
      >
        삭제
      </Button>
    </div>
  );
};
