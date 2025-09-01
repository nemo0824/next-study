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
