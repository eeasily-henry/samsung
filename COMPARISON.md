# shadcn/ui vs Carbon Design System

이 프로젝트에는 두 UI 라이브러리가 함께 설치되어 있습니다. 같은 화면 비교는 `/compare` 라우트(`src/app/compare/page.tsx`)에서 확인할 수 있습니다.

## 설치 방식

| | shadcn/ui | Carbon |
|---|---|---|
| 설치 형태 | CLI로 **소스 복사** (`npx shadcn add ...`) | **npm 패키지** (`@carbon/react`) |
| 코드 위치 | `src/components/ui/*` (내 코드로 편입) | `node_modules` (의존성) |
| 스타일 | Tailwind CSS v4 (`globals.css`) | SCSS (`@carbon/react`, `src/app/carbon.scss`) |
| 버전 관리 | 컴포넌트별 수동 (재실행해서 갱신) | `package.json` 버전 핀 |

## 핵심 차이

### 1. 소유권 / 커스터마이징
- **shadcn/ui**: 컴포넌트 코드가 내 저장소로 복사됨. Radix UI primitive + Tailwind 기반이라 무엇이든 직접 수정 가능. "라이브러리"라기보다 "복붙 가능한 레시피".
- **Carbon**: IBM이 관리하는 완성형 디자인 시스템. 패키지로 받아 쓰며 토큰/테마로 커스터마이즈하지만 컴포넌트 내부를 직접 고치진 않음.

### 2. 디자인 철학
- **shadcn/ui**: 의도적으로 중립적·미니멀. 브랜드 디자인을 자유롭게 입히는 출발점.
- **Carbon**: IBM의 강한 디자인 언어(IBM Plex 폰트, 2px 그리드, 특유의 인터랙션)가 기본 탑재. 일관성은 높지만 그만큼 의견이 강함.

### 3. 스타일링 스택
- **shadcn/ui**: Tailwind 유틸리티 + CSS 변수. 클래스명 충돌 없음.
- **Carbon**: SCSS + `.cds--` 프리픽스 클래스. 전역 토큰/테마 SCSS로 제어. (본 프로젝트는 Turbopack에서 폰트 경로 문제를 피하려 `use-akamai-cdn: true`로 IBM Plex를 CDN 로드)

### 4. 범위
- **shadcn/ui**: 폼/오버레이/표 등 앱 UI 빌딩블록 중심. 차트·데이터테이블 등은 별도 조합.
- **Carbon**: 데이터 테이블, 노티피케이션, UI 셸, 차트(`@carbon/charts`) 등 **엔터프라이즈 전 범위**를 포괄.

### 5. 접근성
- 둘 다 접근성 우수. shadcn은 Radix primitive에 의존, Carbon은 IBM의 엄격한 a11y 가이드라인 내장.

## 언제 무엇을?

| 상황 | 추천 |
|---|---|
| 고유 브랜드/디자인을 자유롭게 만들고 싶다 | **shadcn/ui** |
| 컴포넌트 코드를 직접 소유·수정하고 싶다 | **shadcn/ui** |
| 빠르게 일관된 엔터프라이즈 앱을 만든다 | **Carbon** |
| 데이터 집약적 대시보드/내부 툴 | **Carbon** |
| 이미 Tailwind 생태계를 쓴다 | **shadcn/ui** |
| IBM 제품/디자인 일관성이 필요하다 | **Carbon** |

## 한 화면 공존에 대한 주의
한 프로젝트에 둘을 동시에 쓰는 것은 비교/평가 목적에는 좋지만, 실제 제품에서는 **둘 중 하나를 고르는 것**을 권장합니다. Carbon의 전역 SCSS와 IBM Plex 폰트가 페이지 전반의 타이포그래피·여백에 영향을 줄 수 있어 디자인 언어가 섞이기 때문입니다.
