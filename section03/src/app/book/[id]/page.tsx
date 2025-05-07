import { NotFound } from "@/app/NotFound";
import style from "./page.module.css";
import Image from "next/image";
import { createReviewAction } from "@/actions/create-review.action";
import { ReviewData } from "@/types";
import ReviewItem from "@/app/components/review-item";
import { ReviewEditor } from "@/app/components/review-editor";
// export const dynamicParams = false;


// 빌드시에 정적으로 페이지만들어서 만들어진 페이지 제공
// export function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }]
// }

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`)
  if (!response.ok) {
    if (response.status === 404) {
      return <NotFound />
    }
    return <div> 오류가발생했습니다</div>
  }
  const detailBook = await response.json()
  const { title, subTitle, description, author, publisher, coverImgUrl } = detailBook;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <Image src={coverImgUrl} width={240} height={300} alt={`도서 ${title}의 표지 이미지`} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}



async function ReviewList({ bookId }: { bookId: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}`, { next: { tags: [`review-${bookId}`] } })
  if (!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`)
  }
  const reviews: ReviewData[] = await response.json()
  return <section>
    {reviews.map((review) => <ReviewItem key={`review-item-${review.id}`} {...review} />)}
  </section>
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params
  return <div className={style.container}>
    <BookDetail bookId={id} />
    <ReviewEditor bookId={id} />
    <ReviewList bookId={id} />
  </div>
}
// params 가져올때 기본적으로 props를 통해가져오는것. 추가적으로 Params는 Promise 객체로 가져오기때문에 
// 컴포넌트에 async로 비동기 처리를해줘야함. 추가적으로 타이핑 필수 

// book/[id]
// 현재 localhost:3000/book/[id] 로 접근가능 

// 만약 localhost:3000/book/1/100 중첩으로  더 깊게 url 접근하고싶다면
// book/[...id] 설정 필요
// catch or segment

// catch or segment 설정시 localhost:3000/book 으로 원하는경로가 나오지않음
// book/[[..id]]를 하게되면 book 뒤의 경로가 무엇이든 다 나오면서 localhost:3000/book도 가능하게됨
