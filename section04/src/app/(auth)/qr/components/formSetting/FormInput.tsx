import React from "react";
import { Button, Chip } from "@mantine/core";

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
    <div className="bg-white rounded-lg flex justify-between">
      <span>{formName}</span>
      {required && (
        <Chip color="red" variant="filled" defaultChecked>
          필수
        </Chip>
      )}
      <Button onClick={() => onDeleteFormField(formName)}>삭제</Button>
    </div>
  );
};
