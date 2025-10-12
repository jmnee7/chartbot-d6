# 📊 d6 크롤러 시스템

한국 주요 음원 플랫폼의 차트 데이터를 자동으로 수집하는 Python 기반 크롤링 시스템

## 목차

- [개요](#개요)
- [아키텍처](#아키텍처)
- [설치 및 실행](#설치-및-실행)
- [크롤러 상세](#크롤러-상세)
- [설정](#설정)
- [데이터 구조](#데이터-구조)
- [개발 가이드](#개발-가이드)
- [트러블슈팅](#트러블슈팅)

## 개요

d6 크롤러는 다음 플랫폼의 실시간 차트 데이터를 수집합니다:

- 🍈 **멜론** - TOP100, HOT100, 일간, 주간, 월간
- 🧞 **지니** - TOP200, 일간, 주간, 월간
- 🐛 **벅스** - 실시간, 일간, 주간
- 💜 **바이브** - Today Top100, 국내 급상승
- 🌊 **플로** (FLO) - TOP100
- 📺 **유튜브** - 조회수, 좋아요, 댓글 통계

## 아키텍처

### 클래스 구조

```
BaseCrawler (추상 클래스)
├── MelonCrawler
├── GenieCrawler
├── BugsCrawler
├── VibeCrawler
├── FloCrawler
└── YoutubeCrawler
```

### 핵심 컴포넌트

1. **BaseCrawler** (`base_crawler.py`)
   - 모든 크롤러의 추상 클래스
   - 공통 인터페이스 정의
   - HTTP 요청 처리 및 에러 핸들링

2. **플랫폼별 크롤러**
   - 각 플랫폼의 특성에 맞춘 파싱 로직
   - 동적 콘텐츠 처리 (필요시)
   - 차트 타입별 URL 매핑

3. **RankTracker** (`rank_tracker.py`)
   - 24시간 순위 히스토리 관리
   - 순위 변동(delta) 계산
   - 차트아웃 처리

4. **타겟 필터링** (`target_songs.py`)
   - 특정 아티스트/곡 필터링
   - 다양한 검색 모드 지원

## 설치 및 실행

### 요구사항

- Python 3.8 이상
- pip 패키지 매니저

### 설치

```bash
cd crawlers
pip install -r requirements.txt
```

### 실행

#### 모든 크롤러 실행
```bash
python main.py
```

#### 특정 크롤러 테스트
```bash
python test_melon.py
python test_genie.py
python test_bugs.py
python test_vibe.py
python test_flo.py
```

#### 옵션
```bash
# 특정 차트 타입만 크롤링
python main.py --chart-type realtime

# 디버그 모드
python main.py --debug

# 타겟 필터링 비활성화
python main.py --no-filter
```

## 크롤러 상세

### MelonCrawler

**지원 차트** (실제 코드 기준)
- `top_100`: TOP 100 (실시간)
- `hot_100`: HOT 100 (24시간)
- `daily`: 일간 차트
- `weekly`: 주간 차트
- `monthly`: 월간 차트
- `realtime`: 실시간 (기본값과 동일)

**특징**
- User-Agent 헤더 필수
- 동적 로딩 콘텐츠 처리
- 앨범 이미지 URL 수집

### GenieCrawler

**지원 차트** (실제 코드 기준)
- `top_100`: TOP 200 (기본값, 실제로는 200곡)
- `realtime`: 실시간

**특징**
- JSON API 활용 가능
- 스트리밍 횟수 데이터 포함
- 상세 아티스트 정보 제공

### BugsCrawler

**지원 차트** (실제 코드 기준)
- `top_100`: TOP 100 (기본값)
- `realtime`: 실시간 차트

**특징**
- 가장 빠른 업데이트 주기
- 음원 미리듣기 URL 제공
- 장르별 차트 지원

### VibeCrawler

**지원 차트** (실제 코드 기준)
- `top_100`: Today Top 100 (기본값)
- `realtime`: 실시간

**특징**
- 네이버 VIBE 플랫폼
- 큐레이션 플레이리스트 연동
- 아티스트 채널 정보

### FloCrawler

**지원 차트** (실제 코드 기준)
- `top_100`: TOP 100 (기본값)
- `realtime`: 실시간

**JSON 출력 키**: `flo`

**특징**
- SK텔레콤 FLO 플랫폼
- 고음질 스트리밍 정보
- 가사 동기화 데이터

### YoutubeCrawler

**수집 데이터**
- 조회수 (views)
- 좋아요 수 (likes)
- 댓글 수 (comments)
- 업로드 날짜
- 영상 길이

**특징**
- YouTube Data API v3 사용
- API 키 필요
- 할당량 제한 고려

## 설정

### 타겟 아티스트/곡 설정

`target_songs.py` 파일 수정:

```python
# 타겟 아티스트
TARGET_ARTIST = "DAY6"

# 타겟 곡
TARGET_SONG = "HAPPY"

# 특정 아티스트의 특정 곡
TARGET_ARTIST_SONG = ("DAY6", "HAPPY")

# 검색 모드
SEARCH_MODE = "artists"  # "songs", "artist_songs", "all"
```

### 검색 모드

- **`artists`**: 지정된 아티스트의 모든 곡
- **`songs`**: 지정된 곡명만 (아티스트 무관)
- **`artist_songs`**: 특정 아티스트의 특정 곡만
- **`all`**: 위 모든 조건 OR 연산

### 환경 변수

```bash
# YouTube API 키 (선택사항)
export YOUTUBE_API_KEY="your-api-key"

# 프록시 설정 (선택사항)
export HTTP_PROXY="http://proxy.example.com:8080"
export HTTPS_PROXY="http://proxy.example.com:8080"
```

## 데이터 구조

### 출력 파일

```
docs/public-data/
├── latest.json           # 최신 통합 데이터
├── summary.json          # 요약 통계
├── happy.json            # 특정 곡 상세
├── day6_chart.json       # 차트 페이지 데이터
└── youtube_stats.json    # YouTube 통계
```

### JSON 스키마

#### 차트 데이터
```json
{
  "platform": "melon",
  "chartType": "top100",
  "collectedAt": "2025-10-10T15:00:00+09:00",
  "tracks": [
    {
      "rank": 1,
      "title": "HAPPY",
      "artist": "DAY6",
      "album": "Fourever",
      "imageUrl": "https://...",
      "delta": 2,
      "isNew": false,
      "timestamp": "2025101015"
    }
  ]
}
```

#### 순위 변동 데이터
```json
{
  "songId": "DAY6_HAPPY",
  "history": [
    {
      "timestamp": "2025101015",
      "rank": 97
    },
    {
      "timestamp": "2025101014",
      "rank": 99
    }
  ],
  "delta": 2,
  "peak": 85,
  "chartInHours": 168
}
```

## 개발 가이드

### 새 크롤러 추가하기

1. **BaseCrawler 상속**
```python
from base_crawler import BaseCrawler

class NewPlatformCrawler(BaseCrawler):
    def __init__(self):
        super().__init__("newplatform")
```

2. **필수 메서드 구현**
```python
def get_chart_url(self, chart_type):
    urls = {
        "realtime": "https://platform.com/chart/realtime",
        "daily": "https://platform.com/chart/daily"
    }
    return urls.get(chart_type)

def get_song_elements(self, soup, chart_type):
    return soup.select(".song-item")

def parse_song_data(self, element, chart_type):
    return {
        "rank": element.select_one(".rank").text,
        "title": element.select_one(".title").text,
        "artist": element.select_one(".artist").text,
        "album": element.select_one(".album").text
    }
```

3. **main.py에 등록**
```python
from newplatform_crawler import NewPlatformCrawler

crawlers = [
    MelonCrawler(),
    GenieCrawler(),
    # ... 
    NewPlatformCrawler()  # 추가
]
```

### 테스트 작성

```python
# test_newplatform.py
from newplatform_crawler import NewPlatformCrawler

def test_crawler():
    crawler = NewPlatformCrawler()
    data = crawler.get_chart("realtime")
    
    assert data is not None
    assert len(data) > 0
    assert "rank" in data[0]
    
    print(f"✓ 수집된 곡: {len(data)}개")
    print(f"✓ 1위: {data[0]['title']} - {data[0]['artist']}")

if __name__ == "__main__":
    test_crawler()
```

### 에러 처리

```python
class CustomCrawler(BaseCrawler):
    def get_chart(self, chart_type):
        try:
            # 크롤링 로직
            return data
        except ConnectionError:
            print(f"⚠️ 네트워크 연결 실패: {self.platform_name}")
            return []
        except ParseError as e:
            print(f"⚠️ 파싱 에러: {e}")
            return []
        except Exception as e:
            print(f"❌ 예상치 못한 에러: {e}")
            return []
```

## 트러블슈팅

### 일반적인 문제

#### 1. 크롤링 실패
```
문제: ConnectionError 또는 TimeoutError
해결:
- 네트워크 연결 확인
- 타겟 사이트 접속 가능 여부 확인
- User-Agent 헤더 업데이트
- 프록시 설정 확인
```

#### 2. 파싱 에러
```
문제: 빈 데이터 또는 AttributeError
해결:
- 사이트 HTML 구조 변경 확인
- CSS 선택자 업데이트
- 동적 콘텐츠 로딩 대기 시간 증가
```

#### 3. 인코딩 문제
```
문제: UnicodeDecodeError
해결:
- response.encoding = 'utf-8' 설정
- BeautifulSoup에 인코딩 명시
- 특수문자 처리 로직 추가
```

#### 4. Rate Limiting
```
문제: 429 Too Many Requests
해결:
- 요청 간격 증가 (time.sleep)
- 프록시 로테이션
- User-Agent 로테이션
- 분산 크롤링
```

### 디버깅 팁

1. **상세 로그 활성화**
```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

2. **HTML 저장 후 분석**
```python
with open('debug.html', 'w', encoding='utf-8') as f:
    f.write(response.text)
```

3. **선택자 테스트**
```python
from bs4 import BeautifulSoup

html = open('debug.html', 'r', encoding='utf-8').read()
soup = BeautifulSoup(html, 'html.parser')

# 선택자 테스트
elements = soup.select('.your-selector')
print(f"찾은 요소: {len(elements)}개")
```

4. **네트워크 모니터링**
```bash
# HTTP 트래픽 확인
tcpdump -i any -s 0 -A 'tcp port 80 or tcp port 443'

# DNS 쿼리 확인
tcpdump -i any -s 0 port 53
```

## 성능 최적화

### 병렬 처리
```python
from concurrent.futures import ThreadPoolExecutor

def crawl_all_platforms():
    with ThreadPoolExecutor(max_workers=5) as executor:
        futures = []
        for crawler in crawlers:
            future = executor.submit(crawler.get_chart, "realtime")
            futures.append(future)
        
        results = [f.result() for f in futures]
    return results
```

### 캐싱
```python
from functools import lru_cache

@lru_cache(maxsize=128)
def get_cached_chart(platform, chart_type):
    crawler = get_crawler(platform)
    return crawler.get_chart(chart_type)
```

### 메모리 관리
```python
import gc

def process_large_dataset():
    data = fetch_data()
    process(data)
    
    # 명시적 메모리 해제
    del data
    gc.collect()
```

## 라이선스

MIT License - 자세한 내용은 [LICENSE](../LICENSE) 파일 참조

---

Made with ❤️ for DAY6 and My Days