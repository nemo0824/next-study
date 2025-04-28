export default async function Page({ searchParams }: { searchParams: Promise<{ q: string }> }) {
  const { q } = await searchParams
  return <div>Search Page</div>
}
// *react의 서버 컴포넌트 
// 서버측에서 사전렌더링을위해서 딱 한번 실행 비동기적으로 실행되어도 문제가없음. async 사용가능


