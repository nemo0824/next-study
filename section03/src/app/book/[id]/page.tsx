export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <div>book/{id} 입니다</div>
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
