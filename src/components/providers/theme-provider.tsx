"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

// next-themes 래퍼 — 클라이언트 컴포넌트 경계를 분리하기 위해 사용합니다.
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
