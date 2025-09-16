import React from "react";
import {
  IconLockFilled,
  IconStarFilled,
  IconGpsFilled,
} from "@tabler/icons-react";

export const AttendFooter = ({
  mode,
}: {
  mode: "permission" | "error" | "form";
}) => {
  const getFooterConfig = () => {
    switch (mode) {
      case "permission":
        return {
          title: "개인정보는 안전하게 보호됩니다",
          icon: <IconLockFilled />,
        };
      case "error":
        return {
          title: "정확한 위치 확인으로 공정한 출석 관리",
          icon: <IconStarFilled />,
        };
      case "form":
        return {
          title: "정보는 출석 확인 후 안전하게 처리됩니다",
          icon: <IconGpsFilled />,
        };
    }
  };

  const { title, icon } = getFooterConfig();
  return (
    <footer className="h-16 w-full flex justify-center items-center gap-4 bg-[#F1F1F1]">
      {icon}
      <p className="text-[#999999]">{title}</p>
    </footer>
  );
};
