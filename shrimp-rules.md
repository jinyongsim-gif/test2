# Development Guidelines

> AI Agent 전용 작업 규칙. 일반 개발 지식은 생략하고 이 프로젝트 고유 규칙만 기술한다.

## 1. 프로젝트 개요

- 프로젝트 이름: **Notion CMS Blog**
- Notion을 CMS로 쓰는 개인 개발 블로그. 현재 상태: **스타터킷 → 블로그 전환 초기 단계**
- ⚠️ **Next.js 버전은 16.3.6 기준**. 초기 요구사항의 Next.js 15가 아니다 (PRD v1.1에서 확정). Next.js 15 문법·예제를 적용하지 말 것
- 스택: `next@16.3.6`(App Router, Turbopack), `react@19.2.8`, TypeScript strict, Tailwind CSS v4, shadcn/ui(`base-nova` 스타일 = **Base UI 기반**), `lucide-react`, `next-themes`, `sonner`
- 요구사항 원본: `docs/PRD.md` / 작업 순서: `docs/ROADMAP.md` — **기능 구현 전 반드시 두 문서의 해당 절을 확인**
- 경로 별칭: `@/*` → `./src/*`

## 2. 디렉토리 구조 및 배치 규칙

| 경로                        | 용도                                  | 규칙                                                                                                    |
| --------------------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `src/app/`                  | 라우트                                | 블로그 라우트: `/`, `/posts/[slug]`, `/category/[category]`, `/search`                                  |
| `src/app/examples/`         | 스타터킷 예제                         | 삭제 시 `src/config/site.ts`의 `mainNav` "예제" 항목, `src/app/page.tsx`의 `/examples` 링크도 함께 제거 |
| `src/components/ui/`        | shadcn/ui 생성 컴포넌트               | **직접 작성 금지**. `npx shadcn@latest add <name>`으로만 추가                                           |
| `src/components/layout/`    | 헤더·푸터·모바일 내비                 | 기존 파일 확장, 새 헤더 파일 생성 금지                                                                  |
| `src/components/blog/`      | 블로그 전용 컴포넌트                  | `post-card.tsx`, `post-list.tsx`, `category-filter.tsx`, `search-input.tsx`, `post-content.tsx`         |
| `src/components/providers/` | Context Provider 래퍼                 | 클라이언트 경계 분리용                                                                                  |
| `src/lib/notion.ts`         | Notion 클라이언트·조회 함수           | **Notion API 호출은 이 파일에서만**                                                                     |
| `src/lib/utils.ts`          | `cn` 재export                         | `cn`은 npm `cn` 패키지. `clsx`/`tailwind-merge` 추가 금지                                               |
| `src/types/post.ts`         | `Post`, `PostDetail`, `Category` 타입 | PRD 3.4절 모델과 일치 유지                                                                              |
| `src/config/site.ts`        | 사이트명·설명·URL·내비·링크           | 헤더/모바일 내비/푸터/메타데이터의 단일 소스                                                            |

## 3. 코드 스타일

- **TypeScript strict mode 유지**: `tsconfig.json`의 `"strict": true` 변경 금지. `any`, `@ts-ignore`, `@ts-expect-error`, 근거 없는 non-null 단언(`!`) 사용 금지 — 타입 가드·`unknown` + 좁히기로 해결
- **ESLint 규칙 준수**: `eslint.config.mjs`(`next/core-web-vitals` + `next/typescript` + `prettier`) 위반 시 코드를 수정한다. `eslint-disable` 주석으로 우회 금지, 규칙 완화를 위한 설정 파일 수정 금지

- 들여쓰기 스페이스 2칸, 큰따옴표, 세미콜론, trailing comma `all`, printWidth 80 (`.prettierrc`)
- 변수명 camelCase, 함수명 동사 시작 (`getPublishedPosts`, `handleNavigate`). React 컴포넌트는 PascalCase
- 파일명 kebab-case (`post-card.tsx`)
- 컴포넌트는 named export (`export function PostCard`). 단, `page.tsx`/`layout.tsx`/`error.tsx` 등 라우트 파일은 default export
- **주석은 한국어**. 컴포넌트 선언 위에 한 줄 역할 주석 작성 (기존 파일 패턴: `// 하단 푸터`)
- import 순서: 외부 패키지 → 빈 줄 → `@/` 내부 모듈 → 상대 경로 → CSS
- UI 문구는 한국어

