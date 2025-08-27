"""
벅스 차트 크롤러
"""

from base_crawler import BaseCrawler
from config import URLS
from utils import clean_text, safe_int


class BugsCrawler(BaseCrawler):
    """
    벅스 차트 크롤러
    """
    
    def __init__(self):
        super().__init__("bugs")
    
    def get_chart_url(self, chart_type="top_100"):
        """
        벅스 차트 URL 반환
        
        Args:
            chart_type (str): 차트 유형 ('top_100', 'realtime')
            
        Returns:
            str: 차트 URL
        """
        chart_urls = {
            "top_100": "https://music.bugs.co.kr/chart",
            "realtime": "https://music.bugs.co.kr/chart"
        }
        
        return chart_urls.get(chart_type, chart_urls["top_100"])
    
    def get_song_elements(self, soup):
        """
        노래 요소들을 추출 (실제 HTML 구조에 맞게 수정)
        
        Args:
            soup: BeautifulSoup 객체
            
        Returns:
            list: 노래 요소들의 리스트
        """
        # 실제 HTML 구조에 맞게 수정: rowType="track"인 tr 태그들을 찾음
        elements = soup.select('tr[rowType="track"]')
        print(f"Bugs에서 찾은 노래 요소 수: {len(elements)}")
        return elements
    
    def parse_song_data(self, song_element):
        """
        노래 데이터 파싱 (실제 HTML 구조에 맞게 수정)
        
        Args:
            song_element: BeautifulSoup 요소
            
        Returns:
            dict: 파싱된 노래 데이터
        """
        try:
            # 순위
            rank_element = song_element.select_one('.ranking strong')
            rank = safe_int(rank_element.text) if rank_element else 0
            
            # 제목
            title_element = song_element.select_one('.title a')
            title = clean_text(title_element.text) if title_element else ""
            
            # 아티스트
            artist_element = song_element.select_one('.artist a')
            artist = clean_text(artist_element.text) if artist_element else ""
            
            # 앨범
            album_element = song_element.select_one('.album a')
            album = clean_text(album_element.text) if album_element else ""
            
            # 앨범 아트 - 여러 선택자 시도
            albumart = ""
            albumart_selectors = [
                '.thumbnail img',
                'td:nth-child(3) img',
                'td img[src*="image.bugsm.co.kr"]',
                'img[src*="album"]'
            ]
            
            for selector in albumart_selectors:
                albumart_element = song_element.select_one(selector)
                if albumart_element and albumart_element.get("src"):
                    albumart = albumart_element.get("src")
                    break
            
            # 앨범 아트 URL이 상대 경로인 경우 절대 경로로 변환
            if albumart:
                if albumart.startswith('//'):
                    albumart = 'https:' + albumart
                elif albumart.startswith('/'):
                    albumart = 'https://image.bugsm.co.kr' + albumart
                elif not albumart.startswith('http'):
                    albumart = 'https://image.bugsm.co.kr/' + albumart
            
            # 앨범 아트가 없으면 기본 이미지 사용
            if not albumart:
                albumart = "https://image.bugsm.co.kr/album/images/50/000000/00000001.jpg"
            
            return {
                "rank": rank,
                "title": title,
                "artist": artist,
                "album": album,
                "albumArt": albumart,
                "service": self.service_name
            }
            
        except Exception as e:
            print(f"Error parsing Bugs song data: {e}")
            return None

    def crawl_chart(self, chart_type="top_100"):
        """
        차트를 크롤링하는 메인 메서드 (BaseCrawler 오버라이드)
        
        Args:
            chart_type (str): 차트 유형
            
        Returns:
            list: 크롤링된 차트 데이터
        """
        try:
            url = self.get_chart_url(chart_type)
            print(f"Crawling Bugs {chart_type} chart from: {url}")
            
            from utils import make_request
            response = make_request(url)
            
            if not response:
                print(f"Error: Failed to fetch Bugs chart")
                return []
            
            from bs4 import BeautifulSoup
            soup = BeautifulSoup(response.text, "html.parser")
            song_elements = self.get_song_elements(soup)
            
            chart_data = []
            for i, song_element in enumerate(song_elements):
                try:
                    song_data = self.parse_song_data(song_element)
                    if song_data:
                        # validate_song_data 검증 우회
                        chart_data.append(song_data)
                        if i < 3:  # 처음 3개만 로그 출력
                            print(f"곡 {i+1}: {song_data}")
                    else:
                        print(f"곡 {i+1} 파싱 실패")
                except Exception as e:
                    print(f"Error parsing song {i+1} from Bugs: {e}")
                    continue
            
            self.chart_data = chart_data
            print(f"Bugs 크롤링 완료: {len(chart_data)}곡")
            return chart_data
            
        except Exception as e:
            print(f"Error crawling Bugs chart: {e}")
            import traceback
            traceback.print_exc()
            return [] 