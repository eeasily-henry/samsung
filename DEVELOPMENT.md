# 개발 환경 (Development Environment)

이 문서는 `samsung` 프로젝트의 현재 개발 환경을 정리한 것입니다. (작성일: 2026-06-05)

## 개요

Next.js 기반 웹 프로젝트로, **shadcn/ui** 와 **IBM Carbon Design System** 두 UI 라이브러리를 함께 설치해 비교/평가하는 것이 목적입니다. (자세한 비교는 `COMPARISON.md` 참고)

> ⚠️ **주의:** 이 저장소는 일반적인 Next.js 와 다릅니다. API · 컨벤션 · 파일 구조가 학습 데이터와 다를 수 있으므로, 코드 작성 전 `node_modules/next/dist/docs/` 의 해당 가이드를 먼저 확인하고 deprecation 안내를 따르세요. (`AGENTS.md`)

## 런타임 / 도구 버전

| 항목 | 버전 |
|---|---|
| Node.js | v22.22.2 |
| npm | 10.9.7 |
| Next.js | 16.2.7 |
| React / React DOM | 19.2.4 |
| TypeScript | ^5 |
| Tailwind CSS | ^4 |

## 주요 의존성

### UI / 스타일
- **shadcn** (^4.10.0) — CLI로 소스 복사 방식. 컴포넌트는 `src/components/ui/*` 에 위치
- **@carbon/react** (^1.109.0) — IBM Carbon Design System (npm 패키지)
- **radix-ui** (^1.4.3) — shadcn 컴포넌트의 primitive
- **tailwindcss** (^4) + **@tailwindcss/postcss** — 유틸리티 스타일
- **sass** (^1.100.0) — Carbon SCSS (`src/app/carbon.scss`)
- **lucide-react** (^1.17.0) — 아이콘
- **class-variance-authority**, **clsx**, **tailwind-merge**, **tw-animate-css** — 클래스/variant 유틸

### 개발 도구
- **eslint** (^9) + **eslint-config-next** (16.2.7) — flat config (`eslint.config.mjs`)
- **@types/node** (^20), **@types/react** (^19), **@types/react-dom** (^19)

## npm 스크립트

```bash
npm run dev     # 개발 서버 (next dev) — http://localhost:3000
npm run build   # 프로덕션 빌드 (next build)
npm run start   # 프로덕션 서버 (next start)
npm run lint    # ESLint (eslint)
```

## 프로젝트 구조

```
samsung/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx            # 루트 레이아웃
│   │   ├── page.tsx              # 홈
│   │   ├── globals.css           # Tailwind v4 전역 스타일
│   │   ├── carbon.scss           # Carbon SCSS 진입점
│   │   ├── compare/page.tsx      # shadcn vs Carbon 한 화면 비교
│   │   └── image-generator/      # 이미지 생성기 (shadcn / carbon 버전)
│   │       ├── page.tsx
│   │       ├── shadcn-generator.tsx
│   │       └── carbon-generator.tsx
│   ├── components/ui/            # shadcn 컴포넌트 (소스 복사본)
│   │   ├── button.tsx  input.tsx  textarea.tsx  checkbox.tsx
│   │   ├── label.tsx   card.tsx   skeleton.tsx   slider.tsx  select.tsx
│   └── lib/
│       ├── utils.ts             # cn() 등 유틸
│       └── image-gen.ts         # 이미지 생성 로직
├── public/                      # 정적 에셋
├── AGENTS.md / CLAUDE.md        # 에이전트 지침
├── COMPARISON.md                # shadcn vs Carbon 비교 문서
├── components.json              # shadcn 설정 (style: radix-nova)
├── next.config.ts               # Next.js 설정
├── tsconfig.json                # TS 설정 (paths: @/* → ./src/*)
├── eslint.config.mjs            # ESLint flat config
├── postcss.config.mjs           # PostCSS (@tailwindcss/postcss)
└── package.json
```

## 설정 요점

- **TypeScript:** `strict: true`, `moduleResolution: bundler`, 경로 별칭 `@/*` → `./src/*`
- **shadcn:** `components.json` — style `radix-nova`, baseColor `neutral`, CSS 변수 사용, RSC 활성화, 아이콘 lucide
- **Carbon:** Turbopack 폰트 경로 문제를 피하려 IBM Plex 폰트를 `use-akamai-cdn: true` 로 CDN 로드 (`COMPARISON.md` 참고)
- **PostCSS:** `@tailwindcss/postcss` 플러그인만 사용

## Git

- 원격: `eeasily-henry/samsung`
- 작업 브랜치: `claude/lucid-feynman-Po2oS`