## 4. Next.js 16 구현 규칙

⚠️ **학습 데이터의 Next.js 지식을 신뢰하지 말 것.** Next.js API 사용 전 `node_modules/next/dist/docs/01-app/`의 해당 문서를 Read로 확인한다.

| 항목              | 해야 할 것                                                 | 하지 말 것                                    |
| ----------------- | ---------------------------------------------------------- | --------------------------------------------- |
| 동적 params       | `const { slug } = await params`                            | `params.slug` 동기 접근                       |
| Props 타입        | 전역 `PageProps<"/posts/[slug]">`, `LayoutProps<"/">` 사용 | 수동 `{ params: { slug: string } }` 타입 정의 |
| error.tsx         | props는 `{ error, retry }`, `"use client"` 필수            | `reset` prop 사용                             |
| ISR (MVP)         | `export const revalidate = 3600` + `generateStaticParams`  | `cacheComponents` 활성화, `'use cache'` 사용  |
| 요청 가로채기     | `proxy.ts`                                                 | `middleware.ts` 생성                          |
| 번들러            | Turbopack 기본 사용                                        | `next.config.ts`에 webpack 설정 추가          |
| `useSearchParams` | 사용 컴포넌트를 `<Suspense>`로 감싸기                      | Suspense 없이 정적 페이지에 배치              |
| 404               | 없는 글/`초안` 글은 `notFound()` 호출                      | 빈 화면 또는 리다이렉트                       |

- 타입 체크는 `npm run typecheck`(`next typegen && tsc --noEmit`)로만 실행 — 전역 Props 타입이 typegen으로 생성됨

## 5. shadcn/ui (Base UI) 사용 규칙

- 트리거·합성은 **`render` prop** 사용. `asChild` 사용 금지
  - ✅ `<SheetTrigger render={<Button variant="ghost" size="icon" />}>`
  - ❌ `<SheetTrigger asChild><Button /></SheetTrigger>`
- `Link`를 버튼 모양으로: `className={cn(buttonVariants({ variant, size }))}`
  - ❌ `<Button><Link /></Button>`
- 버튼 내 아이콘 위치는 `data-icon="inline-end" | "inline-start"`
- 색상은 디자인 토큰 클래스만 사용 (`text-muted-foreground`, `bg-muted`, `border`). 하드코딩 색상(`text-gray-500`, `#fff`) 금지 — 다크 모드 깨짐
- 컨테이너 폭: 페이지 `container mx-auto max-w-6xl px-4`, 본문 읽기 영역 `max-w-3xl`(약 65ch~768px)
- 컴포넌트 추가 전 PRD 5.3절 기존 컴포넌트(`Card`, `Badge`, `Input`, `Tabs`, `Separator`, `Sheet`, `Button`)로 해결 가능한지 먼저 확인

## 6. Notion 연동 규칙

- `@notionhq/client`는 **서버 컴포넌트 / `src/lib/notion.ts`에서만** import. `"use client"` 파일에서 import 금지
- `src/lib/notion.ts` 최상단에 `import "server-only"` 적용 권장 (설치 필요 시 `npm install server-only`)
- 모든 목록 조회에 `Status = 발행됨` 필터 필수. `초안`은 상세·카테고리·검색·sitemap 어디에도 노출 금지
- 목록 정렬: `Published` 내림차순
- `has_more` / `next_cursor` 루프로 전체 페이지네이션 처리 (100건 제한)
- 슬러그: `Slug` 속성 우선, 없으면 페이지 ID
- 매퍼 함수에서 Notion 응답 → `Post` 타입 변환. 반환 타입에 `any` 금지
- 요청 제한(초당 3회) 대비 재시도 로직 포함, 블록 조회 시 하위 블록 재귀 처리
- 미지원 블록: 렌더링 생략 + `console.warn` 서버 로그
- 검색(F4)은 이미 조회한 글 목록으로 클라이언트 필터링. 검색용 Notion API 추가 호출 금지

## 7. 환경 변수 규칙

- 서버 전용: `NOTION_API_KEY`, `NOTION_DATABASE_ID` — **`NEXT_PUBLIC_` 접두사 절대 금지**
- 클라이언트 공개 허용: `NEXT_PUBLIC_SITE_URL`만
- 새 환경 변수 추가 시 **동시 수정**: `.env.example`(값 없이 키 + 한국어 주석), `docs/PRD.md` 6.4절, `README.md`
- `.env.local` 커밋 금지 (`.gitignore`의 `.env*` 규칙 유지, `!.env.example` 예외 유지)

