import React from "react";
import { FormInput } from "./FormInput";
import { Button } from "@/components/Button";
import { IconPlus } from "@tabler/icons-react";
import { Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FieldAddModal } from "./FieldAddModal";

export const FormSelect = ({
  qrFormList,
  onDeleteFormField,
}: {
  qrFormList: { field: string; required: boolean }[];
  onDeleteFormField: (fieldName: string) => void;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div className="bg-[#F1F1F1] w-1/2 p-8 rounded-lg border-1 border-[#D8D8D8]">
      <Flex justify="space-between" align="center">
        <h3 className="font-bold">출석 폼 필드 설정</h3>
        <Button
          onClick={open}
          icon={<IconPlus size={12} />}
          styles={{
            root: {
              background: "#1251D4",
              color: "white",
            },
          }}
        >
          필드 추가
        </Button>
      </Flex>
      <div className="flex flex-col gap-4 mt-4">
        {qrFormList.map((formItem) => (
          <FormInput
            formName={formItem.field}
            required={formItem.required}
            key={formItem.field}
            onDeleteFormField={onDeleteFormField}
          />
        ))}
      </div>
      <FieldAddModal
        close={close}
        opened={opened}
        centered={true}
        title="필드 추가"
      />
    </div>
  );
};
