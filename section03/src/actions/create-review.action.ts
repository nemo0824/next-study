"use server";

import { error } from "console";
import { revalidatePath } from "next/cache";

export async function createReviewAction(_: any, formData: FormData) {
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();
  const bookId = formData.get("bookId")?.toString();
  if (!content || !author || !bookId) {
    return { status: false, error: "리뷰이름과 작성자명" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({ bookId, content, author }),
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    revalidatePath(`review-${bookId}`);
    return {
      status: true,
      error: "",
    };
    // 서버 컴포넌트에서만 호출할수있는 함수 revalidatePath
    // 캐시 또한 모두 무효화
    // 풀라우트 캐시까지 삭제됨
    console.log(response.status);
  } catch (err) {
    console.error(err);
    return {
      status: false,
      error: `리뷰 저장에 실패 : ${err}`,
    };
  }
}
