"""
순위 변화 추적 및 기록 모듈
"""

import json
import os
from datetime import datetime
from typing import Dict, List, Optional, Tuple
from target_songs import is_target_song
from utils import get_current_kst_iso


class RankTracker:
    """
    음악 차트 순위 변화를 추적하고 기록하는 클래스
    """
    
    def __init__(self, history_file="../frontend/public/data/rank_history.json"):
        """
        RankTracker 초기화
        
        Args:
            history_file (str): 순위 히스토리를 저장할 파일 경로
        """
        self.history_file = history_file
        self.history = self.load_history()
    
    def _get_song_key(self, artist: str, title: str) -> str:
        """
        곡의 고유 키 생성 (효율적인 검색을 위해)
        
        Args:
            artist (str): 가수명
            title (str): 곡명
            
        Returns:
            str: 곡의 고유 키
        """
        return f"{artist}_{title}"
    
    def load_history(self) -> Dict:
        """
        이전 순위 히스토리를 로드
        
        Returns:
            Dict: 순위 히스토리 데이터
        """
        if os.path.exists(self.history_file):
            try:
                with open(self.history_file, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except (json.JSONDecodeError, IOError) as e:
                print(f"Error loading history: {e}")
                return {}
        return {}
    
    def save_history(self):
        """
        순위 히스토리를 파일에 저장
        """
        # 디렉토리가 없으면 생성
        os.makedirs(os.path.dirname(self.history_file), exist_ok=True)
        
        try:
            with open(self.history_file, 'w', encoding='utf-8') as f:
                json.dump(self.history, f, ensure_ascii=False, indent=2)
        except IOError as e:
            print(f"Error saving history: {e}")
    
    def update_history(self, current_data: Dict, timestamp: str):
        """
        현재 차트 데이터로 히스토리 업데이트 (타겟 곡 전용, 차트아웃 포함)
        
        Args:
            current_data (Dict): 현재 차트 데이터
            timestamp (str): 정각 타임스탬프
        """
        
        # 현재 데이터 저장
        self.history[timestamp] = {
            "_processed_at": get_current_kst_iso() # 매번 달라지는 정확한 타임스탬프 추가
        }
        
        # 모든 서비스에 대해 타겟 곡 상태 저장 (차트아웃 포함)
        service_names = ["melon_top100", "melon_hot100", "melon", "genie", "bugs", "vibe", "flo"]
        
        for service_name in service_names:
            self.history[timestamp][service_name] = []
            songs = current_data.get(service_name, [])
            
            # 현재 차트에 있는 타겟 곡들 저장
            if songs:
                for song in songs:
                    if isinstance(song, dict):
                        song_info = {
                            "rank": song.get("rank"),
                            "timestamp": song.get("timestamp", timestamp)
                        }
                        # 멜론의 경우 차트 타입도 저장
                        if "chart_type" in song:
                            song_info["chart_type"] = song["chart_type"]
                        
                        self.history[timestamp][service_name].append(song_info)
            else:
                # 차트에 없는 경우 rank: null로 저장 (KST 기준)
                song_info = {
                    "rank": None,
                    "timestamp": timestamp  # timestamp는 이미 KST 정각 형식
                }
                # 멜론 서비스의 경우 적절한 차트 타입 설정
                if service_name == "melon_top100":
                    song_info["chart_type"] = "TOP100"
                elif service_name == "melon_hot100":
                    song_info["chart_type"] = "HOT100"
                elif service_name == "melon":
                    song_info["chart_type"] = "HOT100"  # 기본값
                
                self.history[timestamp][service_name].append(song_info)
        
        # 히스토리 저장
        self.save_history()
    
    def get_rank_changes(self, current_data: Dict, target_songs_only: bool = True) -> Dict:
        """
        순위 변화량 계산 (타겟 곡 전용, 최적화된 구조)
        
        Args:
            current_data (Dict): 현재 차트 데이터
            target_songs_only (bool): 타겟 곡만 비교할지 여부
            
        Returns:
            Dict: 순위 변화 정보
        """
        from target_songs import TARGET_ARTIST, TARGET_SONG
        
        if not self.history:
            return {}
        
        # 현재 시점보다 이전의 가장 최근 히스토리 가져오기
        from utils import get_current_kst_timestamp_short
        current_time = get_current_kst_timestamp_short()
        
        # 현재 시점보다 이전 시점들만 필터링
        previous_timestamps = [t for t in self.history.keys() if t < current_time]
        
        if not previous_timestamps:
            print("⚠️ 비교할 이전 시점 데이터가 없습니다.")
            return {}
            
        latest_timestamp = max(previous_timestamps)
        previous_data = self.history[latest_timestamp]
        print(f"🔍 순위 변화 비교: {latest_timestamp} → {current_time}")
        
        changes = {}
        
        # 모든 서비스에 대해 순위 변화 계산
        service_names = ["melon_top100", "melon_hot100", "melon", "genie", "bugs", "vibe", "flo"]
        
        for service_name in service_names:
            current_songs = current_data.get(service_name, [])
            previous_songs = previous_data.get(service_name, [])
            
            # 현재 순위 (타겟 곡이 있으면 첫 번째 곡의 순위, 없으면 None)
            current_rank = None
            current_timestamp = ""
            chart_type = None
            if current_songs:
                current_rank = current_songs[0].get('rank')
                current_timestamp = current_songs[0].get('timestamp', '')
                chart_type = current_songs[0].get('chart_type')
            
            # 이전 순위 (타겟 곡이 있었으면 첫 번째 곡의 순위, 없었으면 None)
            previous_rank = None
            if previous_songs:
                previous_rank = previous_songs[0].get('rank')
            
            # 순위 변화 정보 생성
            change_info = {
                "rank": current_rank,
                "title": TARGET_SONG,  # 설정에서 가져옴
                "artist": TARGET_ARTIST,  # 설정에서 가져옴
                "previous_rank": previous_rank,
                "change": self._calculate_change(current_rank, previous_rank),
                "change_text": self._get_change_text(current_rank, previous_rank),
                "timestamp": current_timestamp
            }
            
            # 멜론의 경우 차트 타입도 포함
            if chart_type:
                change_info["chart_type"] = chart_type
            
            changes[service_name] = [change_info]
        
        return changes
    
    def _calculate_change(self, current_rank: Optional[int], previous_rank: Optional[int]) -> int:
        """
        순위 변화량 계산
        
        Args:
            current_rank (Optional[int]): 현재 순위 (None이면 차트아웃)
            previous_rank (Optional[int]): 이전 순위
            
        Returns:
            int: 변화량 (양수: 상승, 음수: 하락, 0: 변화없음)
        """
        # 현재 차트아웃된 경우
        if current_rank is None:
            return 0
        
        # 신규 진입인 경우
        if previous_rank is None:
            return 0
        
        # 순위가 낮을수록 숫자가 크므로, 이전 순위에서 현재 순위를 빼면 됨
        return previous_rank - current_rank
    
    def _get_change_text(self, current_rank: Optional[int], previous_rank: Optional[int]) -> str:
        """
        순위 변화 텍스트 생성
        
        Args:
            current_rank (Optional[int]): 현재 순위 (None이면 차트아웃)
            previous_rank (Optional[int]): 이전 순위
            
        Returns:
            str: 변화 텍스트
        """
        # 현재 차트아웃된 경우
        if current_rank is None:
            return "차트아웃"
        
        # 신규 진입인 경우
        if previous_rank is None:
            return "NEW"
        
        change = self._calculate_change(current_rank, previous_rank)
        
        if change > 0:
            return f"↑{change}"
        elif change < 0:
            return f"↓{abs(change)}"
        else:
            return "-"
    
    def get_timestamps(self) -> List[str]:
        """
        저장된 타임스탬프 목록 반환
        
        Returns:
            List[str]: 타임스탬프 목록
        """
        return sorted(self.history.keys())
    
    def cleanup_old_history(self, keep_count: int = 24):
        """
        오래된 히스토리 정리 (최근 N개만 유지)
        
        Args:
            keep_count (int): 유지할 히스토리 개수
        """
        timestamps = self.get_timestamps()
        
        if len(timestamps) > keep_count:
            # 오래된 데이터 삭제
            for timestamp in timestamps[:-keep_count]:
                del self.history[timestamp]
            
            self.save_history() 