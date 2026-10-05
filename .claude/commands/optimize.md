---
description: 지정한 파일/폴더(또는 전체 프로젝트)의 성능을 분석하고 최적화합니다
argument-hint: [파일 또는 폴더 경로] [집중 영역: rendering|bundle|data|image|all]
allowed-tools: Read, Grep, Glob, Edit, Bash(npm run lint:*), Bash(npm run typecheck:*), Bash(npm run build:*)
---

# 성능 최적화

대상: $ARGUMENTS

인자가 비어 있으면 `src/app/`, `src/components/`, `src/lib/` 전체를 대상으로 하고, 집중 영역이 없으면 `all`로 간주합니다.

## 사전 준비

- 이 프로젝트는 Next.js 16을 사용합니다. 코드를 수정하기 전에 `node_modules/next/dist/docs/`의 관련 가이드를 먼저 읽고, 학습 데이터와 다른 API·규칙·deprecation 공지를 확인하세요.
- `package.json`으로 사용 중인 라이브러리 버전을 확인하세요.

## 1단계: 분석

대상 코드를 읽고 아래 항목별로 문제를 찾으세요. 추측이 아니라 코드 근거(`파일:라인`)가 있는 것만 보고합니다.

### rendering (React 렌더링)

- 불필요한 `"use client"` — Server Component로 둘 수 있는 컴포넌트
- 클라이언트 경계가 너무 높아 하위 트리 전체가 클라이언트 번들에 포함되는 경우
- 불필요한 리렌더링: 매 렌더마다 새로 생성되는 객체/함수 props, 잘못된 `key`, 과도한 상태 끌어올리기
- 무거운 계산을 렌더 중에 반복 수행하는 경우
- `useEffect`로 파생 상태를 계산하는 등 불필요한 effect

### bundle (번들 크기)

- 큰 라이브러리 전체 import (예: 아이콘/유틸 라이브러리의 barrel import)
- 초기 로딩에 필요 없는 컴포넌트 — `next/dynamic` 지연 로딩 후보
- 사용하지 않는 import/의존성

### data (데이터 페칭·캐싱)

- 순차 실행되는 독립적인 fetch — 병렬화(`Promise.all`) 후보
- 캐싱 전략 누락 또는 부적절한 캐싱 (Next.js 16 문서 기준으로 확인)
- 스트리밍/`Suspense`로 분리할 수 있는 느린 구간
- 클라이언트에서 불필요하게 수행하는 데이터 페칭

### image (이미지·폰트·정적 자원)

- `<img>` 대신 `next/image` 미사용, `sizes`/`priority` 누락 (LCP 이미지)
- `next/font` 미사용 또는 폰트 로딩 방식 문제
- 레이아웃 시프트(CLS)를 유발하는 크기 미지정 요소

## 2단계: 보고

수정 전에 다음 형식으로 먼저 요약하세요.

| 우선순위 | 위치 | 문제 | 개선 방안 | 예상 효과 |
| -------- | ---- | ---- | --------- | --------- |

- 우선순위: 🔴 높음 / 🟡 중간 / 🟢 낮음
- 효과가 불확실하거나 동작이 바뀔 수 있는 항목은 명시하세요.

## 3단계: 적용

- 우선순위가 높은 항목부터 적용합니다.
- 기존 동작과 UI는 그대로 유지해야 합니다. 동작이 바뀌는 변경은 적용하지 말고 제안만 하세요.
- 코드 스타일: 스페이스 2칸, camelCase, 함수명은 동사로 시작, 주석은 한국어.
- 측정 근거 없는 과도한 `useMemo`/`useCallback`/`memo` 남용은 피하세요.

## 4단계: 검증

1. `npm run lint`
2. `npm run typecheck`
3. `npm run build` — 빌드 출력의 라우트별 번들 크기를 변경 전후로 비교할 수 있으면 비교하세요.

실패하면 원인을 수정하고, 끝까지 해결되지 않으면 그대로 보고하세요.

## 최종 결과

- 적용한 변경 사항 목록 (`파일:라인`)
- 적용하지 않고 제안만 한 항목과 그 이유
- 검증 결과 (lint / typecheck / build)
