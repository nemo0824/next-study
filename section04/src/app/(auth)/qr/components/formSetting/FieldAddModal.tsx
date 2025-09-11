import React from "react";
import { Flex, Modal } from "@mantine/core";
import { FormModalField } from "./FormModalField";
import { QR_SELECT_LIST } from "@/constants/qr";
import { Button } from "@/components/Button";

interface FieldAddModal {
  opened: boolean;
  close: () => void;
  centered?: boolean;
  title?: string;
}

export const FieldAddModal = ({
  opened,
  close,
  centered,
  title,
}: FieldAddModal) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered={centered}
      title={title}
      size={"lg"}
      styles={{
        content: {
          background: "#F9F9F9",
        },
        header: {
          background: "#F9F9F9",
        },
        title: {
          fontWeight: "bold",
        },
      }}
    >
      <>
        <div className="mt-10">
          <div className="flex flex-col gap-4">
            {QR_SELECT_LIST.map((form) => (
              <FormModalField key={form.field} form={form} />
            ))}
          </div>
        </div>
      </>
      <Flex gap={16} mt={16}>
        <Button
          styles={{
            root: {
              background: "#1251D4",
              color: "white",
            },
          }}
        >
          추가
        </Button>
        <Button onClick={close}>취소</Button>
      </Flex>
    </Modal>
  );
};
