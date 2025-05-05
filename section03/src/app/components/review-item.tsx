import style from "./review-item.module.css"
import { ReviewData } from "@/types"
import ReviewItemDeleteButton from "./review-item-delete-button"

export default function ReviewItem({ id, content, author, createdAt, bookId }: ReviewData) {

  return <div>
    <div>{author}</div>
    <div>{content}</div>
    <div>
      <div>{new Date(createdAt).toLocaleString()}</div>
      <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
    </div>
  </div>
}
