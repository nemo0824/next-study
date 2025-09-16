"use client";
import React from "react";
import { Button } from "@/components/Button";
import { useDisclosure } from "@mantine/hooks";
import { RegisterModal } from "./RegisterModal";

export const RegisterContainer = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div>
      <h3>강의등록</h3>
      <Button onClick={open}>강의 등록</Button>
      <RegisterModal opened={opened} onClose={close} />
    </div>
  );
};
