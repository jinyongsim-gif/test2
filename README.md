# 개인 개발 블로그

Notion을 CMS로 활용하는 개인 기술 블로그입니다. Notion 데이터베이스에서 글을 작성하고 상태를 `발행됨`으로 바꾸면 별도 배포 없이 블로그에 자동으로 반영됩니다.

> 현재 단계: Next.js 16 + shadcn/ui 스타터킷 기반 위에 블로그 기능을 구현하는 중입니다. 상세 요구사항은 [docs/PRD.md](docs/PRD.md)를 참고하세요.

## 주요 기능

- Notion 데이터베이스에서 블로그 글 목록 가져오기
- 개별 글 상세 페이지 (Notion 본문 렌더링)
- 카테고리별 필터링
- 검색 기능
- 반응형 디자인 및 다크 모드

## 기술 스택

| 분류        | 기술                                                       |
| ----------- | ---------------------------------------------------------- |
| 프레임워크  | Next.js 16 (App Router, Turbopack), React 19               |
| 언어        | TypeScript                                                 |
| CMS         | Notion API (`@notionhq/client`)                            |
| 스타일링    | Tailwind CSS v4, tw-animate-css                            |
| UI 컴포넌트 | shadcn/ui (`base-nova` 스타일, Base UI 기반), lucide-react |
| 테마        | next-themes (라이트 / 다크 / 시스템)                       |
| 알림        | sonner (Toast)                                             |
| 코드 품질   | ESLint (flat config), Prettier + Tailwind 클래스 정렬      |
| 배포        | Vercel                                                     |

## Notion 데이터베이스 구조

| 속성      | 타입           | 설명                   |
| --------- | -------------- | ---------------------- |
| Title     | `title`        | 제목                   |
| Category  | `select`       | 카테고리               |
| Tags      | `multi_select` | 태그                   |
| Published | `date`         | 발행일                 |
| Status    | `select`       | 상태 (`초안`/`발행됨`) |
| Content   | page content   | 본문                   |

## 시작하기

```bash
npm install
cp .env.example .env.local   # 값 채우기
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 여세요.

### 환경 변수

`.env.example`을 복사해 `.env.local`을 만들고 값을 설정합니다. `.env.local`은 Git에 커밋되지 않습니다.

| 변수명                 | 설명                                              |
| ---------------------- | ------------------------------------------------- |
| `NOTION_API_KEY`       | Notion Integration 시크릿 키 (서버 전용)          |
| `NOTION_DATABASE_ID`   | 블로그 글 데이터베이스 ID                         |
| `NEXT_PUBLIC_SITE_URL` | 사이트 기본 URL (기본값: `http://localhost:3000`) |

Notion Integration 생성 및 데이터베이스 연결 방법은 [docs/PRD.md](docs/PRD.md)의 구현 단계를 참고하세요.

## 스크립트

| 명령어                 | 설명                                |
| ---------------------- | ----------------------------------- |
| `npm run dev`          | 개발 서버 실행 (Turbopack)          |
| `npm run build`        | 프로덕션 빌드                       |
| `npm run start`        | 프로덕션 서버 실행                  |
| `npm run lint`         | ESLint 검사                         |
| `npm run lint:fix`     | ESLint 자동 수정                    |
| `npm run format`       | Prettier로 전체 포맷팅              |
| `npm run format:check` | 포맷팅 검사                         |
| `npm run typecheck`    | 라우트 타입 생성 후 TypeScript 검사 |

## 폴더 구조

```
src/
├── app/                      # App Router 라우트
│   ├── layout.tsx            # 루트 레이아웃 (테마, 헤더, 푸터, 토스트)
│   ├── page.tsx              # 홈 (블로그 글 목록 예정)
│   ├── examples/             # shadcn/ui 컴포넌트 예제 페이지
│   ├── loading.tsx           # 로딩 UI
│   ├── error.tsx             # 에러 UI
│   ├── not-found.tsx         # 404 페이지
│   └── globals.css           # Tailwind 및 테마 토큰 (CSS 변수)
├── components/
│   ├── ui/                   # shadcn/ui 컴포넌트 (직접 수정 가능)
│   ├── layout/               # 헤더, 푸터, 모바일 내비게이션
│   ├── providers/            # ThemeProvider 등 전역 Provider
│   └── theme-toggle.tsx      # 테마 전환 버튼
├── config/
│   └── site.ts               # 사이트 이름, 설명, 내비게이션 설정
└── lib/
    └── utils.ts              # cn() 유틸리티
```

## 자주 하는 작업

### 사이트 정보 / 메뉴 변경

`src/config/site.ts`에서 사이트 이름, 설명, 내비게이션 링크를 수정하면 헤더·푸터·메타데이터에 모두 반영됩니다.

### shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add select textarea table
```

컴포넌트는 `src/components/ui/`에 생성되며 자유롭게 수정할 수 있습니다.

> **참고:** 이 스타터킷은 Base UI 기반 스타일을 사용합니다. Radix의 `asChild` 대신 `render` prop으로 트리거 요소를 지정합니다.
>
> ```tsx
> <DialogTrigger render={<Button variant="outline" />}>열기</DialogTrigger>
> ```
>
> 링크를 버튼처럼 보이게 하려면 `buttonVariants`를 사용하세요.
>
> ```tsx
> <Link href="/examples" className={buttonVariants({ variant: "outline" })}>
>   예제
> </Link>
> ```

### 테마 색상 변경

`src/app/globals.css`의 `:root`(라이트)와 `.dark`(다크) CSS 변수를 수정합니다. [shadcn/ui Themes](https://ui.shadcn.com/themes)에서 생성한 값을 붙여넣을 수도 있습니다.

### 새 페이지 추가

`src/app/about/page.tsx`처럼 폴더와 `page.tsx`를 만들면 `/about` 라우트가 생성됩니다.

## 참고 문서

- [Notion API 문서](https://developers.notion.com)
- [Next.js 문서](https://nextjs.org/docs) (버전별 문서는 `node_modules/next/dist/docs/`에도 포함)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [shadcn/ui 문서](https://ui.shadcn.com/docs)
- [Base UI 문서](https://base-ui.com)
