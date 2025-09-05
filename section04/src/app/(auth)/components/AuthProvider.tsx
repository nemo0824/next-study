"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

  return <div className="min-h-screen w-full">{children}</div>;
};
