"use client";
import { Input, Radio } from "@mantine/core";
import React from "react";

export const index = () => {
  return (
    <div>
      <label>강의명</label>
      <Input></Input>
      <label>강의 시작 날짜</label>
      <Input></Input>
      <label>강의 종료 날짜</label>
      <Input></Input>
      <label>강의시간</label>
      <Input></Input>
      <label>입실 허용시간 +-</label>
      <Input></Input>
      <label>퇴실 허용시간 +-</label>
      <Input></Input>
      <label> 인증 방식(필수)</label>
      <Radio />
    </div>
  );
};
