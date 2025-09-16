"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { LocOption } from "../components/LocOption";

export default function DynamicGpsError() {
  const router = useRouter();

  const handleLocationSuccess = (locationInfo: "성공" | "실패") => {
    if (locationInfo === "성공") {
      router.push("/qr-attendee/dynamicGps/permission");
    } else if (locationInfo === "실패") {
      router.push("/qr-attendee/dynamicGps/locationError");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col safe-area-inset">
      <div className="flex-1 flex flex-col">
        <LocOption mode="error" handleLocationSuccess={handleLocationSuccess} />
      </div>
    </div>
  );
}
