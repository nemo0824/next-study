import axios from "axios";
import style from "./page.module.css";
import { BookData } from "@/tytpes";

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  const response = await axios<BookData>(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${params.id}`)
  const detailBook = response.data
  const { title, subTitle, description, author, publisher, coverImgUrl } = detailBook;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </div>
  );
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
