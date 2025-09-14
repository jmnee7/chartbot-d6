"""
YouTube 데이터 크롤러 - YouTube Data API v3 사용
"""

import os
import requests
import json
from datetime import datetime, timedelta
from typing import Dict, Optional
from utils import get_current_kst_iso
import pytz


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
    kst_timezone = pytz.timezone('Asia/Seoul')
    now = datetime.now(kst_timezone)
    return now.minute == 0

def load_previous_youtube_data():
    """
    이전 YouTube 통계 데이터 로드
    
    Returns:
        Dict: 이전 YouTube 통계 데이터 (video_id를 키로 하는 딕셔너리)
    """
    try:
        output_file = "../frontend/public/data/youtube_stats.json"
        if os.path.exists(output_file):
            with open(output_file, 'r', encoding='utf-8') as f:
                previous_data = json.load(f)
                # 리스트를 video_id 기반 딕셔너리로 변환
                if isinstance(previous_data, list):
                    result = {}
                    for item in previous_data:
                        # video_id를 찾기 위해 link에서 추출하거나 title 사용
                        video_id = None
                        if 'link' in item and 'youtu.be/' in item['link']:
                            video_id = item['link'].split('youtu.be/')[-1]
                        elif 'video_id' in item:
                            video_id = item['video_id']
                        else:
                            video_id = item.get('title', '')
                        
                        if video_id:
                            result[video_id] = item
                    return result
                return previous_data
    except Exception as e:
        print(f"⚠️ 이전 YouTube 데이터 로드 실패: {e}")
    
    return {}

def calculate_24h_delta(current_value, previous_value):
    """
    24시간 변화량 계산
    
    Args:
        current_value (int): 현재 값
        previous_value (int): 이전 값
        
    Returns:
        int: 24시간 변화량
    """
    try:
        if previous_value is None or previous_value == 0:
            return 0  # 이전 데이터가 없으면 변화량 0
        return max(0, current_value - previous_value)  # 음수 방지 (조회수는 감소하지 않음)
    except (TypeError, ValueError):
        return 0

def get_youtube_stats_for_dashboard():
    """
    대시보드용 YouTube 통계 가져오기
    
    Returns:
        List[Dict]: YouTube 통계 정보 리스트
    """
    kst_timezone = pytz.timezone('Asia/Seoul')
    current_time = datetime.now(kst_timezone)
    
    # 항상 YouTube API 호출
    print(f"📹 YouTube API 호출 시작 - {current_time.strftime('%H:%M')}")
    
    VIDEOS = [
        {"id": "b_Eh-9Jz_L8", "title": "INSIDE OUT"},  # DAY6 
    ]
    
    crawler = YouTubeCrawler()
    all_stats = []
    
    # 이전 데이터 로드 (24시간 변화량 계산용)
    previous_data = load_previous_youtube_data()
    print(f"📊 이전 YouTube 데이터 로드: {len(previous_data)}개")
    
    for video in VIDEOS:
        print(f"📹 {video['title']} 통계 수집 중...")
        stats = crawler.get_video_stats(video['id'])
        
        if stats:
            # 이전 데이터에서 24시간 전 값 찾기
            previous_stats = previous_data.get(video['id'], {})
            previous_views = previous_stats.get('views', previous_stats.get('view_count', 0))
            previous_likes = previous_stats.get('likes', previous_stats.get('like_count', 0))
            
            # 24시간 변화량 계산
            views_delta = calculate_24h_delta(stats['view_count'], previous_views)
            likes_delta = calculate_24h_delta(stats['like_count'], previous_likes)
            
            print(f"  📊 {video['title']} 변화량: 조회수 +{views_delta:,}, 좋아요 +{likes_delta:,}")
            
            all_stats.append({
                'title': video['title'],
                'views': stats['view_count'],
                'likes': stats['like_count'],
                'viewsDelta24h': views_delta,
                'likesDelta24h': likes_delta,
                'video_id': video['id'],  # video_id 추가 (다음 비교를 위해)
                'link': f"https://youtu.be/{video['id']}",
                'last_updated': stats['last_updated']
            })
        else:
            # API 실패시 이전 데이터 유지 (있다면)
            previous_stats = previous_data.get(video['id'], {})
            all_stats.append({
                'title': video['title'],
                'views': previous_stats.get('views', 0),
                'likes': previous_stats.get('likes', 0),
                'viewsDelta24h': 0,  # API 실패시 변화량은 0
                'likesDelta24h': 0,
                'video_id': video['id'],
                'link': f"https://youtu.be/{video['id']}",
                'last_updated': get_current_kst_iso()
            })
    
    # 통합 통계 파일로 저장
    try:
        output_file = "../frontend/public/data/youtube_stats.json"
        history_file = "../frontend/public/data/youtube_history.json"
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        
        # 현재 통계 저장
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(all_stats, f, ensure_ascii=False, indent=2)
        
        # history 파일에도 저장 (시간별로 보관)
        kst_timezone = pytz.timezone('Asia/Seoul')
        current_hour = datetime.now(kst_timezone).strftime('%Y-%m-%d %H:00')
        
        # 기존 history 로드
        history = {}
        if os.path.exists(history_file):
            try:
                with open(history_file, 'r', encoding='utf-8') as f:
                    history = json.load(f)
            except:
                history = {}
        
        # 현재 시간 데이터를 video_id 기반 딕셔너리로 저장
        current_data = {}
        for stat in all_stats:
            if 'video_id' in stat:
                current_data[stat['video_id']] = stat
        
        history[current_hour] = current_data
        
        # 7일 이상 된 데이터 삭제 (메모리 관리)
        cutoff_date = (datetime.now(kst_timezone) - timedelta(days=7)).strftime('%Y-%m-%d')
        history = {k: v for k, v in history.items() if k >= cutoff_date}
        
        # history 저장
        with open(history_file, 'w', encoding='utf-8') as f:
            json.dump(history, f, ensure_ascii=False, indent=2)
        
        print(f"📊 YouTube 통계 저장 완료: {output_file}")
        print(f"📚 YouTube history 저장 완료: {history_file} ({len(history)}개 시간대)")
    except Exception as e:
        print(f"❌ YouTube 통계 저장 실패: {e}")
    
    return all_stats


if __name__ == "__main__":
    # 테스트용
    stats = get_youtube_stats_for_dashboard()
    print(f"YouTube 통계: {stats}") 