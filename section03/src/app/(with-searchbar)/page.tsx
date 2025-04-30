import { BookData } from "@/tytpes";
import BookItem from "../components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";
import axios from "axios";

async function getAllBooks(): Promise<BookData[]> {
  try {
    const response = await axios(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`)
    return response.data
  } catch (err) {
    console.error(err)
    return []
  }
}

async function AllBooks() {
  const allBooks = await getAllBooks()
  return (
    <div>
      {allBooks.map((book) => <BookItem key={book.id} {...book} />)}
    </div>
  )
}
async function getRecoBooks(): Promise<BookData[]> {
  try {
    const response = await axios(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`)
    return response.data
  } catch (err) {
    console.error(err)
    return []
  }
}

async function RecoBooks() {
  const recoBooks = await getRecoBooks()
  return (
    <div>
      {recoBooks.map((book) => <BookItem key={book.id} {...book} />)}
    </div>
  )
}

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
}
