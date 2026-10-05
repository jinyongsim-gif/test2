"use client"; // 에러 바운더리는 클라이언트 컴포넌트여야 합니다

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

// 라우트 세그먼트 에러 UI
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // 필요 시 에러 리포팅 서비스로 전송
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 py-32 text-center">
      <h1 className="text-3xl font-bold tracking-tight">문제가 발생했습니다</h1>
      <p className="text-muted-foreground">
        잠시 후 다시 시도해 주세요.
        {error.digest && (
          <span className="mt-1 block font-mono text-xs">
            오류 코드: {error.digest}
          </span>
        )}
      </p>
      <Button onClick={() => retry()}>다시 시도</Button>
    </div>
  );
}
