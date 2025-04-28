next.js 공부

### React Server Component

1. 등장배경
   JS bundle내부
   상호작용있는 컴포넌트 (event, hook 등)
   상호작용이 없는 컴포넌트

- 기존의 문제점
  AppRouter(JS bundle(상호작용있는 컴포넌트 (event, hook 등), 상호작용이 없는 컴포넌트 ))
  hydration이 필요하지않은 (상호작용이 없는 컴포넌트) JS bundle에 포함. => JS bundle 용량 커짐 => 불러오는데 오래걸림 => TTI 느려짐

- 해결법
  React Server Component
  서버측에서 실행되는 컴포넌트 (브라우저에서 실행 x)

  클라이언트 컴포넌트, 서버 컴포넌트 분리

  1. 사전렌더링시 둘다(클라이언트, 서버컴포넌트) 실행
  2. hydration시 server컴포넌트 제외 클라이언트 컴포넌트만 hydration
