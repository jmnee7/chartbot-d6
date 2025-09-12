"""
Supabase Python 클라이언트 - 크롤러용
"""

import os
import json
from datetime import datetime
from typing import Dict, Any, Optional, List
from dotenv import load_dotenv
from supabase import create_client, Client

# .env 파일 로드
load_dotenv()


class SupabaseClient:
    """
    크롤러를 위한 Supabase 클라이언트
    """
    
    def __init__(self):
        """
        Supabase 클라이언트 초기화
        """
        self.url = os.getenv('SUPABASE_URL')
        self.key = os.getenv('SUPABASE_SERVICE_KEY')
        
        if not self.url or not self.key:
            print("⚠️ Supabase 환경변수가 설정되지 않았습니다.")
            print("SUPABASE_URL과 SUPABASE_SERVICE_KEY를 .env에 추가해주세요.")
            self.client = None
            return
            
        try:
            self.client: Client = create_client(self.url, self.key)
            print("✅ Supabase 클라이언트 초기화 완료")
        except Exception as e:
            print(f"❌ Supabase 클라이언트 초기화 실패: {e}")
            self.client = None
    
    def is_available(self) -> bool:
        """
        Supabase 클라이언트 사용 가능 여부 확인
        
        Returns:
            bool: 사용 가능하면 True
        """
        return self.client is not None
    
    def get_admin_setting(self, key: str, default_value: Any = None) -> Any:
        """
        관리자 설정 값 가져오기
        
        Args:
            key (str): 설정 키
            default_value (Any): 기본값
            
        Returns:
            Any: 설정 값
        """
        if not self.is_available():
            return default_value
            
        try:
            response = self.client.table('admin_settings').select('value').eq('key', key).eq('is_active', True).single().execute()
            if response.data:
                return response.data['value']
            return default_value
        except Exception as e:
            print(f"⚠️ 설정 '{key}' 조회 실패: {e}")
            return default_value
    
    def update_admin_setting(self, key: str, value: Any, description: str = None, category: str = None) -> bool:
        """
        관리자 설정 값 업데이트 (없으면 생성)
        
        Args:
            key (str): 설정 키
            value (Any): 설정 값
            description (str): 설명
            category (str): 카테고리
            
        Returns:
            bool: 성공 여부
        """
        if not self.is_available():
            return False
            
        try:
            data = {
                'key': key,
                'value': value,
                'updated_at': datetime.now().isoformat(),
                'updated_by': 'crawler'
            }
            
            if description:
                data['description'] = description
            if category:
                data['category'] = category
            
            # upsert: 있으면 업데이트, 없으면 생성
            response = self.client.table('admin_settings').upsert(data, on_conflict=['key']).execute()
            print(f"✅ 설정 '{key}' 업데이트 완료")
            return True
        except Exception as e:
            print(f"❌ 설정 '{key}' 업데이트 실패: {e}")
            return False
    
    def log_crawler_status(self, platform: str, status: str, **kwargs) -> bool:
        """
        크롤러 상태 로깅
        
        Args:
            platform (str): 플랫폼명 (melon, genie, bugs, vibe, flo, youtube)
            status (str): 상태 (success, error, timeout, partial)
            **kwargs: 추가 메타데이터
            
        Returns:
            bool: 성공 여부
        """
        if not self.is_available():
            return False
            
        try:
            data = {
                'platform': platform,
                'status': status,
                'created_at': datetime.now().isoformat(),
                **{k: v for k, v in kwargs.items() if k in [
                    'execution_time', 'songs_found', 'error_message', 
                    'error_type', 'github_run_id', 'metadata'
                ]}
            }
            
            response = self.client.table('crawler_logs').insert(data).execute()
            return True
        except Exception as e:
            print(f"❌ 크롤러 로그 저장 실패: {e}")
            return False
    
    def get_youtube_config(self) -> Dict[str, Any]:
        """
        YouTube 설정 가져오기
        
        Returns:
            Dict: YouTube 설정 (banner_video, stats_video, crawler_video)
        """
        config = self.get_admin_setting('youtube_config', {
            'banner_video': {'video_id': 'hZ6pts6e8dI', 'title': '꿈의 버스'},
            'stats_video': {'video_id': 'b_Eh-9Jz_L8', 'title': 'INSIDE OUT'},
            'crawler_video': {'video_id': 'b_Eh-9Jz_L8', 'title': 'INSIDE OUT'}
        })
        return config
    
    def get_chart_config(self) -> Dict[str, Any]:
        """
        차트 설정 가져오기
        
        Returns:
            Dict: 차트 설정
        """
        config = self.get_admin_setting('chart_config', {
            'main_page_featured': ['HAPPY', 'Welcome to the Show', 'INSIDE OUT'],
            'target_artist': 'DAY6',
            'search_mode': 'artists',
            'chart_page_max_display': 50
        })
        return config
    
    def test_connection(self) -> bool:
        """
        연결 테스트
        
        Returns:
            bool: 연결 성공 여부
        """
        if not self.is_available():
            return False
            
        try:
            # 간단한 쿼리로 연결 테스트
            response = self.client.table('admin_settings').select('count', count='exact').limit(1).execute()
            print(f"✅ Supabase 연결 성공: {response.count}개 설정 발견")
            return True
        except Exception as e:
            print(f"❌ Supabase 연결 실패: {e}")
            return False


# 전역 인스턴스 생성
supabase_client = SupabaseClient()


def test_supabase_connection():
    """
    Supabase 연결 테스트 함수
    """
    print("🧪 Supabase 연결 테스트 시작...")
    client = SupabaseClient()
    
    if client.test_connection():
        print("✅ 연결 테스트 성공!")
        
        # 테스트 설정 값 가져오기
        test_value = client.get_admin_setting('test_key', 'default_value')
        print(f"테스트 설정값: {test_value}")
        
        return True
    else:
        print("❌ 연결 테스트 실패!")
        return False


if __name__ == "__main__":
    test_supabase_connection()