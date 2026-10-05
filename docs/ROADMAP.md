# 개인 개발 블로그 개발 로드맵

| 항목      | 내용                                    |
| --------- | --------------------------------------- |
| 기준 문서 | [PRD v1.1](./PRD.md)                    |
| 작성일    | 2026-10-06                              |
| 총 기간   | 약 9~14일 (5개 Phase)                   |
| 기술 기준 | Next.js 16.3.6 (App Router), React 19.2 |

---

## 전체 일정 요약

| Phase | 이름               | 예상 소요 | 누적 기간 | 핵심 산출물                                     |
| ----- | ------------------ | --------- | --------- | ----------------------------------------------- |
| 1     | 프로젝트 초기 설정 | 1~2일     | 1~2일     | Notion 연동 환경, 기본 레이아웃                 |
| 2     | 공통 모듈 개발     | 2~3일     | 3~5일     | Notion 조회 함수, 공통 컴포넌트, 공통 타입      |
| 3     | 핵심 기능 개발     | 3~4일     | 6~9일     | 글 목록·상세 페이지, 본문 렌더링 (**MVP 핵심**) |
| 4     | 추가 기능 개발     | 2~3일     | 8~12일    | 카테고리 필터링, 검색, SEO                      |
| 5     | 최적화 및 배포     | 1~2일     | 9~14일    | 성능·반응형 개선, Vercel 배포                   |

```
Day  1    2    3    4    5    6    7    8    9    10   11   12   13   14
P1   ████████
P2        ░░░░██████████████
P3                       ░░░░████████████████████
P4                                          ░░░░██████████████
P5                                                         ░░░░████████
     █ 최소 기간   ░ 버퍼(최대 기간까지)
```

### 공통 원칙

- 구현 전 `node_modules/next/dist/docs/`의 해당 가이드를 먼저 확인한다 (PRD 2.1절).
- 각 Phase 종료 시 `npm run lint`, `npm run typecheck`, `npm run build`가 모두 통과해야 다음 Phase로 넘어간다.
- 커밋 전 반드시 린트를 실행하고, 기능 단위로 `feature/기능명` 브랜치에서 작업한다.

---

## Phase 1: 프로젝트 초기 설정

- **예상 소요**: 1~2일
- **목표**: Notion API를 호출할 수 있는 개발 환경과 블로그의 기본 골격을 갖춘다.
- **이유**: 견고한 기반 없이는 기능 개발이 어려움

### 작업 항목

**1-1. Next.js 프로젝트 구조 설정**

- [ ] PRD 6.2절 기준 디렉토리 생성 (`src/components/blog/`, `src/types/`)
- [ ] 불필요한 예제 페이지(`src/app/examples/`) 정리 여부 결정
- [ ] `src/config/site.ts`에 블로그 이름·설명·내비게이션 정보 반영
- [ ] `next.config.ts` 확인 (Turbopack 기본, `cacheComponents` 미사용 유지)

**1-2. Notion API 연동 환경 구축**

- [ ] 패키지 설치: `npm install @notionhq/client notion-to-md`
- [ ] Notion Internal Integration 생성 (읽기 권한)
- [ ] PRD 3장 구조로 Notion 데이터베이스 생성 (Title, Category, Tags, Published, Status, Slug, Description)
- [ ] 데이터베이스에 Integration 연결 및 샘플 글 3건 이상 작성 (`초안` 1건 포함)
- [ ] `.env.local`에 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 등록
- [ ] `.env.example` 작성 (값 없이 키 이름만)
- [ ] `src/lib/notion.ts`에 Notion 클라이언트 초기화 코드 작성

**1-3. 기본 레이아웃 구조 생성**

- [ ] `src/app/layout.tsx`에 Header·Footer·ThemeProvider 배치 확인
- [ ] 본문 영역 최대 너비 컨테이너 정의
- [ ] `error.tsx`, `not-found.tsx`, `loading.tsx` 블로그 문구로 수정

### 산출물

- Notion 데이터베이스 및 Integration
- `.env.local`, `.env.example`
- `src/lib/notion.ts` (클라이언트 초기화)
- 블로그용 기본 레이아웃

### 완료 기준

