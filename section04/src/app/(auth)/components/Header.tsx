import React from "react";
import Image from "next/image";

export const Header = () => {
  const HEADER_TITLE = "체크히어";
  return (
    <header className="w-full h-[45px] flex items-center gap-8 p-4 border-2 border-gray-50">
      <Image src="/logo/icon-logo.png" alt="" width={30} height={30} />
      <h1 className="font-bold text-blue-600">{HEADER_TITLE}</h1>
    </header>
  );
};
