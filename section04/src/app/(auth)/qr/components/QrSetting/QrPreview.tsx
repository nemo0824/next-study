import React, { useState, useEffect } from "react";
import { Button } from "@/components/Button";
import { Flex } from "@mantine/core";
import Image from "next/image";

interface QrPreviewProps {
  refreshInterval?: number;
}

export const QrPreview = ({ refreshInterval = 30 }: QrPreviewProps) => {
  const [preQrCode, setPrevQrCode] = useState(false);
  const [isAutoRefresh, setIsAutoRefresh] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [qrKey, setQrKey] = useState(0);

  useEffect(() => {
    if (!isAutoRefresh || !refreshInterval || !preQrCode) {
      setCountdown(0);
      return;
    }

    setCountdown(refreshInterval);

    const interval = setInterval(() => {
      setQrKey((prev) => prev + 1);
      setCountdown(refreshInterval);
    }, refreshInterval * 1000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : refreshInterval));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
    };
  }, [isAutoRefresh, refreshInterval, preQrCode]);

  return (
    <div className="bg-[#F1F1F1] w-full p-8 rounded-lg">
      <h3 className="mb-4">ex) QR코드 미리보기</h3>
      <Flex justify={"space-between"}>
        <div className="bg-white w-64 h-64 p-4  rounded-lg border border-[#1251D4]">
          <div className="w-56 h-56 bg-gray-200  rounded-lg flex justify-center items-center">
            {preQrCode ? (
              <Image
                key={qrKey}
                src="/qr/lfinQr.png"
                alt="QR Code"
                width={200}
                height={200}
              />
            ) : (
              <div className="text-gray-400 text-sm">QR 코드 생성 대기중</div>
            )}
          </div>
        </div>
        <div className="ml-6 flex flex-col gap-4">
          <Button
            onClick={() => !preQrCode && setPrevQrCode(true)}
            styles={{
              root: {
                backgroundColor: preQrCode ? "#9CA3AF" : "#1251D4",
                color: "white",
                cursor: preQrCode ? "default" : "pointer",
              },
            }}
          >
            {preQrCode ? "QR코드 생성됨" : "QR코드 생성"}
          </Button>

          <Button
            onClick={() => preQrCode && setIsAutoRefresh(!isAutoRefresh)}
            styles={{
              root: {
                backgroundColor: !preQrCode
                  ? "#9CA3AF"
                  : isAutoRefresh
                  ? "#dc2626"
                  : "#16a34a",
                color: "white",
                cursor: !preQrCode ? "default" : "pointer",
              },
            }}
          >
            {isAutoRefresh ? "자동 갱신 중지" : "자동 갱신 시작"}
          </Button>

          {isAutoRefresh && countdown > 0 && (
            <div className="text-center bg-white p-3 rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">
                {countdown}초
              </div>
              <div className="text-sm text-gray-500">다음 갱신까지</div>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <p>자동 갱신 시작 시 설정된 주기({refreshInterval}초)마다</p>
            <p>QR 코드가 자동으로 변경됩니다</p>
          </div>
        </div>
      </Flex>
    </div>
  );
};
