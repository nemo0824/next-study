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

1.  기존 방식
    1-1 페이지 이동요청
    1-2 JS bundle 전달(client component)
    1-3 JS 실행(컴포넌트교체)
    1-4 페이지 교체

2.  app router 방식
    2-1 페이지 이동요청
    2-2 JS bundle 전달(clint component)
    2-3 RSC Payload(server component)
    2-4 JS 실행
    2-5 페이지 교체

3.  tip

- useRouter객체 사용시 'next/navigation' 을 import 해야함 , PageRouter와 차이점
- prevFetching

* 개발모드 실행 x 프로덕션 모드 실행 o
* 이동할 가능성이있는 페이지를 미리 불러옴
* RSC payload, js bundle, 까지 가져옴
* static 한 페이지 - ssg => Rsc payload + js bundle 가져옴
* dynamic 한 페이지 - ssr => Rsc payload 가져옴 데이터의 업데이트가 향후에 필요할수도있기때문에 rsc payload만 가져온다

### data fetching

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

### data cache

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

### request Memoization

중복된 api 요청을 하나의 요청으로 합쳐주는것
데이터 캐시와 다름
"하나의 페이지를 렌더링 하는 동안"에 중복된 API 요청을 캐싱하기 위해 존재
렌더링이 종료되면 모든 캐시가 소멸된다
중복된 api를 줄이는것이 목적임

데이터 캐시
백엔드 서버로부터 불러온 데이터를 거의 영구적으로 보관하기 위해 사용됨
서버가동중에는 영구적으로 보관된다

request Memoization vs data cache

흐름
리퀘스트 메모이제이션 => 데이터 캐시 => 백엔드서버

만약 세번의 요청이있다면
첫번째 요청시 => 데이터 캐싱하고
두번째 요청시 => 데이터 캐싱있으니까 요청을 아예하지않고 캐싱함
세버째 요청시 => 두번쨰 요청과 동일

"그냥 중복요청을 안보내면되는것아닌가? " => 서버 컴포넌트 도입때문
appRouter는 각 서버 컴포넌트에서 필요로하는데 이터를 요청하게됨 그렇게되면 각 컴포넌트가 동일한 api를 요청할수도있음

### full Route cache

next 서버측에서 빌드 타임에 특정 페이지의 렌더링 결과를 캐싱하는 기능.

- 서버컴포넌트만 해당
  dynamic
  static

* dynamic page로 설정되는 기준

1. 캐시되지 않는 data fetching을 사용할경우
2. 동적함수(쿠키, 헤더, 쿼리스트링)을 사용하는 컴포넌트가 있을때

- static page로 설정되는기준

1. dynamic에 포함되지않을때

동적함수 데이터캐시 페이지분류
y n dynamic
y y dynamic
n n dynamic
n y static

next 서버 ===> 백엔드 서버
풀라우트캐시, 렌더링(사전), 리퀘스트메모이제이션, 데이터캐시

revalidate로 stale 한것을 다시 불러올수있음

suspense를 이용해서 client component 묶고 fallback 설정.
비동기작업이후에 suspense 내부요소 렌더링
빌드타임에서 클라이언트컴포넌트 제외됨

### Route segment options

export const dynamic = ''
특정 페이지 유형을 강제로 static, dynamic 페이지로 설정

1.  auto : 기본값, 아무것도 강제하지 않음
2.  force-dynamic : 페이지를 강제로 dynamic 페이지로 설정
3.  force-static : 페이지를 강제로 static 페이지로 설정
4.  error : 페이지를 강제로 static 페이지로 설정(설정하면 안되는 이유 -> 빌드 오류)

### clint router cache

브라우저에 저장되는 캐시 페이지 이동을 효율저긍로 진행하기위해 페이지의 일부 데이터를 보관함
RSC payload 의 리소스를 저장.
새로고침이나, 브라우저껐다가 키면 다시 reset됨

### streaming

