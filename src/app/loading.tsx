import { Loader2Icon } from "lucide-react";

// 라우트 전환 시 표시되는 로딩 UI
export default function Loading() {
  return (
    <div className="flex items-center justify-center py-32">
      <Loader2Icon className="size-6 animate-spin text-muted-foreground" />
      <span className="sr-only">로딩 중...</span>
    </div>
  );
}
