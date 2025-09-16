"use client";
import React from "react";
import { AttendHeader } from "../components/AttendHeader";
import { AttendFooter } from "../components/AttendFooter";
import QrForm from "./components/QrForm";

export default function QrAttendeeForm() {
  return (
    <div className="min-h-screen bg-white flex flex-col safe-area-inset">
      <AttendHeader mode="form" />
      <div className="flex-1">
        <QrForm />
      </div>
      <AttendFooter mode="form" />
    </div>
  );
}
