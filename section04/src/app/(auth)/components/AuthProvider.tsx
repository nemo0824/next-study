"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "./Navbar";
import { Header } from "./Header";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loginType = window.sessionStorage.getItem("loginType");
    if (loginType === "admin") {
      setIsLoading(false);
    } else {
      router.push("/login");
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-screen w-full flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Navbar />
        <div className="flex-1 p-5 bg-gray-100">
          <div className="bg-white rounded-lg h-full p-2">{children}</div>
        </div>
      </div>
    </div>
  );
};