- [ ] 서버 컴포넌트에서 Notion 클라이언트로 데이터베이스 조회 요청이 성공한다
- [ ] `NOTION_API_KEY`가 클라이언트 번들에 포함되지 않는다 (`NEXT_PUBLIC_` 미사용)
- [ ] `.env.local`이 Git 추적 대상에서 제외되어 있다
- [ ] `npm run dev`로 헤더·푸터가 있는 빈 홈 화면이 표시된다
- [ ] `npm run lint`, `npm run typecheck`, `npm run build` 통과

---

## Phase 2: 공통 모듈 개발

- **예상 소요**: 2~3일
- **목표**: 모든 페이지에서 재사용할 데이터 조회 함수, 컴포넌트, 타입을 완성한다.
- **이유**: 모든 기능에서 재사용되는 코드를 먼저 만들어야 중복 방지

### 작업 항목

**2-1. 공통 타입 정의 (`src/types/post.ts`)**

- [ ] `Post` 타입 (id, slug, title, category, tags, publishedAt, description)
- [ ] `PostDetail` 타입 (`Post` + content)
- [ ] `Category` 타입 (name, count)

**2-2. Notion API 공통 함수 (`src/lib/notion.ts`)**

- [ ] `fetchPages()`: `Status = 발행됨` 필터 + `Published` 내림차순 조회, `has_more`/`next_cursor` 페이지네이션 처리
- [ ] `fetchPageContent(pageId)`: 페이지 블록 조회 (하위 블록 재귀 처리) 후 Markdown 변환
- [ ] Notion 응답 객체 → `Post` 변환 매퍼 (`Slug` 없으면 페이지 ID 사용)
- [ ] 상위 함수 작성: `getPublishedPosts()`, `getPostBySlug(slug)`, `getPostsByCategory(category)`, `getCategories()`
- [ ] API 실패 시 에러 처리 및 요청 제한(초당 3회) 대비 재시도 로직

**2-3. 공통 컴포넌트**

- [ ] `Header`: 기존 `site-header.tsx` 확장 (로고, 카테고리 링크, 검색 진입점, 테마 토글)
- [ ] `Footer`: 기존 `site-footer.tsx` 블로그용으로 수정
- [ ] `Card`: `src/components/blog/post-card.tsx` (카테고리 배지, 제목, 요약, 태그, 발행일)
- [ ] 모바일 내비게이션: 기존 `mobile-nav.tsx`(Sheet) 연결

### 산출물

- `src/types/post.ts`
- `src/lib/notion.ts` (조회 함수 일체)
- `site-header.tsx`, `site-footer.tsx`, `post-card.tsx`

### 완료 기준

- [ ] `fetchPages()`가 `발행됨` 글만 최신순으로 반환하고, `초안` 글은 포함되지 않는다
- [ ] `fetchPageContent()`가 샘플 글 본문을 Markdown 문자열로 반환한다
- [ ] 100건 초과 상황을 가정한 페이지네이션 로직이 구현되어 있다
- [ ] 모든 조회 함수의 반환값이 공통 타입으로 타입 지정되어 있다 (`any` 미사용)
- [ ] `PostCard`가 목업 데이터로 라이트/다크 모드 모두 정상 표시된다
- [ ] `npm run lint`, `npm run typecheck`, `npm run build` 통과

---

## Phase 3: 핵심 기능 개발

- **예상 소요**: 3~4일
- **목표**: 블로그의 MVP 핵심인 글 목록과 글 상세 페이지를 완성한다.
- **이유**: 블로그의 가장 기본이 되는 기능

### 작업 항목

**3-1. 블로그 글 목록 페이지 (`/`)**

- [ ] `src/components/blog/post-list.tsx` 작성 (모바일 1열 / 데스크톱 2~3열 그리드)
- [ ] 홈 페이지를 서버 컴포넌트로 구현하고 `getPublishedPosts()` 연동
- [ ] Hero 소개 문구 영역 추가
- [ ] `export const revalidate = 3600` 설정 (ISR)
- [ ] 글이 없을 때 빈 상태 안내 문구 표시

**3-2. 블로그 글 상세 페이지 (`/posts/[slug]`)**

