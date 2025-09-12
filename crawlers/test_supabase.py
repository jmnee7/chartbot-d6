#!/usr/bin/env python3
"""
Supabase 연결 테스트
실행: python test_supabase.py
"""
import os
from dotenv import load_dotenv
from supabase import create_client, Client

# 환경변수 로드
load_dotenv()

def test_supabase_connection():
    """Supabase 데이터베이스 연결 및 기본 쿼리 테스트"""
    try:
        url = os.getenv('SUPABASE_URL')
        key = os.getenv('SUPABASE_SERVICE_KEY')
        
        if not url or not key:
            print("❌ 환경변수가 설정되지 않았습니다")
            print("SUPABASE_URL:", "✅" if url else "❌")
            print("SUPABASE_SERVICE_KEY:", "✅" if key else "❌")
            return False
            
        print(f"🔗 연결 시도: {url}")
        supabase: Client = create_client(url, key)
        
        # 1. admin_users 테이블 테스트
        print("\n1️⃣ admin_users 테이블 테스트...")
        response = supabase.table('admin_users').select('email, name, is_active').limit(3).execute()
        print(f"✅ 관리자 계정 개수: {len(response.data)}")
        for user in response.data:
            print(f"   - {user['email']} ({user['name']})")
        
        # 2. 메인 차트 표시곡 조회 테스트
        print("\n2️⃣ 메인 차트 표시곡 테스트...")
        chart_response = supabase.table('main_chart_display_songs').select('song_title, search_keywords').execute()
        print(f"✅ 차트 표시곡 로드 성공 ({len(chart_response.data)}곡)")
        for song in chart_response.data:
            print(f"   - {song['song_title']}")
        
        # 3. 스트리밍 플랫폼 테이블 테스트
        print("\n3️⃣ 스트리밍 플랫폼 테스트...")
        platform_response = supabase.table('streaming_platforms').select('platform_id, name').limit(5).execute()
        print(f"✅ 플랫폼 {len(platform_response.data)}개 로드됨")
        for platform in platform_response.data:
            print(f"   - {platform['name']} ({platform['platform_id']})")
        
        print("\n🎉 모든 테스트 성공! Supabase 연결이 정상적으로 작동합니다.")
        return True
        
    except Exception as e:
        print(f"❌ Supabase 연결 실패: {e}")
        return False

def test_admin_setting_methods():
    """SupabaseClient 클래스의 관리자 설정 메서드 테스트"""
    try:
        from supabase_client import SupabaseClient
        
        print("\n🧪 SupabaseClient 클래스 메서드 테스트...")
        client = SupabaseClient()
        
        # YouTube 설정 조회
        youtube_config = client.get_admin_setting('youtube_videos')
        if youtube_config:
            print("✅ get_admin_setting() 메서드 정상 작동")
            stats_video = youtube_config.get('stats_video', {})
            print(f"   현재 통계 비디오: {stats_video.get('title', 'N/A')}")
        
        # 크롤러 활성화 상태 확인
        crawler_enabled = client.get_admin_setting('crawler_enabled', False)
        print(f"✅ 크롤러 활성화: {'ON' if crawler_enabled else 'OFF'}")
        
        return True
        
    except ImportError:
        print("⚠️  supabase_client.py 파일을 찾을 수 없습니다")
        return False
    except Exception as e:
        print(f"❌ SupabaseClient 테스트 실패: {e}")
        return False

if __name__ == "__main__":
    print("🚀 D6 Admin System - Supabase 연결 테스트\n")
    
    # 기본 연결 테스트
    basic_test = test_supabase_connection()
    
    # 클래스 메서드 테스트
    if basic_test:
        test_admin_setting_methods()
    
    print("\n" + "="*50)
    print("테스트 완료!")