## 8. 파일 동시 수정 규칙

| 변경 내용                 | 함께 수정할 파일                                                                    |
| ------------------------- | ----------------------------------------------------------------------------------- |
| 내비게이션 항목 추가/삭제 | `src/config/site.ts`의 `mainNav`만 (헤더·모바일 내비가 자동 반영)                   |
| 블로그 이름·설명 변경     | `src/config/site.ts` (루트 `metadata`가 참조)                                       |
| `Post` 타입 필드 변경     | `src/types/post.ts`, `src/lib/notion.ts` 매퍼, `post-card.tsx`, `docs/PRD.md` 3.4절 |
| Notion DB 속성 추가       | `src/lib/notion.ts` 매퍼, `src/types/post.ts`, `docs/PRD.md` 3.1/3.2절              |
| 신규 공개 라우트 추가     | `src/app/sitemap.ts` (존재 시), 필요 시 `mainNav`                                   |
| 블로그 컴포넌트 추가      | `src/components/blog/`에 배치                                                       |
| ROADMAP 작업 완료         | `docs/ROADMAP.md`의 해당 체크박스 `[x]` 갱신                                        |
| 문서 수정                 | 모든 문서는 한국어로 작성                                                           |

## 9. 워크플로

1. `docs/ROADMAP.md`에서 현재 Phase와 작업 항목 확인
2. `feature/기능명` 브랜치에서 작업 (`main` 직접 커밋 금지)
3. Next.js API 사용 시 `node_modules/next/dist/docs/` 확인
4. 구현 후 순서대로 실행, 모두 통과해야 완료:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
5. 커밋 전 **반드시 `npm run lint` 실행**. 커밋 메시지는 한국어
6. Phase 완료 시 ROADMAP 완료 기준 체크

데이터 흐름: `Notion DB → src/lib/notion.ts (서버) → 서버 컴포넌트 page.tsx (ISR 3600초) → props → 클라이언트 컴포넌트(검색 등)`

## 10. AI 판단 기준

- **서버 vs 클라이언트 컴포넌트**
  - 상태·이벤트·브라우저 API·`useSearchParams` 필요 → `"use client"`, 최소 단위로 분리
  - 그 외 → 서버 컴포넌트 (기본값)
- **Next.js API 사용법이 불확실** → `node_modules/next/dist/docs/` 검색 → 없으면 context7 MCP 조회 → 추측 금지
- **UI 컴포넌트 필요** → `src/components/ui/`에 있음? → 사용 / 없음 → shadcn MCP 또는 `npx shadcn@latest add` / shadcn에 없음 → `src/components/blog/`에 직접 작성
- **PRD와 ROADMAP 충돌** → PRD 우선 (특히 2.1절 Next.js 16 지침)
- **MVP 범위 판단** → PRD 8.1절만 MVP. 카테고리·검색은 Post-MVP(ROADMAP Phase 4)
- **본문 렌더러 미확정** → PRD 2장 "구현 단계에서 확정" 항목. Phase 3-3에서 결정하고 PRD 2장 표 갱신

## 11. 금지 사항

- ❌ Notion API 키를 클라이언트 번들에 노출 (`NEXT_PUBLIC_NOTION_*`, 클라이언트 컴포넌트에서 `notion.ts` import)
- ❌ `초안` 글을 어떤 경로로든 노출
- ❌ `src/components/ui/*` 수동 작성 또는 Radix 기반 shadcn 코드 붙여넣기 (`asChild`, `@radix-ui/*`)
- ❌ `params`를 await 없이 사용, `error.tsx`에서 `reset` 사용, `middleware.ts` 생성
- ❌ MVP 단계에서 `cacheComponents: true` 활성화
- ❌ `next.config.ts`에 webpack 설정 추가
- ❌ `any` 타입 사용
- ❌ 하드코딩 색상 클래스, 영어 주석, 영어 커밋 메시지
- ❌ `AGENTS.md`의 `next dev` 자동 생성 블록 삭제
- ❌ `.env.local` 및 `shrimp_data/` 내부 파일을 기능 코드에서 참조
- ❌ lint/typecheck/build 실패 상태로 작업 완료 처리
