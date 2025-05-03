"use client"

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    console.error(error.message)
  }, [error])
  return <div>
    <h3>오류발생</h3>
    <button onClick={() => {
      startTransition(() => {
        router.refresh() // 현재 페이지에 필요한 서버컴포넌트를 다시 불러옴, 비동기 메서드임(async, await 불가능), startTransition
        reset() // 에러상태를 초기화하고, 컴포넌트들을 다시 렌더링
      })
    }}>retry</button>
    {/* 이곳에서 reset()을 시도하는건 브라우저측에서 이미 전달된 데이터로 다시시도하는것이기때문에 
    즉 클라이언트측에서 실행하는것이기때문에 다시시도해도 잘안됨
    새로운 데이터를 받아야함.
     */}
  </div >
}
