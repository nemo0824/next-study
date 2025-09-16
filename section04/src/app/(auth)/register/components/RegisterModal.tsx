"use client";
import React from "react";
import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";
import { Button } from "@/components/Button";

export const RegisterModal = ({
  opened,
  onClose,
}: {
  opened: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const onClick = () => {
    router.push("/qr");
  };
  return (
    <Modal opened={opened} onClose={onClose}>
      <h3>강의등록</h3>
      <p>출석 관리 방식을 선택해주세요</p>
      <Button onClick={onClick}>일회용 QR출석 강의등록</Button>
      <Button>체크히어 강의등록</Button>
    </Modal>
  );
};
