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