데이터를 조각으로 쪼개서 보내주는것 긴로딩없이 좋은 경험 줄수있음
스트리밍을 이용하게 되면 일단 뭐라도 빠르게 보여줄수있음
느리게 렌더링되는 부분은 로딩바 같은 대체 UI를 보여주면된다
오래걸리는 컴포넌트의 렌더링을 사용자가 좀 더 좋은 환경에서 기다릴 수 있도록

dynamic 페이지에 잘 활용됨

1. loading 컴포넌트는 해당경로의 아래에있는 모든 비동기 페이지 컴포넌트들을 스트리밍으로 설정해줌
2. async로 설정되어있는 비동기 컴포넌트에만 스트리밍 설정해줌
3. loading 컴포넌트는 무조건 페이지 컴폰넌트에만 적용 layout, component에서는 불가능함 ==> react suspense적용해야함
4. 브라우저에서 querystring이 변경될때는 트리거링되지않는다 즉 페이지 변경할때만 되는것임 , queryString이 변경될때는 안됨 ==> react suspense만

react suspense
리액트의 suspense 최초한번 내부터컴포넌트 완료됐을때 기본저긍로 새로 로딩상태 돌아가지않는데 key값을 이용해서 새로운컴포넌트로 인식할수있도록

### skeleton UI

대략 어떻게 생긴 컴텐츠가 나타겠구나 라고 알려주는 것

스켈레톤 UI를 하기위해서 스켈레톤 component와 style을 설정해주고
해당 컴포넌트 Suspense에 fallback으로 넣어준다.

### error

에러헨들링은 일단 기존처럼 try,catch방법도있지만
error component를 만들어서 해당 페이지의 error를 잡게할수있음 client 컴포넌트로 만들것 서버에러든, 클라이언트 에러든 잡을수있도록,

컴포넌트 단위로하고싶다면 기존의 리액트 방식처럼 errorBoundary사용

추가 참고 공부 할것

reset 함수
router.refresh
startTransition

## server action

브라우저에서 호출할 수 있는 서버에서 실행되는 비동기 함수

클라이언트 컴포넌트로 구성하고 api로 호출하지않고 server action 사용하는이유?
=> 코드가 간결
=> 단순한 기능일때
=> 보안성 민감하거나 중요한 데이터 다룰떄

revalidatePath
정보들을 해당 경로에있는걸 다시가져옴
server 컴포넌트에서만 사용할수있으며
기존의 풀라우트 캐시, 데이터 캐시들이 삭제됨 purge
풀라우트 캐시 다시 업데이트되지않음
데이터 캐시 업데이트됨

무조건 최신의데이터를 가져오기위함임

next 에서 재검증

1. 특정 주소의 해당되는 페이지만 재검증
   revalidate(api주소)

2. 특정 경로의 모든 동적 페이지를 재검증
   revalidate("폴더, 파일 경로(브라우저 주소경로가아님)", "page")
   revalidate('/book/[id]', "page")

3. 특정 레이아웃을 갖는 모든 페이지 재검증
   revalidate('/(with-searchbar)', "layout")

4. 모든 데이터 재검증
   revalidate("/", "layout")

5. 태그 기준, 데이터 캐시 재검증
   revalidateTag("tag")

### Parallel

여러개의 콘텐츠를 병렬(slot)로 렌더하고
url로 각각 제어할수있는 appRouter
모달, 탭, 분할 레이아웃 부분만 바뀌는 ui적합

### Image 최적화

next.js image 최적화
Image 태그사용,
next에서 기본적으로 제공,

1. 자동 크기 조절

- width, height 기반으로 사ㅣ즈를 고정

2. 이미지 포맷변환

- 브라우저가 지원하면 자동으로 webP, AVIF로 변환

3. 지연로딩

- 기본적으로 화면에 보일때까지 로딩하지않음

4. 반응형 이미지 지원

- 기기 해상도에 따라 적절한 크기의 이미지 자동 제공

5. 이미지 CDN 처리
   -next dev 나 next start 요청시 이미지를 가공해서 응답

### SEO 최적화

메타 데이터 설정하기.
title, description: 검색결과에 노출
openGraph: sns공유시 노출
twitter: 트위터 카드

이미지 최적화 또한
성능은 SEO 점수엦 ㅣㄱ접 영향
