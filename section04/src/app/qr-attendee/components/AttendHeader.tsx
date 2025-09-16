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
      {/* 뒤로가기 아이콘 각각 상황에 필요할지 고민 및 이동로직 삽입 필요 (true/false) 가능하면 변경 */}
      <div className="absolute left-4 cursor-pointer">{icon}</div>
      <h3 className="font-bold flex-1 text-center">{title}</h3>
    </header>
  );
};
