import type { Metadata } from "next";

import { ComponentShowcase } from "./component-showcase";

export const metadata: Metadata = {
  title: "예제",
  description: "스타터킷에 포함된 shadcn/ui 컴포넌트 예제",
};

export default function ExamplesPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">컴포넌트 예제</h1>
        <p className="text-muted-foreground">
          기본으로 설치된 shadcn/ui 컴포넌트를 확인하세요. 추가 컴포넌트는{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">
            npx shadcn@latest add [name]
          </code>
          으로 설치할 수 있습니다.
        </p>
      </div>
      <ComponentShowcase />
    </div>
  );
}
