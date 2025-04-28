import { ReactNode } from "react";
import { Searchbar } from "./searchbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Searchbar />
      <div>{children}</div>
    </div>
  )
}
