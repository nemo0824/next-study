next.js 정리

AppRouter

1. page.tsx 에서 export default 로 컴포넌트를 내보내야하는 이유

next.js는 page.tsx를 일반적인 React 모듈처럼 import 하는게 아니라
빌드시 자동 탐색 방식으로 찾아서 사용함
빌드 타임에 next.js는 page.tsx파일을 열어서 default export를 찾음
named export만 있다면 next.js는 페이지에 뭘 렌더링해야할지 찾을수없음

2. page.tsx 에서 받는 Props

서버 컴포넌트일때
쿼리스트링이나, url파라미터와 같은 경로상에 포함되는값들은 전달된다

3. 경로

element/[id] : element/1 기본적 urlParams
element/[...id] : element/1/1/1/1  
element/[[...id]] : element 관련된 경로에 모두 대응

4. Route Group (with-searchbar)
   () 괄호에 넣은 폴더는 경로상 아무 영향이 없음

5. server component

- 서버 컴포넌트에는 브라우저에서 실행될 코드가 포함되면 안된다
- 클라이언트 컴포넌트는 클라이언트에서만 실행되지않는다
  - 클라이언트 컴포넌트는 2번 실행 서버 + 클라이언트측
  - 서버 컴포넌트는 1번 실행 서버컴포넌트에서만
  - hydration을 위해서 클라이언트 컴포넌트는 Js bundle을 한번 더 실행
- 클라이언트 컴포넌트에서 서버컴포넌트를 Import 할수없다.
  - 서버측에서는 (client, server) component들이 존재
  - 클라이언트측에서는 (server) component가 없슴
  - 이런경우 next.js 자체에서 server component를 client component로 변경
  - 어쩔수없이 client 컴포넌트에서 server component를 렌더링해야하는경우 에는 children으로 받아서 할수있음
- 서버 컴포넌트에서 클라이언트 컴포넌트에게 직렬화 되지않는 props는절달 불가
  - 직렬화 : 객체, 배열, 클래스 등의 복잡한 구조의 데이터를 네트워크 상으로 전송하기 위해 아주 단순한 형태 (문자열, byte)로 변환하는것
  - js함수는 직렬화 불가
  - 사전렌더링시 서버컴포넌트가 먼저 렌더링 먼저 실행 => RSC payload
  - RSC payload
  - React Server component의 순수한 데이터 (결과물)
  - React server Component를 직렬화한 결과
  - 서버컴포넌트의 렌더링결과, 연결되 클라이언트 컴포넌트의 위치, 클라이언트 컴포넌트에거 전달하는 Props값
