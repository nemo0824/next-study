import BookItem from "@/app/components/book-item";
import { BookData } from "@/tytpes";
import axios from "axios";

export default async function Page({
  searchParams,
}: {
  searchParams: { q?: string }
}) {

  const response = await axios<BookData[]>(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${searchParams.q}`)
  const searchBooks = response.data
  return (
    <div>
      {searchBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