- [ ] `generateStaticParams`로 발행된 글의 슬러그 사전 생성
- [ ] `const { slug } = await params` 형태로 Promise `params` 처리 (Next.js 16)
- [ ] 상단 메타 정보 (카테고리 배지, 제목, 발행일, 태그)
- [ ] 없는 글 또는 `초안` 글 접근 시 `notFound()` 호출
- [ ] 하단 "목록으로 돌아가기" 링크
- [ ] `export const revalidate = 3600` 설정

**3-3. Notion 컨텐츠 렌더링 (`src/components/blog/post-content.tsx`)**

- [ ] Markdown 렌더러 선정 및 적용 (PRD 2장 "구현 단계에서 확정" 항목 결정)
- [ ] 지원 블록 렌더링: 문단, H1~H3, 순서/비순서 목록, 코드 블록, 인용, 콜아웃, 이미지, 구분선, 링크, 표
- [ ] 코드 블록 구문 강조 적용
- [ ] 본문 타이포그래피 (최대 너비 `65ch~768px`, 줄 간격, 다크 모드 색상)
- [ ] 미지원 블록은 무시하고 서버 로그에 경고 출력

### 산출물

- `src/app/page.tsx` (홈)
- `src/app/posts/[slug]/page.tsx` (상세)
- `post-list.tsx`, `post-content.tsx`

### 완료 기준

- [ ] 홈에 Notion의 `발행됨` 글만 최신순으로 표시된다 (PRD F1)
- [ ] 카드 클릭 시 상세 페이지로 이동하고, 본문이 서식을 유지한 채 렌더링된다 (PRD F2)
- [ ] PRD F2에 명시된 10종 블록이 모두 정상 렌더링된다
- [ ] `초안` 글의 슬러그로 직접 접근하면 404 페이지가 표시된다
- [ ] `npm run build` 결과에서 홈과 상세 페이지가 정적 생성(ISR)으로 표시된다
- [ ] `npm run lint`, `npm run typecheck`, `npm run build` 통과

---

## Phase 4: 추가 기능 개발

- **예상 소요**: 2~3일
- **목표**: 글 탐색 편의성과 검색엔진 노출을 위한 부가 기능을 추가한다.
- **이유**: 핵심 기능이 완성된 후 부가 기능 추가

> PRD 8.2절에서 카테고리 필터링·검색은 Post-MVP로 분류되어 있다. Phase 3까지 완료하면 MVP 배포가 가능하므로, 일정이 촉박하면 Phase 4의 SEO만 먼저 진행하고 Phase 5로 넘어갈 수 있다.

### 작업 항목

**4-1. 카테고리 필터링 (`/category/[category]`)**

- [ ] `src/components/blog/category-filter.tsx` 작성 (Tabs 또는 Badge, 글 개수 포함)
- [ ] 홈과 카테고리 페이지에 카테고리 필터 배치
- [ ] `/category/[category]` 페이지 구현 (`generateStaticParams` + `revalidate`)
- [ ] 한글 카테고리명의 URL 인코딩/디코딩 처리
- [ ] 존재하지 않는 카테고리 접근 시 404 처리

**4-2. 검색 기능**

- [ ] `src/components/blog/search-input.tsx` 클라이언트 컴포넌트 작성
- [ ] 제목·요약·태그 대상 클라이언트 측 필터링 (Notion API 추가 호출 없음)
- [ ] 검색어를 URL 쿼리(`?q=`)로 동기화
- [ ] `useSearchParams` 사용 컴포넌트를 `<Suspense>`로 감싸기
- [ ] 검색 결과 없음 안내 문구

**4-3. SEO 최적화**

- [ ] 루트 `layout.tsx`의 기본 `metadata` (title template, description, Open Graph)
- [ ] 상세 페이지 `generateMetadata` (await `params` 사용)
- [ ] `src/app/sitemap.ts` (발행된 글 + 카테고리 페이지 포함)
- [ ] `src/app/robots.ts`
- [ ] 시맨틱 HTML 점검 (`article`, `time`, 제목 계층 구조)

### 산출물

- `src/app/category/[category]/page.tsx`
- `category-filter.tsx`, `search-input.tsx`
- `sitemap.ts`, `robots.ts`, 페이지별 메타데이터

### 완료 기준

