import { ReactNode } from "react";

export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex justify-center items-center h-screen">{children}</div>
  );
}
