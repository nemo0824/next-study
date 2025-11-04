"use client";

import { useEffect, useState } from "react";

interface WindowWithMSStream extends Window {
  MSStream?: unknown;
}

export default function IntentTest() {
  const [showFallback, setShowFallback] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [osText, setOsText] = useState<string>("");

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor;
    let intentUrl = "";
    let osSpecificText = "";

    // android
    if (/android/i.test(userAgent)) {
      intentUrl = "intent:#Intent;action=android.settings.SETTINGS;end";
      osSpecificText = "안드로이드 설정 앱으로 이동";
    }
    // iOS
    else if (
      /iPad|iPhone|iPod/.test(userAgent) &&
      !(window as WindowWithMSStream).MSStream
    ) {
      intentUrl = "App-Prefs:root=WIFI";
      osSpecificText = 'ios 팝업에서 "열기"를 누르세요';
    }

    if (intentUrl) {
      setUrl(intentUrl);
      setOsText(osSpecificText);
      //자동으로 이동
      window.location.href = intentUrl;
      // fallback
      setTimeout(() => {
        setShowFallback(true);
      }, 500);
    }
  }, []);

  return (
    <div>
      {showFallback && (
        <div style={{ textAlign: "center", paddingTop: "50px" }}>
          <p>자동으로 설정 화면이 열리지 않으면 아래 버튼을 눌러주세요.</p>
          <a
            href={url}
            style={{
              fontSize: "20px",
              color: "blue",
              textDecoration: "none",
              display: "block",
              marginTop: "15px",
            }}
          >
            → {osText}
          </a>
        </div>
      )}
      <p style={{ textAlign: "center", marginTop: "20px" }}>
        설정으로 이동하는 중입니다...
      </p>
    </div>
  );
}
