# 🎨 d6 Frontend

Next.js 15 기반의 모던한 음원 차트 트래킹 웹 애플리케이션

## 목차

- [개요](#개요)
- [기술 스택](#기술-스택)
- [프로젝트 구조](#프로젝트-구조)
- [설치 및 실행](#설치-및-실행)
- [주요 기능](#주요-기능)
- [컴포넌트 가이드](#컴포넌트-가이드)
- [상태 관리](#상태-관리)
- [스타일링](#스타일링)
- [라우팅](#라우팅)
- [데이터 페칭](#데이터-페칭)
- [성능 최적화](#성능-최적화)
- [배포](#배포)

## 개요

d6 Frontend는 실시간 음원 차트 데이터를 시각화하고 DAY6 팬덤을 위한 스트리밍/투표 가이드를 제공하는 웹 애플리케이션입니다.

### 핵심 특징
- ⚡ **Next.js 15** App Router 활용
- 🎯 **TypeScript** 완벽 지원
- 🎨 **Tailwind CSS v4** + **Radix UI**
- 📱 **모바일 우선** 디자인
- 🚀 **Turbopack** 빌드 최적화
- 🌊 **Swiper** 이미지 캐로셀
- 🚀 **Turbopack** 빌드 최적화

## 기술 스택

### Core
- **Next.js 15.0** - React 프레임워크
- **React 19** - UI 라이브러리
- **TypeScript 5.3** - 타입 시스템

### UI/UX
- **Tailwind CSS v4** - 유틸리티 CSS
- **shadcn/ui** - 컴포넌트 라이브러리
- **Radix UI** - 헤드리스 컴포넌트
- **Framer Motion** - 애니메이션
- **Recharts** - 차트 라이브러리

### State & Data
- **TanStack Query v5** - 서버 상태 관리
- **date-fns** - 날짜 처리 라이브러리
- **React Device Detect** - 디바이스 감지

### Development
- **ESLint 9** - 코드 린팅
- **Prettier** - 코드 포맷팅
- **TypeScript 5** - 타입 시스템
- **Turbopack** - 차세대 번들러 (Next.js 15에 내장)

## 프로젝트 구조

```
frontend/
├── app/                      # App Router 페이지
│   ├── (root)/              # 루트 레이아웃 그룹
│   │   ├── page.tsx         # 홈페이지
│   │   └── layout.tsx       # 루트 레이아웃
│   ├── charts/              # 차트 페이지
│   │   ├── page.tsx        
│   │   └── [platform]/      # 동적 라우팅
│   ├── streaming/           # 스트리밍 가이드
│   ├── votes/               # 투표 정보
│   └── guide/               # 사용 가이드
│
├── components/              # React 컴포넌트
│   ├── ui/                 # shadcn/ui 기본 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── tabs.tsx
│   │   └── ...
│   ├── charts/             # 차트 컴포넌트
│   │   ├── ranking-chart.tsx
│   │   ├── trend-chart.tsx
│   │   └── platform-card.tsx
│   ├── layout/             # 레이아웃 컴포넌트
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── navigation.tsx
│   └── home/               # 홈 페이지 컴포넌트
│       ├── hero-section.tsx
│       └── quick-stats.tsx
│
├── lib/                     # 유틸리티 & 설정
│   ├── api.ts              # API 함수
│   ├── types.ts            # TypeScript 타입
│   ├── utils.ts            # 유틸리티 함수
│   ├── constants.ts        # 상수
│   └── hooks/              # 커스텀 훅
│       ├── use-chart-data.ts
│       └── use-theme.ts
│
├── styles/                  # 스타일
│   └── globals.css         # 글로벌 스타일
│
├── public/                  # 정적 파일
│   ├── images/
│   └── fonts/
│
└── config/                  # 설정 파일
    ├── site.ts             # 사이트 메타데이터
    └── platforms.ts        # 플랫폼 정보
```

## 설치 및 실행

### 사전 요구사항
- Node.js 18.0 이상
- Yarn 패키지 매니저

### 설치
```bash
cd frontend
yarn install
```

### 개발 서버 실행
```bash
yarn dev
# http://localhost:3000
```

### 프로덕션 빌드
```bash
yarn build
yarn start
```

### 기타 명령어
```bash
yarn lint         # ESLint 실행
yarn format       # Prettier 포맷팅
yarn type-check   # TypeScript 체크
yarn analyze      # 번들 분석
```

## 주요 기능

### 1. 실시간 차트 대시보드
- 5개 플랫폼 동시 모니터링
- 순위 변동 실시간 표시
- 차트 타입별 필터링
- 자동 새로고침 (1시간 간격)

### 2. 차트 상세 페이지
- 플랫폼별 전용 뷰
- 시간대별 트렌드 차트
- 곡 상세 정보
- 스트리밍 링크 제공

### 3. 스트리밍 가이드 (/streaming)
- 플랫폼별 스트리밍 링크 (tinyurl 단축 URL)
- **딜링크 지원**: Android/iOS/PC 앱 직접 연결
- 스마트 플랫폼 링크 컴포넌트
- 다운로드 안내
- 팬덤 캠페인 정보

### 4. 투표 센터
- 음악방송 투표 일정
- 투표 방법 가이드
- 실시간 투표 현황
- 알림 설정

## 컴포넌트 가이드

### UI 컴포넌트 사용

#### Button
```tsx
import { Button } from "@/components/ui/button"

<Button variant="default" size="lg">
  스트리밍 시작
</Button>
```

#### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>멜론 TOP 100</CardTitle>
  </CardHeader>
  <CardContent>
    {/* 콘텐츠 */}
  </CardContent>
</Card>
```

#### Tabs
```tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

<Tabs defaultValue="realtime">
  <TabsList>
    <TabsTrigger value="realtime">실시간</TabsTrigger>
    <TabsTrigger value="daily">일간</TabsTrigger>
  </TabsList>
  <TabsContent value="realtime">
    {/* 실시간 차트 */}
  </TabsContent>
  <TabsContent value="daily">
    {/* 일간 차트 */}
  </TabsContent>
</Tabs>
```

### 차트 컴포넌트

#### RankingChart
```tsx
import { RankingChart } from "@/components/charts/ranking-chart"

<RankingChart 
  data={chartData}
  platform="melon"
  showDelta={true}
  limit={100}
/>
```

#### TrendChart
```tsx
import { TrendChart } from "@/components/charts/trend-chart"

<TrendChart 
  data={trendData}
  timeRange="24h"
  smoothing={true}
/>
```

## 상태 관리

### TanStack Query (서버 상태)

```tsx
// lib/hooks/use-chart-data.ts
import { useQuery } from '@tanstack/react-query'

export function useChartData(platform: string) {
  return useQuery({
    queryKey: ['chart', platform],
    queryFn: () => fetchChartData(platform),
    staleTime: 5 * 60 * 1000, // 5분
    refetchInterval: 60 * 60 * 1000, // 1시간
  })
}
```

### 로컬 상태 관리

현재 추가적인 상태 관리 라이브러리는 사용하지 않으며, React 기본 useState와 TanStack Query로 충분합니다.

```tsx
// 컴포넌트 내에서 useState 사용
const [selectedPlatforms, setSelectedPlatforms] = useState<PlatformType[]>([]);
const [showMelonSubCharts, setShowMelonSubCharts] = useState(false);
```

## 스타일링

### Tailwind CSS 설정

```js
// tailwind.config.ts
export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFB800', // DAY6 Yellow
          foreground: '#000000',
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

### 다크모드 구현

```tsx
// components/theme-provider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
```

## 라우팅

### 정적 라우팅

현재 구현된 페이지:
- `/` - 홈페이지
- `/charts` - 통합 차트 페이지
- `/streaming` - 스트리밍 가이드
- `/votes` - 투표 정보
- `/guide` - 사용 가이드

```tsx
// app/charts/page.tsx
export default function ChartsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });
  
  return (
    <div>
      <h1>음원 차트</h1>
      {/* 차트 렌더링 */}
    </div>
  )
}
```

## 데이터 페칭

### API 함수

```tsx
// lib/api.ts
const API_BASE = process.env.NEXT_PUBLIC_DATA_BASE_URL

export async function fetchChartData(platform: string) {
  const response = await fetch(`${API_BASE}/${platform}_chart.json`, {
    next: { revalidate: 3600 }, // 1시간 캐싱
  })
  
  if (!response.ok) {
    throw new Error('Failed to fetch chart data')
  }
  
  return response.json()
}

export async function fetchLatestData() {
  const response = await fetch(`${API_BASE}/latest.json`, {
    cache: 'no-store', // 항상 최신 데이터
  })
  
  return response.json()
}
```

### 스트리밍 SSR

```tsx
// app/charts/page.tsx
import { Suspense } from 'react'

export default function ChartsPage() {
  return (
    <div>
      <Suspense fallback={<ChartSkeleton />}>
        <ChartList />
      </Suspense>
    </div>
  )
}

async function ChartList() {
  const data = await fetchLatestData()
  return <>{/* 차트 렌더링 */}</>
}
```

## 성능 최적화

### 이미지 최적화

```tsx
import Image from 'next/image'

<Image
  src={albumArt}
  alt={songTitle}
  width={64}
  height={64}
  loading="lazy"
  placeholder="blur"
  blurDataURL={blurDataUrl}
/>
```

### 코드 스플리팅

```tsx
import dynamic from 'next/dynamic'

const HeavyChart = dynamic(() => import('@/components/charts/heavy-chart'), {
  loading: () => <ChartSkeleton />,
  ssr: false,
})
```

### 메모이제이션

```tsx
import { memo, useMemo } from 'react'

const ChartItem = memo(({ data }: ChartItemProps) => {
  const processedData = useMemo(() => 
    expensiveProcess(data), [data]
  )
  
  return <>{/* 렌더링 */}</>
})
```

### 성능 최적화 기법

현재는 기본적인 React 최적화 기법을 사용합니다:

```tsx
// memo를 활용한 컴포넌트 최적화
const ChartItem = memo(({ data }: ChartItemProps) => {
  return <div>{data.title}</div>;
});

// useCallback을 활용한 함수 메모이제이션
const handleClick = useCallback(() => {
  // 클릭 핸들러
}, [dependency]);
```

## 배포

### Vercel 배포

1. **GitHub 연동**
```bash
# Vercel CLI 설치
npm i -g vercel

# 프로젝트 연결
vercel link
```

2. **환경 변수 설정**
```bash
vercel env add NEXT_PUBLIC_DATA_BASE_URL
```

3. **배포**
```bash
# 프로덕션 배포
vercel --prod

# 프리뷰 배포
vercel
```

### 도커 배포

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

RUN yarn install --production
EXPOSE 3000
CMD ["yarn", "start"]
```

### 환경 변수

```env
# .env.local
NEXT_PUBLIC_DATA_BASE_URL=https://raw.githubusercontent.com/user/repo/main/docs/public-data
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SITE_URL=https://d6charts.com
```

## 테스팅

### 테스트 방법

현재는 별도의 테스트 설정이 없으며, `yarn build`와 수동 테스트로 검증합니다.

```bash
# 빌드 테스트
yarn build

# 개발 서버에서 수동 테스트
yarn dev
```

**향후 계획**: Jest, React Testing Library, Playwright 등을 활용한 자동화된 테스트 설정

## 문제 해결

### 일반적인 이슈

1. **빌드 에러**
```bash
# 캐시 클리어
rm -rf .next node_modules
yarn install
yarn build
```

2. **TypeScript 에러**
```bash
# 타입 체크
yarn type-check

# 타입 생성
yarn generate-types
```

3. **스타일 이슈**
```bash
# Tailwind 재빌드
yarn dev --turbo
```

## 기여 가이드

### 컨벤션

- **커밋 메시지**: Conventional Commits
- **브랜치**: feature/*, fix/*, docs/*
- **코드 스타일**: ESLint + Prettier

### Pull Request

1. Feature 브랜치 생성
2. 변경사항 커밋
3. PR 생성 with description
4. Code Review
5. Merge

---

Made with ❤️ using Next.js and shadcn/ui
