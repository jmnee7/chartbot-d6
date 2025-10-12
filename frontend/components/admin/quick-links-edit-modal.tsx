"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  fetchRadioContent, 
  fetchMusicVoteContent,
  updateRadioContent,
  updateMusicVoteContent
} from "@/lib/api/quick-links";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Save, RotateCcw, Plus, Trash2 } from "lucide-react";
import type { RadioStationSMS, VoteSMSInfo } from "@/lib/api/quick-links";

interface QuickLinksEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void;
}

export function QuickLinksEditModal({ isOpen, onClose, onUpdate }: QuickLinksEditModalProps) {
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  
  // DB에서 라디오와 음악 투표 데이터 가져오기
  const { data: radioContent, isLoading: isRadioLoading } = useQuery({
    queryKey: ["radioContent"],
    queryFn: fetchRadioContent,
    staleTime: 60000, // 1분간 캐시
  });

  const { data: musicVoteContent, isLoading: isMusicVoteLoading } = useQuery({
    queryKey: ["musicVoteContent"],
    queryFn: fetchMusicVoteContent,
    staleTime: 60000, // 1분간 캐시
  });

  // 편집 상태
  const [radioData, setRadioData] = useState({
    title: '라디오 신청',
    description: 'DAY6 라디오 신청하기',
    songs: ['INSIDE OUT', '꿈의 버스'],
    radio_stations: [
      { name: 'KBS', sms_number: '8910', color: 'bg-red-500', message_template: 'DAY6(데이식스)의 ${selectedSong} 신청합니다.' },
      { name: 'MBC', sms_number: '8000', color: 'bg-blue-500', message_template: 'DAY6(데이식스)의 ${selectedSong} 신청합니다.' },
      { name: 'SBS', sms_number: '1077', color: 'bg-green-500', message_template: 'DAY6(데이식스)의 ${selectedSong} 신청합니다.' }
    ] as RadioStationSMS[]
  });

  const [musicVoteData, setMusicVoteData] = useState({
    title: '음중 문자 투표',
    description: '음악중심 투표 참여',
    vote_sms: {
      sms_number: '0505',
      message: 'DAY6',
      description: 'DAY6 투표를 위해 모바일에서 접속해주세요.',
      button_text: 'DAY6 투표하기 (#0505)'
    } as VoteSMSInfo
  });

  // 데이터 로드시 편집 상태 초기화
  useEffect(() => {
    if (radioContent) {
      setRadioData({
        title: radioContent.title,
        description: radioContent.description,
        songs: radioContent.songs || ['INSIDE OUT', '꿈의 버스'],
        radio_stations: (radioContent.radio_stations as RadioStationSMS[]) || radioData.radio_stations
      });
    }
  }, [radioContent]);

  useEffect(() => {
    if (musicVoteContent) {
      setMusicVoteData({
        title: musicVoteContent.title,
        description: musicVoteContent.description,
        vote_sms: (musicVoteContent.vote_sms as VoteSMSInfo) || musicVoteData.vote_sms
      });
    }
  }, [musicVoteContent]);

  // 라디오 곡 수정
  const updateRadioSong = (index: number, value: string) => {
    setRadioData(prev => ({
      ...prev,
      songs: prev.songs.map((song, i) => i === index ? value : song)
    }));
  };

  // 라디오 곡 추가
  const addRadioSong = () => {
    setRadioData(prev => ({
      ...prev,
      songs: [...prev.songs, '']
    }));
  };

  // 라디오 곡 제거
  const removeRadioSong = (index: number) => {
    setRadioData(prev => ({
      ...prev,
      songs: prev.songs.filter((_, i) => i !== index)
    }));
  };

  // 라디오 방송국 수정
  const updateRadioStation = (index: number, field: keyof RadioStationSMS, value: string) => {
    setRadioData(prev => ({
      ...prev,
      radio_stations: prev.radio_stations.map((station, i) => 
        i === index ? { ...station, [field]: value } : station
      )
    }));
  };

  // 라디오 방송국 추가
  const addRadioStation = () => {
    setRadioData(prev => ({
      ...prev,
      radio_stations: [...prev.radio_stations, {
        name: '',
        sms_number: '',
        color: 'bg-gray-500',
        message_template: 'DAY6(데이식스)의 ${selectedSong} 신청합니다.'
      }]
    }));
  };

  // 라디오 방송국 제거
  const removeRadioStation = (index: number) => {
    setRadioData(prev => ({
      ...prev,
      radio_stations: prev.radio_stations.filter((_, i) => i !== index)
    }));
  };

  // 음악 투표 데이터 수정
  const updateMusicVote = (field: keyof VoteSMSInfo, value: string) => {
    setMusicVoteData(prev => ({
      ...prev,
      vote_sms: { ...prev.vote_sms, [field]: value }
    }));
  };

  // DB에 저장하는 함수
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // 라디오 콘텐츠 저장
      console.log('Saving radio data:', {
        title: radioData.title,
        description: radioData.description,
        songs: radioData.songs.filter(s => s.trim()),
        radio_stations: radioData.radio_stations
      });
      
      const radioSuccess = await updateRadioContent({
        title: radioData.title,
        description: radioData.description,
        songs: radioData.songs.filter(s => s.trim()),
        radio_stations: radioData.radio_stations
      });

      // 음악 투표 콘텐츠 저장
      const musicVoteSuccess = await updateMusicVoteContent({
        title: musicVoteData.title,
        description: musicVoteData.description,
        vote_sms: musicVoteData.vote_sms
      });

      if (radioSuccess && musicVoteSuccess) {
        // React Query 캐시 무효화
        queryClient.invalidateQueries({ queryKey: ["radioContent"] });
        queryClient.invalidateQueries({ queryKey: ["musicVoteContent"] });
        
        onClose();
        onUpdate?.(); // 부모 컴포넌트에 업데이트 알림
        alert('빠른 링크 설정이 저장되었습니다.');
      } else {
        alert('일부 변경사항 저장에 실패했습니다.');
      }
      
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  // 초기화 함수
  const handleReset = () => {
    if (radioContent) {
      setRadioData({
        title: radioContent.title,
        description: radioContent.description,
        songs: radioContent.songs || ['INSIDE OUT', '꿈의 버스'],
        radio_stations: (radioContent.radio_stations as RadioStationSMS[]) || radioData.radio_stations
      });
    }
    
    if (musicVoteContent) {
      setMusicVoteData({
        title: musicVoteContent.title,
        description: musicVoteContent.description,
        vote_sms: (musicVoteContent.vote_sms as VoteSMSInfo) || musicVoteData.vote_sms
      });
    }
  };

  const isLoading = isRadioLoading || isMusicVoteLoading;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      
      <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            홈 빠른 링크 편집
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-gray-500">데이터를 불러오는 중...</div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            <Tabs defaultValue="radio" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="radio">라디오 신청</TabsTrigger>
                <TabsTrigger value="vote">음중 문자 투표</TabsTrigger>
              </TabsList>

              <TabsContent value="radio" className="space-y-4 mt-4">
                {/* 라디오 기본 정보 */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">기본 정보</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-gray-600">제목</Label>
                      <Input
                        value={radioData.title}
                        onChange={(e) => setRadioData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="라디오 신청"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">설명</Label>
                      <Input
                        value={radioData.description}
                        onChange={(e) => setRadioData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="DAY6 라디오 신청하기"
                      />
                    </div>
                  </div>
                </div>

                {/* 타이틀곡 목록 */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">신청 가능한 타이틀곡</Label>
                  {radioData.songs.map((song, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={song}
                        onChange={(e) => updateRadioSong(index, e.target.value)}
                        placeholder="곡명"
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeRadioSong(index)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addRadioSong}
                    className="w-full gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    타이틀곡 추가
                  </Button>
                </div>

                {/* 라디오 방송국 */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">라디오 방송국</Label>
                  {radioData.radio_stations.map((station, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">방송국 {index + 1}</Label>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => removeRadioStation(index)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-gray-600">방송국명</Label>
                          <Input
                            value={station.name}
                            onChange={(e) => updateRadioStation(index, 'name', e.target.value)}
                            placeholder="KBS"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">SMS 번호</Label>
                          <Input
                            value={station.sms_number}
                            onChange={(e) => updateRadioStation(index, 'sms_number', e.target.value)}
                            placeholder="8910"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-600">메시지 템플릿</Label>
                        <Input
                          value={station.message_template}
                          onChange={(e) => updateRadioStation(index, 'message_template', e.target.value)}
                          placeholder="DAY6(데이식스)의 ${selectedSong} 신청합니다."
                        />
                        <p className="text-xs text-gray-500 mt-1">${`{selectedSong}`}은 선택한 곡으로 치환됩니다</p>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    onClick={addRadioStation}
                    className="w-full gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    방송국 추가
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="vote" className="space-y-4 mt-4">
                {/* 음중 투표 기본 정보 */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">기본 정보</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-gray-600">제목</Label>
                      <Input
                        value={musicVoteData.title}
                        onChange={(e) => setMusicVoteData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="음중 문자 투표"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">설명</Label>
                      <Input
                        value={musicVoteData.description}
                        onChange={(e) => setMusicVoteData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="음악중심 투표 참여"
                      />
                    </div>
                  </div>
                </div>

                {/* SMS 투표 정보 */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">SMS 투표 설정</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-gray-600">SMS 번호</Label>
                      <Input
                        value={musicVoteData.vote_sms.sms_number}
                        onChange={(e) => updateMusicVote('sms_number', e.target.value)}
                        placeholder="0505"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">메시지 내용</Label>
                      <Input
                        value={musicVoteData.vote_sms.message}
                        onChange={(e) => updateMusicVote('message', e.target.value)}
                        placeholder="DAY6"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">모달 설명 텍스트</Label>
                    <Input
                      value={musicVoteData.vote_sms.description}
                      onChange={(e) => updateMusicVote('description', e.target.value)}
                      placeholder="DAY6 투표를 위해 모바일에서 접속해주세요."
                    />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-600">버튼 텍스트</Label>
                    <Input
                      value={musicVoteData.vote_sms.button_text}
                      onChange={(e) => updateMusicVote('button_text', e.target.value)}
                      placeholder="DAY6 투표하기 (#0505)"
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* 버튼 */}
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={handleReset}
                className="gap-2"
                disabled={isLoading}
              >
                <RotateCcw className="w-4 h-4" />
                초기화
              </Button>
              
              <Button
                onClick={handleSave}
                disabled={isSaving || isLoading}
                className="gap-2 bg-mint-primary hover:bg-mint-dark"
              >
                <Save className="w-4 h-4" />
                {isSaving ? '저장 중...' : '저장'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}