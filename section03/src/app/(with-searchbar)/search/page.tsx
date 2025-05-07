import BookItem from "@/app/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";
import Loading from "./loading";
import BookListSkeleton from "@/app/components/skeleton/book-list-skeleton";
import { title } from "process";
import { Metadata } from "next";

async function SearchResult({ q }: { q: string }) {
  await delay(1500)
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`, { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string }> }): Promise<Metadata> {
  // 현재 페이지의 메타 데이터를 동적으로 생성하는 역할을 함
  const { q } = await searchParams

  return {
    title: `${q}: 한입북스 검색`,
    description: `${q}: 한입북스 결과`,
    openGraph: {
      title: `${q}: 한입북스 검색`,
      description: `${q}: 한입북스 결과`,
    }
  }
}
export default function Page({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  return (
    <Suspense key={searchParams.q || ""} fallback={<BookListSkeleton count={3} />}>
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
  )
}
