// 사이트 전역 설정 — 이름, 설명, 내비게이션 링크를 한 곳에서 관리합니다.
export const siteConfig = {
  name: "Starter Kit",
  description:
    "Next.js 16 App Router, Tailwind CSS, shadcn/ui 기반의 모던 웹 스타터킷",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  mainNav: [
    { title: "홈", href: "/" },
    { title: "예제", href: "/examples" },
  ],
  links: {
    github: "https://github.com",
  },
} as const;

export type NavItem = (typeof siteConfig.mainNav)[number];
