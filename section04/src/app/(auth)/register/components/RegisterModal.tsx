"use client";
import React, { useState } from "react";
import { Modal, Flex } from "@mantine/core";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";
import { IconScan, IconCircleCheck } from "@tabler/icons-react";

export const RegisterModal = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();

  const onClick = () => {
    if (isSelected === null) return;
    router.push(`/${isSelected}`);
  };
  const [isSelected, setIsSelected] = useState<"qr" | "checkIn" | null>(null);

  return (
    <Modal opened={opened} onClose={onClose} radius="lg">
      <div className="rounded-xl p-4">
        <Flex direction={"column"} gap={12} justify="center">
          <h3 className="text-[#1251D4] text-center font-bold text-xl">
            강의등록
          </h3>
          <p className="text-center">출석 관리 방식을 선택해주세요</p>

          <Button
            icon={<IconScan className="mr-4" />}
            onClick={() => setIsSelected("qr")}
            styles={{
              root: {
                backgroundColor: isSelected === "qr" ? "#1251D4" : "#F1F1F1",
                color: isSelected === "qr" ? "white" : "black",
                border: "1px solid #ddd",
              },
            }}
          >
            일회용 QR출석 강의등록
          </Button>
          <Button
            icon={<IconCircleCheck className="mr-4" />}
            onClick={() => setIsSelected("checkIn")}
            styles={{
              root: {
                backgroundColor:
                  isSelected === "checkIn" ? "#1251D4" : "#F1F1F1",
                color: isSelected === "checkIn" ? "white" : "black",
                border: "1px solid #ddd",
              },
            }}
          >
            체크히어 강의등록
          </Button>
        </Flex>
        <Flex justify={"center"} align={"center"} gap={12} mt={16}>
          <Button
            onClick={onClick}
            styles={{
              root: {
                backgroundColor: "#1251D4",
                color: "white",
              },
            }}
          >
            등록
          </Button>
          <Button onClick={onClose}>취소</Button>
        </Flex>
      </div>
    </Modal>
  );
};
