import React, { useState } from "react";
import { Button } from "@/components/Button";
import { Checkbox } from "@mantine/core";

export const FormModalField = ({
  form,
}: {
  form: { field: string; required: boolean | null };
}) => {
  const [selectedType, setSelectedType] = useState<
    null | "required" | "optional"
  >(null);

  const handleTypeClick = (type: "required" | "optional") => {
    setSelectedType(selectedType === type ? null : type);
  };
  return (
    <div className="bg-white flex items-center border border-[#D8D8D8] p-2 rounded-md">
      <p
        className="border border-[#D8D8D8] rounded-md p-2 w-3/4"
        key={form.field}
      >
        {form.field}
      </p>
      <div className="flex gap-4 ml-4 items-center">
        <Button
          onClick={() => handleTypeClick("required")}
          styles={{
            root: {
              background: selectedType === "required" ? "#1251D4" : "#F1F1F1",
              color: selectedType === "required" ? "white" : "black",
            },
          }}
        >
          필수
        </Button>
        <Button
          onClick={() => handleTypeClick("optional")}
          styles={{
            root: {
              background: selectedType === "optional" ? "#1251D4" : "#F1F1F1",
              color: selectedType === "optional" ? "white" : "black",
            },
          }}
        >
          선택
        </Button>
        <Checkbox />
      </div>
    </div>
  );
};
