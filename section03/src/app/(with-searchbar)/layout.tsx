import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>search bar</div>
      <div>{children}</div>
    </div>
  )
}
