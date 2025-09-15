import React from "react";
import { IconChevronLeft } from "@tabler/icons-react";

export const AttendHeader = ({
  mode,
}: {
  mode: "permission" | "error" | "form";
}) => {
  const getHeaderConfig = () => {
    switch (mode) {
      case "permission":
        return { title: "위치 권한", icon: <IconChevronLeft /> };
      case "error":
        return { title: "위치 오류", icon: <IconChevronLeft /> };
      case "form":
        return { title: "출석 확인", icon: <IconChevronLeft /> };
    }
  };

  const { title, icon } = getHeaderConfig();
  return (
    <header className="h-15 border border-[#D8D8D8] flex items-center relative">
      <div className="absolute left-4 cursor-pointer">{icon}</div>
      <h3 className="font-bold flex-1 text-center">{title}</h3>
    </header>
  );
};
