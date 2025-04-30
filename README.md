next.js 공부

### React Server Component

1. 등장배경
   JS bundle내부
   상호작용있는 컴포넌트 (event, hook 등)
   상호작용이 없는 컴포넌트

2. 기존의 문제점
   AppRouter(JS bundle(상호작용있는 컴포넌트 (event, hook 등), 상호작용이 없는 컴포넌트 ))
   hydration이 필요하지않은 (상호작용이 없는 컴포넌트) JS bundle에 포함. => JS bundle 용량 커짐 => 불러오는데 오래걸림 => TTI 느려짐

3. 해결법
   React Server Component
   서버측에서 실행되는 컴포넌트 (브라우저에서 실행 x)

클라이언트 컴포넌트, 서버 컴포넌트 분리

1. 사전렌더링시 둘다(클라이언트, 서버컴포넌트) 실행
2. hydration시 server컴포넌트 제외 클라이언트 컴포넌트만 hydration

서버 컴포넌트

- 서버측에서 사전 렌더링 진행할때 딱 한번만 실행 됨

클라이언트 컴포넌트

- 사전 렌더링 진행할때 한번, 하이드레이션 진행할 때 한번 총 2번 실행

결론 : 페이지 대부분 서버 컴포넌트로 구성 권장, 클라이언트 컴포넌트는 꼭 필요할 경우만 사용

4. 주의사항 및 규칙
   4-1. 서버 컴포넌트에는 브라우저에서 실행될 코드가 포함되면 안된다.
   4-2. 클라이언트 컴포넌트는 클라이언트에서만 실행되지않는다
   4-3. 클라이언트 컴포넌트에서 서버컴포넌트를 import할수없다 (props로 넘겨줘야함)
   4-4. 서버컴포넌트에서 클라이언트에게 직렬화 되지 않는 props는 전달불가능하다 (함수는 직렬화 불가능 즉 전다 불가)

   ### Navigate

   1. 기존 방식
      1-1 페이지 이동요청
      1-2 JS bundle 전달(client component)
      1-3 JS 실행(컴포넌트교체)
      1-4 페이지 교체

   2. app router 방식
      2-1 페이지 이동요청
      2-2 JS bundle 전달(clint component)
      2-3 RSC Payload(server component)
      2-4 JS 실행
      2-5 페이지 교체

   3. tip

   - useRouter객체 사용시 'next/navigation' 을 import 해야함 , PageRouter와 차이점
   - prevFetching

   * 개발모드 실행 x 프로덕션 모드 실행 o
   * 이동할 가능성이있는 페이지를 미리 불러옴
   * RSC payload, js bundle, 까지 가져옴
   * static 한 페이지 - ssg => Rsc payload + js bundle 가져옴
   * dynamic 한 페이지 - ssr => Rsc payload 가져옴 데이터의 업데이트가 향후에 필요할수도있기때문에 rsc payload만 가져온다

### 데이터 페칭

PageRouter

사전렌더링중 함수이용

1. getServerSideProps (ssr)
2. getStaticProps (ssg)
3. getStaticPaths (dynamic ssg)

서버컴포넌트가 없어서 모든 컴포넌트가 클라이언트 컴포넌트
=> 서버와 클라이언트측 둘다 실행됐음

AppRouter

서버컴포넌트 추가되었음
async function 을 이용해 await fetch

기존 클라이언트 컴포넌트에서는 async 키워드 사용 불가
: 브라우저에서 동작시 문제를 일으킬수있기때문에 (props전달, memo)

데이터 요청은 해당 컴포넌트에서 할수있게됨
fetching data where it's needed

### 데이터 캐시

fetch 메서드를 이용해 불러온 데이터를 next 서버에 보관하는 기능, 영구적 또는 특정 시간 주기로 갱신
axios는 불가능 next 에서사용하는 fetch 메서드는 일반적으로 사용하는 fetch와 다름

1. cache: "no-store"

- 데이터 페칭 결과를 저장하지 않는 옵션
- 캐싱을 아예 하지 않도록 설정하는 옵션

기본값이 no-store

2. cache: "force-cache"

- 요청의 결과를 ㅁ무조건 캐싱함
- 한번 호출 된 이후에는 다시 호출되지않음
- 첫 요청시에 캐싱하고, 두번째 요청시부터 캐싱되어있는지 확인하고 캐싱됐으면 요청하지않고 캐싱값사용
- json형태로 next폴더안에 cache에서 확인할수있음

3. {next:{revalidate:3}}

- 특정 시간을 주기로 캐시를 업데이트함
- 마치 page Router의 ISR 방식과 유사함
- 3초 주기로한다는뜻
- stale 한지 확인하고 최신데이터 fetching

4. {next:{tags:['a']}}

- on-Demand Revalidate
- 요청이 들어왔을때 데이터를 최신화함
