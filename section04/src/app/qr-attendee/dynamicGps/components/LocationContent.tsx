import React from "react";
import { IconMapPinFilled } from "@tabler/icons-react";
import { Button } from "@/components/Button";
import { AttendHeader } from "../../components/AttendHeader";
import { AttendFooter } from "../../components/AttendFooter";
import { useRouter } from "next/navigation";

interface LocationContentProps {
  mode: "permission" | "error" | "form";
  onClickLocation: () => void;
}

export const LocationContent = ({
  mode,
  onClickLocation,
}: LocationContentProps) => {
  const isPermissionMode = mode === "permission";
  const router = useRouter();
  return (
    <div className="flex-1 flex flex-col">
      <AttendHeader mode={mode} />
      <div className="flex-1 flex flex-col justify-center items-center px-4 gap-4">
        <div
          className={`rounded-full h-30 w-30 flex justify-center items-center ${
            isPermissionMode ? "bg-[#1251D4]" : "bg-[#DC3545]"
          }`}
        >
          <IconMapPinFilled size={50} />
        </div>

        <h3
          className={`font-bold mt-8 ${
            isPermissionMode ? "" : "text-[#DC3545]"
          }`}
        >
          {isPermissionMode
            ? "위치 접근 권한이 필요합니다."
            : "출석 가능 범위를 벗어났습니다."}
        </h3>

        {isPermissionMode ? (
          <>
            <p className="mt-8 text-[#999999]">정확한 출석 확인을 위해</p>
            <p className="text-[#999999]">현재 위치 정보가 필요합니다.</p>
            <p className="mt-8 text-[#999999]">
              위치 정보는 출석 확인 목적으로만
            </p>
            <p className="text-[#999999]">사용되며 안전하게 보호됩니다</p>
          </>
        ) : (
          <>
            <p className="mt-8 text-[#999999]">현재 위치가 출석 체크 가능한</p>
            <p className="text-[#999999]">범위를 벗어나 있습니다</p>
            <p className="mt-8 text-[#999999]">지정된 장소로 이동한 후</p>
            <p className="text-[#999999]">다시 시도해 주세요</p>
          </>
        )}

        <Button onClick={onClickLocation}>
          {isPermissionMode ? "위치 권한 허용" : "위치 다시 확인"}
        </Button>
        <Button
          onClick={() => {
            router.push("/qr-attendee/dynamicGps/locationError");
          }}
        >
          위치 오류 페이지로 이동 (임시)
        </Button>
        <Button
          onClick={() => {
            router.push("/qr-attendee/form");
          }}
        >
          폼 페이지로 가기 (임시)
        </Button>
      </div>
      <AttendFooter mode={mode} />
    </div>
  );
};
