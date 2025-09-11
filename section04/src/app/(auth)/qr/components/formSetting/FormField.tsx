import React from "react";
import { Input } from "@mantine/core";

export const FormField = ({
  field,
  required,
}: {
  field: string;
  required: boolean;
}) => {
  return (
    <Input.Wrapper label={field} required={required}>
      <Input placeholder={`${field}를 입력해주세요.`}></Input>
    </Input.Wrapper>
  );
};
