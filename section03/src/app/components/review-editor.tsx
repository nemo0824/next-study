"use client"

import { createReviewAction } from "@/actions/create-review.action"
import { useActionState } from "react"

export function ReviewEditor({ bookId }: { bookId: string }) {

  const [state, formAction, isPending] = useActionState(createReviewAction, null)

  return (
    <section>
      <form action={formAction}>
        <input name="bookId" value={bookId} hidden readOnly />
        <input disabled={isPending} name="content" placeholder="리뷰내용" required />
        <input disabled={isPending} name="author" placeholder="작성자" required />
        <button disabled={isPending} type="submit">{isPending ? "..." : "작성하기"}</button>
      </form>
    </section>
  )
}
