import Link from "next/link";
import {
  ArrowRightIcon,
  BoxesIcon,
  MoonStarIcon,
  PaletteIcon,
  RocketIcon,
  ShieldCheckIcon,
  ZapIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

// 랜딩 페이지에 노출할 기능 목록
const features = [
  {
    icon: RocketIcon,
    title: "Next.js 16 App Router",
    description: "React 19, Server Components, Turbopack 기반의 최신 라우팅.",
  },
  {
    icon: PaletteIcon,
    title: "Tailwind CSS v4",
    description: "CSS 우선 설정과 디자인 토큰으로 빠르게 스타일링.",
  },
  {
    icon: BoxesIcon,
    title: "shadcn/ui",
    description: "복사해서 소유하는 접근성 좋은 컴포넌트 (Base UI 기반).",
  },
  {
    icon: MoonStarIcon,
    title: "다크 모드",
    description: "next-themes로 라이트/다크/시스템 테마를 기본 지원.",
  },
  {
    icon: ShieldCheckIcon,
    title: "TypeScript + ESLint",
    description: "엄격한 타입 검사와 린트 규칙이 사전 구성되어 있습니다.",
  },
  {
    icon: ZapIcon,
    title: "Prettier",
    description: "Tailwind 클래스 자동 정렬 플러그인까지 포함된 포맷터.",
  },
];

export default function HomePage() {
  return (
    <div className="container mx-auto max-w-6xl px-4">
      {/* 히어로 섹션 */}
      <section className="flex flex-col items-center gap-6 py-20 text-center md:py-28">
        <Badge variant="secondary">Next.js 16 · Tailwind v4 · shadcn/ui</Badge>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance md:text-6xl">
          아이디어를 바로 웹으로 만드는 모던 스타터킷
        </h1>
        <p className="max-w-2xl text-lg text-balance text-muted-foreground">
          {siteConfig.description}. 설정은 끝났으니 기능 개발에만 집중하세요.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/examples" className={cn(buttonVariants({ size: "lg" }))}>
            컴포넌트 둘러보기
            <ArrowRightIcon data-icon="inline-end" />
          </Link>
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            GitHub
          </a>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="grid gap-4 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <CardHeader>
              <Icon className="mb-2 size-6 text-primary" />
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>

      {/* 시작하기 CTA */}
      <section className="mb-20 rounded-2xl border bg-muted/40 p-8 text-center md:p-12">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          지금 바로 시작하세요
        </h2>
        <p className="mt-2 text-muted-foreground">
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            src/app/page.tsx
          </code>
          를 수정하면 이 페이지가 즉시 바뀝니다.
        </p>
      </section>
    </div>
  );
}
