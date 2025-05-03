import { ReactNode, Suspense } from "react";
import SearchBar from "../components/SearchBar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>{new Date().toLocaleString()}</div>
      <Suspense fallback={<div>Loading.</div>}>
        <SearchBar />
      </Suspense>
      <div>{children}</div>
    </div>
  )
}
