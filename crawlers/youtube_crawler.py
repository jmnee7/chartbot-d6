"""
YouTube 데이터 크롤러 - YouTube Data API v3 사용
"""

import os
import requests
import json
from datetime import datetime
from typing import Dict, Optional
from utils import get_current_kst_iso


class YouTubeCrawler:
    """
    YouTube Data API v3를 사용하여 비디오 통계를 가져오는 크롤러
    """
    
    def __init__(self):
        """
        YouTubeCrawler 초기화
        """
        self.api_key = os.getenv('YOUTUBE_API_KEY')
        self.base_url = "https://www.googleapis.com/youtube/v3/videos"
        
    def is_available(self) -> bool:
        """
        YouTube API 사용 가능 여부 확인
        
        Returns:
            bool: API 키가 설정되어 있는지 여부
        """
        return self.api_key is not None and self.api_key.strip() != ""
    
    def get_video_stats(self, video_id: str) -> Optional[Dict]:
        """
        YouTube 비디오의 통계 정보를 가져옴
        
        Args:
            video_id (str): YouTube 비디오 ID
            
        Returns:
            Dict: 비디오 통계 정보 또는 None
        """
        if not self.is_available():
            print("⚠️ YouTube API 키가 설정되지 않았습니다.")
            print("GitHub Secrets에 YOUTUBE_API_KEY를 추가해주세요.")
            return None
            
        try:
            params = {
                'part': 'statistics,snippet',
                'id': video_id,
                'key': self.api_key
            }
            
            response = requests.get(self.base_url, params=params, timeout=10)
            response.raise_for_status()
            
            data = response.json()
            
            if not data.get('items'):
                print(f"❌ 비디오 ID '{video_id}'를 찾을 수 없습니다.")
                return None
                
            item = data['items'][0]
            statistics = item.get('statistics', {})
            snippet = item.get('snippet', {})
            
            # 숫자 포맷팅 (콤마 추가)
            view_count = int(statistics.get('viewCount', 0))
            like_count = int(statistics.get('likeCount', 0))
            
            result = {
                'video_id': video_id,
                'title': snippet.get('title', ''),
                'view_count': view_count,
                'like_count': like_count,
                'view_count_formatted': f"{view_count:,}",
                'like_count_formatted': f"{like_count:,}",
                'last_updated': get_current_kst_iso(),
                'channel_title': snippet.get('channelTitle', ''),
                'published_at': snippet.get('publishedAt', '')
            }
            
            print(f"✅ YouTube 통계 수집 성공: 조회수 {result['view_count_formatted']}, 좋아요 {result['like_count_formatted']}")
            return result
            
        except requests.exceptions.RequestException as e:
            print(f"❌ YouTube API 요청 실패: {e}")
            return None
        except Exception as e:
            print(f"❌ YouTube 통계 수집 오류: {e}")
            return None
    
    def save_stats_to_file(self, video_stats: Dict, output_file: str = "docs/youtube_stats.json"):
        """
        YouTube 통계를 JSON 파일로 저장
        
        Args:
            video_stats (Dict): 비디오 통계 정보
            output_file (str): 저장할 파일 경로
        """
        try:
            # 디렉토리가 없으면 생성
            os.makedirs(os.path.dirname(output_file), exist_ok=True)
            
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(video_stats, f, ensure_ascii=False, indent=2)
                
            print(f"📊 YouTube 통계 저장 완료: {output_file}")
            
        except Exception as e:
            print(f"❌ YouTube 통계 저장 실패: {e}")


def is_exact_hour():
    """
    현재 시간이 정각(분이 00)인지 확인
    
    Returns:
        bool: 정각이면 True, 아니면 False
    """
    now = datetime.now()
    return now.minute == 0

def load_previous_youtube_data():
    """
    이전 YouTube 통계 데이터 로드
    
    Returns:
        List[Dict]: 이전 데이터 또는 빈 리스트
    """
    try:
        output_file = "../frontend/public/data/youtube_stats.json"
        if os.path.exists(output_file):
            with open(output_file, 'r', encoding='utf-8') as f:
                return json.load(f)
    except Exception as e:
        print(f"⚠️ 이전 YouTube 데이터 로드 실패: {e}")
    
    return []

def get_youtube_stats_for_dashboard():
    """
    대시보드용 YouTube 통계 가져오기 (정각에만 실제 API 호출)
    
    Returns:
        List[Dict]: YouTube 통계 정보 리스트
    """
    current_time = datetime.now()
    
    # 정각이 아니면 이전 데이터 사용
    if not is_exact_hour():
        print(f"⏰ 현재 시간 {current_time.strftime('%H:%M')} - 정각이 아니므로 이전 YouTube 데이터 사용")
        previous_data = load_previous_youtube_data()
        if previous_data:
            print(f"📊 이전 YouTube 데이터 사용 ({len(previous_data)}개 비디오)")
            return previous_data
        else:
            print("⚠️ 이전 데이터가 없어 기본값으로 대체")
    
    print(f"🕒 정각 {current_time.strftime('%H:00')} - YouTube API 호출 시작")
    
    VIDEOS = [
        {"id": "0fyZqS0N19o", "title": "Maybe Tomorrow"},  # DAY6 
    ]
    
    crawler = YouTubeCrawler()
    all_stats = []
    
    for video in VIDEOS:
        print(f"📹 {video['title']} 통계 수집 중...")
        stats = crawler.get_video_stats(video['id'])
        
        if stats:
            all_stats.append({
                'title': video['title'],
                'views': stats['view_count'],
                'likes': stats['like_count'],
                'viewsDelta24h': 0,  # 24시간 변화량은 별도 계산 필요
                'likesDelta24h': 0,  # 24시간 변화량은 별도 계산 필요
                'link': f"https://youtu.be/{video['id']}",
                'last_updated': stats['last_updated']
            })
        else:
            # API 실패시 기본값
            all_stats.append({
                'title': video['title'],
                'views': 0,
                'likes': 0,
                'viewsDelta24h': 0,
                'likesDelta24h': 0,
                'link': f"https://youtu.be/{video['id']}",
                'last_updated': get_current_kst_iso()
            })
    
    # 통합 통계 파일로 저장
    try:
        output_file = "../frontend/public/data/youtube_stats.json"
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_stats, f, ensure_ascii=False, indent=2)
        
        print(f"📊 YouTube 통계 저장 완료: {output_file}")
    except Exception as e:
        print(f"❌ YouTube 통계 저장 실패: {e}")
    
    return all_stats


if __name__ == "__main__":
    # 테스트용
    stats = get_youtube_stats_for_dashboard()
    print(f"YouTube 통계: {stats}") 