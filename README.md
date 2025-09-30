# D6 Music Chart Tracker

DAY6 팬덤을 위한 K-pop 음원차트 트래킹 및 스트리밍/투표 지원 애플리케이션

## 프로젝트 개요

국내 주요 음원 플랫폼(멜론, 지니, 벅스, 바이브, 플로)의 차트 데이터를 자동으로 수집하고 시각화하여 DAY6 팬덤의 효율적인 스트리밍과 투표를 지원합니다.

### 주요 기능

- 🎵 실시간 음원차트 순위 추적 (1시간 단위 자동 업데이트)
- 📊 순위 변동 추이 시각화
- 🎯 타겟 아티스트/곡 필터링
- ⏰ KST 기준 24시간 순위 변화 추적

## 기술 스택

### Backend (데이터 수집)
- **Python 3.x** - 크롤러 구현
- **GitHub Actions** - 자동화된 데이터 수집 (매시간 실행)
- **GitHub Pages** - 정적 데이터 호스팅

### Frontend (웹 애플리케이션)
- **Next.js 15** - React 프레임워크 (App Router)
- **React 19** - 최신 React 기능 활용
- **TypeScript** - 타입 안정성
- **Tailwind CSS v4** - 유틸리티 기반 스타일링
- **shadcn/ui** - UI 컴포넌트 라이브러리

## 시작하기

### Prerequisites

- Node.js 18.x 이상
- Python 3.8 이상
- Yarn 패키지 매니저

### Frontend 설치 및 실행

```bash
cd frontend
yarn install          # 의존성 설치
yarn dev              # 개발 서버 시작 (http://localhost:3000)
yarn build            # 프로덕션 빌드
yarn lint             # 코드 린팅
```

### Crawlers 설치 및 실행

```bash
cd crawlers
pip install -r requirements.txt    # 의존성 설치
python main.py                      # 모든 크롤러 실행
python test_melon.py                # 멜론 크롤러 단독 테스트
```

## 프로젝트 구조

```
d6/
├── crawlers/               # Python 크롤러
│   ├── base_crawler.py     # 크롤러 베이스 클래스
│   ├── melon_crawler.py    # 멜론 차트 크롤러
│   ├── genie_crawler.py    # 지니 차트 크롤러
│   ├── bugs_crawler.py     # 벅스 차트 크롤러
│   ├── vibe_crawler.py     # 바이브 차트 크롤러
│   ├── flo_crawler.py      # 플로 차트 크롤러
│   ├── main.py             # 메인 실행 스크립트
│   ├── target_songs.py     # 타겟 아티스트/곡 정의
│   └── rank_tracker.py     # 순위 변동 추적
├── frontend/               # Next.js 프론트엔드
│   ├── app/                # App Router 페이지
│   ├── components/         # React 컴포넌트
│   │   ├── ui/             # shadcn/ui 컴포넌트
│   │   └── charts/         # 차트 컴포넌트
│   └── public/             # 정적 파일
├── docs/                   # GitHub Pages 호스팅 데이터
│   └── public-data/        # JSON 차트 데이터
└── .github/workflows/      # GitHub Actions 워크플로우
```

## 데이터 플로우

1. **GitHub Actions**가 매시간 크롤러 실행 (KST 기준)
2. 크롤러가 각 플랫폼에서 차트 데이터 수집
3. JSON 형식으로 `docs/` 디렉토리에 저장
4. GitHub Pages를 통해 정적 데이터 제공
5. Frontend가 JSON 데이터를 fetch하여 UI 렌더링

## 데이터 스키마

```json
{
  "collectedAtKST": "2025-09-30T15:00:00+09:00",
  "artist": "DAY6",
  "tracks": [
    {
      "rank": 97,
      "title": "예뻤어",
      "artist": "DAY6",
      "album": "Album Name",
      "delta": 2,
      "timestamp": "2025093015"
    }
  ]
}
```

## 배포

### Vercel 배포

1. [Vercel](https://vercel.com)에서 GitHub 저장소 연결
2. 빌드 설정:
   - Framework Preset: `Next.js`
   - Root Directory: `frontend`
   - Build Command: `yarn build`
   - Output Directory: `.next`
3. 환경 변수 설정 (아래 참조)

### Cloudflare 도메인 연결

1. Cloudflare에서 도메인 구매
2. Vercel 프로젝트 설정에서 도메인 추가
3. Cloudflare DNS 설정:
   - Type: `CNAME`
   - Name: `@` 또는 서브도메인
   - Content: `cname.vercel-dns.com`
   - Proxy status: DNS only (회색 구름)
4. SSL/TLS 설정: Full 모드 사용

## 환경 변수 설정

### GitHub Actions Secrets

```
YOUTUBE_API_KEY=<your-youtube-api-key>
SUPABASE_ANON_KEY=<your-supabase-key>
```

### Frontend 환경 변수

#### 개발 환경 (.env.local)

```
NEXT_PUBLIC_DATA_BASE_URL=https://raw.githubusercontent.com/<OWNER>/<REPO>/master/docs/public-data
```

#### 프로덕션 환경 (Vercel)

Vercel 대시보드에서 Environment Variables 설정:

```
NEXT_PUBLIC_DATA_BASE_URL=https://raw.githubusercontent.com/<OWNER>/<REPO>/master/docs/public-data
```

## 개발 가이드

### 타겟 아티스트/곡 추가

`crawlers/target_songs.py` 파일에서 TARGET_SONGS 배열에 새로운 아티스트 추가:

```python
TARGET_SONGS = [
    "DAY6",
    "새로운 아티스트"
]
```

### UI 컴포넌트 사용 예시

shadcn/ui 컴포넌트를 활용한 차트 카드:

```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { RankingChart } from "@/components/charts/ranking-chart";

export default function ChartCard({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>실시간 차트</CardTitle>
      </CardHeader>
      <CardContent>
        <RankingChart data={data} />
      </CardContent>
    </Card>
  );
}
```

## 테스트

- **크롤러 테스트**: `python test_<platform>.py`로 개별 크롤러 테스트
- **Frontend 테스트**: `yarn build`로 빌드 검증 및 수동 테스트
- **GitHub Actions**: `workflow_dispatch`로 수동 실행 테스트

## 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 라이선스

This project is licensed under the MIT License.

## 지원

문제가 발생하거나 기능 요청이 있으시면 [Issues](https://github.com/<OWNER>/<REPO>/issues)에 등록해주세요.