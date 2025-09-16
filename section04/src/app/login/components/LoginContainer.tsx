"use client";

import React from "react";
import { Button } from "@/components/Button";
import { useRouter } from "next/navigation";

export const LoginContainer = () => {
  const router = useRouter();
  const onClickLogin = (isAdmin: boolean) => {
    window.sessionStorage.setItem("loginType", isAdmin ? "admin" : "user");
    router.push("/register");
  };
  return (
    <div className="flex gap-4">
      <Button onClick={() => onClickLogin(true)} variant="filled">
        관리자 로그인
      </Button>
      <Button onClick={() => onClickLogin(false)} variant="outline">
        회원 로그인
      </Button>
    </div>
  );
};
