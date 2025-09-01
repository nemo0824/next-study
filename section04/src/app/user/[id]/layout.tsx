import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>user layout</div>
      {children}
    </div>
  );
}