- [ ] 카테고리 선택 시 해당 카테고리의 발행된 글만 표시된다 (PRD F3)
- [ ] 검색어 입력 시 일치하는 글만 표시되고, 결과가 없으면 안내 문구가 나온다 (PRD F4)
- [ ] 검색 상태가 URL에 유지되어 새로고침·뒤로 가기 후에도 동일한 결과가 나온다
- [ ] 각 상세 페이지의 `<title>`, `description`, `og:*` 메타 태그가 글마다 다르게 생성된다
- [ ] `/sitemap.xml`, `/robots.txt`가 정상 응답하며 `초안` 글이 sitemap에 포함되지 않는다
- [ ] `npm run lint`, `npm run typecheck`, `npm run build` 통과

---

## Phase 5: 최적화 및 배포

- **예상 소요**: 1~2일
- **목표**: 품질 목표(Lighthouse 90점 이상)를 달성하고 실제 서비스로 배포한다.
- **이유**: 기능이 완성된 후 품질 향상

### 작업 항목

**5-1. 성능 최적화**

- [ ] Lighthouse 측정 후 병목 개선 (LCP 2.5초 이하 목표)
- [ ] Notion 이미지 URL 만료(약 1시간) 대응: 재검증 주기 점검 또는 이미지 프록시 검토
- [ ] 이미지 최적화 (`next/image` 적용 가능 여부 및 `remotePatterns` 설정)
- [ ] 폰트 로딩 및 클라이언트 번들 크기 점검 (불필요한 `'use client'` 제거)

**5-2. 반응형 디자인 개선**

- [ ] 360px / 640px / 1024px / 1440px 너비별 레이아웃 점검
- [ ] 모바일 내비게이션(Sheet) 동작 및 키보드 접근성 확인
- [ ] 코드 블록·표의 모바일 가로 스크롤 처리
- [ ] 라이트/다크 모드 색 대비 점검

**5-3. Vercel 배포**

- [ ] GitHub 저장소와 Vercel 프로젝트 연결
- [ ] Vercel Environment Variables에 `NOTION_API_KEY`, `NOTION_DATABASE_ID` 등록
- [ ] 프로덕션 배포 및 도메인 확인
- [ ] Notion에서 글을 `발행됨`으로 변경 후 재검증 주기 내 반영 확인
- [ ] `README.md`에 실행 방법·환경 변수·배포 절차 정리

### 산출물

- 프로덕션 배포 URL
- Lighthouse 측정 결과
- 갱신된 `README.md`

### 완료 기준

- [ ] Lighthouse 성능·접근성·SEO 점수 각 90점 이상 (PRD 1.4)
- [ ] 360px~1440px 전 구간에서 레이아웃 깨짐이 없다 (PRD F5)
- [ ] 프로덕션 URL에서 홈·상세·카테고리·검색이 모두 정상 동작한다
- [ ] Notion에서 발행한 새 글이 1시간 이내에 프로덕션에 반영된다
- [ ] 배포 후 1시간 이상 지난 시점에도 본문 이미지가 깨지지 않는다
- [ ] 클라이언트 번들 및 네트워크 응답에 API 키가 노출되지 않는다

---

## 리스크 및 일정 버퍼

| 리스크                                | 영향 Phase | 대응                                                            |
| ------------------------------------- | ---------- | --------------------------------------------------------------- |
| Next.js 16 API 변경으로 인한 시행착오 | 전체       | 구현 전 `node_modules/next/dist/docs/` 확인, 각 Phase 버퍼 활용 |
| Notion 블록 렌더링 복잡도             | Phase 3    | MVP 지원 블록만 우선 구현, 미지원 블록은 경고 로그 후 생략      |
| Notion 이미지 URL 만료                | Phase 3, 5 | 재검증 주기 유지, 필요 시 이미지 프록시를 Post-MVP로 분리       |
| Notion API 요청 제한                  | Phase 2, 3 | 재시도 로직, ISR 캐싱으로 호출 최소화                           |
| 일정 지연                             | Phase 4    | Phase 4의 카테고리·검색을 Post-MVP로 이연하고 MVP 먼저 배포     |

## Post-MVP 후보 (Phase 5 이후)

PRD 8.2절 기준으로 로드맵 완료 후 검토한다.

- 태그별 필터링
- 목차(TOC), 읽기 시간 표시
- 이전/다음 글 내비게이션
- 댓글(giscus 등), RSS 피드
- `cacheComponents` + `cacheTag` 기반 On-demand Revalidation (Notion 웹훅 연동)
