"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  fetchMusicShows, 
  updateMusicShow,
  addMusicShow,
  deleteMusicShow
} from "@/lib/api/voting-content";
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
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Save, RotateCcw, Plus, Trash2, ExternalLink } from "lucide-react";
import type { MusicShow } from "@/lib/api/voting-content";

interface MusicShowEditModalProps {
  trigger?: React.ReactNode;
}

export function MusicShowEditModal({ trigger }: MusicShowEditModalProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // DB에서 음악 방송 데이터 가져오기
  const { data: musicShows, isLoading } = useQuery({
    queryKey: ["musicShows"],
    queryFn: fetchMusicShows,
    staleTime: 60000, // 1분간 캐시
  });

  // 편집 상태
  const [editingShows, setEditingShows] = useState<
    Omit<MusicShow, 'created_at' | 'updated_at'>[]
  >([]);

  // 데이터 로드시 편집 상태 초기화
  useEffect(() => {
    if (musicShows && musicShows.length > 0) {
      setEditingShows(musicShows.map(show => ({
        id: show.id,
        show_id: show.show_id,
        name: show.name,
        channel: show.channel,
        schedule: show.schedule,
        voting_method: show.voting_method,
        voting_app: show.voting_app,
        app_download_android: show.app_download_android,
        app_download_ios: show.app_download_ios,
        app_download_web: show.app_download_web,
        program_url: show.program_url,
        icon: show.icon,
        color: show.color,
        description: show.description,
        voting_period: show.voting_period,
        voting_windows: show.voting_windows,
        notes: show.notes,
        has_voting: show.has_voting,
        is_active: show.is_active,
        display_order: show.display_order,
      })));
    }
  }, [musicShows]);

  // 방송 수정 핸들러
  const updateShow = (index: number, field: keyof typeof editingShows[0], value: any) => {
    setEditingShows(prev => prev.map((show, i) => 
      i === index ? { ...show, [field]: value } : show
    ));
  };

  // voting_windows 배열 업데이트
  const updateVotingWindows = (index: number, windows: string) => {
    const windowsArray = windows.split('\n').filter(w => w.trim());
    updateShow(index, 'voting_windows', windowsArray);
  };

  // 방송 추가
  const addShow = () => {
    const newOrder = Math.max(...editingShows.map(s => s.display_order), 0) + 1;
    setEditingShows(prev => [...prev, {
      id: 0,
      show_id: '',
      name: '',
      channel: '',
      schedule: '',
      voting_method: '',
      voting_app: '',
      app_download_android: null,
      app_download_ios: null,
      app_download_web: null,
      program_url: null,
      icon: '🎵',
      color: 'bg-blue-500',
      description: '',
      voting_period: null,
      voting_windows: null,
      notes: null,
      has_voting: true,
      is_active: true,
      display_order: newOrder,
    }]);
  };

  // 방송 제거
  const removeShow = (index: number) => {
    setEditingShows(prev => prev.filter((_, i) => i !== index));
  };

  // DB에 저장하는 함수
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      let allSuccess = true;

      for (const show of editingShows) {
        if (!show.name.trim() || !show.show_id.trim()) {
          continue; // 빈 항목은 건너뛰기
        }

        if (show.id === 0) {
          // 새 항목 추가
          const success = await addMusicShow({
            show_id: show.show_id,
            name: show.name,
            channel: show.channel,
            schedule: show.schedule,
            voting_method: show.voting_method,
            voting_app: show.voting_app,
            app_download_android: show.app_download_android,
            app_download_ios: show.app_download_ios,
            app_download_web: show.app_download_web,
            program_url: show.program_url,
            icon: show.icon,
            color: show.color,
            description: show.description,
            voting_period: show.voting_period,
            voting_windows: show.voting_windows,
            notes: show.notes,
            has_voting: show.has_voting,
            is_active: show.is_active,
            display_order: show.display_order,
          });
          if (!success) allSuccess = false;
        } else {
          // 기존 항목 업데이트
          const success = await updateMusicShow(show.id, {
            show_id: show.show_id,
            name: show.name,
            channel: show.channel,
            schedule: show.schedule,
            voting_method: show.voting_method,
            voting_app: show.voting_app,
            app_download_android: show.app_download_android,
            app_download_ios: show.app_download_ios,
            app_download_web: show.app_download_web,
            program_url: show.program_url,
            icon: show.icon,
            color: show.color,
            description: show.description,
            voting_period: show.voting_period,
            voting_windows: show.voting_windows,
            notes: show.notes,
            has_voting: show.has_voting,
            is_active: show.is_active,
            display_order: show.display_order,
          });
          if (!success) allSuccess = false;
        }
      }

      // 삭제된 항목 처리
      if (musicShows) {
        const editingIds = editingShows.filter(s => s.id !== 0).map(s => s.id);
        const deletedShows = musicShows.filter(s => !editingIds.includes(s.id));
        
        for (const show of deletedShows) {
          const success = await deleteMusicShow(show.id);
          if (!success) allSuccess = false;
        }
      }

      if (allSuccess) {
        // React Query 캐시 무효화
        queryClient.invalidateQueries({ queryKey: ["musicShows"] });
        
        setIsOpen(false);
        alert('음악 방송 정보가 저장되었습니다.');
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
    if (musicShows) {
      setEditingShows(musicShows.map(show => ({
        id: show.id,
        show_id: show.show_id,
        name: show.name,
        channel: show.channel,
        schedule: show.schedule,
        voting_method: show.voting_method,
        voting_app: show.voting_app,
        app_download_android: show.app_download_android,
        app_download_ios: show.app_download_ios,
        app_download_web: show.app_download_web,
        program_url: show.program_url,
        icon: show.icon,
        color: show.color,
        description: show.description,
        voting_period: show.voting_period,
        voting_windows: show.voting_windows,
        notes: show.notes,
        has_voting: show.has_voting,
        is_active: show.is_active,
        display_order: show.display_order,
      })));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            음악방송 편집
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            음악 방송 편집
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-gray-500">데이터를 불러오는 중...</div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* 방송 목록 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">음악 방송 목록</Label>
                <Badge variant="outline">{editingShows.length}개</Badge>
              </div>

              {editingShows.map((show, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">{show.name || `방송 ${index + 1}`}</Label>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeShow(index)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="basic">기본정보</TabsTrigger>
                      <TabsTrigger value="voting">투표정보</TabsTrigger>
                      <TabsTrigger value="links">링크</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-3 mt-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-gray-600">방송 ID</Label>
                          <Input
                            value={show.show_id}
                            onChange={(e) => updateShow(index, 'show_id', e.target.value)}
                            placeholder="the-show"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">방송명</Label>
                          <Input
                            value={show.name}
                            onChange={(e) => updateShow(index, 'name', e.target.value)}
                            placeholder="더쇼"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-gray-600">채널</Label>
                          <Input
                            value={show.channel}
                            onChange={(e) => updateShow(index, 'channel', e.target.value)}
                            placeholder="SBS M"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">방송시간</Label>
                          <Input
                            value={show.schedule}
                            onChange={(e) => updateShow(index, 'schedule', e.target.value)}
                            placeholder="매주 화요일 오후 6시"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label className="text-xs text-gray-600">아이콘</Label>
                          <Input
                            value={show.icon}
                            onChange={(e) => updateShow(index, 'icon', e.target.value)}
                            placeholder="🟦"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">색상 클래스</Label>
                          <Input
                            value={show.color}
                            onChange={(e) => updateShow(index, 'color', e.target.value)}
                            placeholder="bg-purple-500"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">순서</Label>
                          <Input
                            type="number"
                            value={show.display_order}
                            onChange={(e) => updateShow(index, 'display_order', parseInt(e.target.value) || 1)}
                            min="1"
                          />
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="voting" className="space-y-3 mt-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs text-gray-600">투표 방법</Label>
                          <Input
                            value={show.voting_method}
                            onChange={(e) => updateShow(index, 'voting_method', e.target.value)}
                            placeholder="STAR PLANET"
                          />
                        </div>
                        <div>
                          <Label className="text-xs text-gray-600">투표 앱</Label>
                          <Input
                            value={show.voting_app}
                            onChange={(e) => updateShow(index, 'voting_app', e.target.value)}
                            placeholder="STAR PLANET"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-gray-600">투표 기간</Label>
                        <Input
                          value={show.voting_period || ''}
                          onChange={(e) => updateShow(index, 'voting_period', e.target.value)}
                          placeholder="(통상) 금 20:00 ~ 월 14:00 KST"
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-600">투표 구간 (한 줄씩 입력)</Label>
                        <textarea
                          className="w-full p-2 border border-gray-300 rounded-md text-sm"
                          rows={3}
                          value={show.voting_windows?.join('\n') || ''}
                          onChange={(e) => updateVotingWindows(index, e.target.value)}
                          placeholder="사전투표: 금 20:00 ~ 월 14:00 KST&#10;실시간: 화 생방 중"
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-600">설명</Label>
                        <Input
                          value={show.description}
                          onChange={(e) => updateShow(index, 'description', e.target.value)}
                          placeholder="젤리(Heart Jelly) 소모형 투표"
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-600">비고</Label>
                        <Input
                          value={show.notes || ''}
                          onChange={(e) => updateShow(index, 'notes', e.target.value)}
                          placeholder="편성/특집에 따라 변동 가능"
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`voting-${index}`}
                          checked={show.has_voting}
                          onCheckedChange={(checked) => updateShow(index, 'has_voting', checked)}
                        />
                        <Label htmlFor={`voting-${index}`} className="text-xs">투표 가능</Label>
                      </div>
                    </TabsContent>

                    <TabsContent value="links" className="space-y-3 mt-3">
                      <div>
                        <Label className="text-xs text-gray-600">웹 다운로드 링크</Label>
                        <div className="flex gap-2">
                          <Input
                            value={show.app_download_web || ''}
                            onChange={(e) => updateShow(index, 'app_download_web', e.target.value)}
                            placeholder="https://www.thestarplanet.com/"
                            className="flex-1"
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => show.app_download_web && window.open(show.app_download_web, '_blank')}
                            disabled={!show.app_download_web}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-gray-600">Android 다운로드 링크</Label>
                        <Input
                          value={show.app_download_android || ''}
                          onChange={(e) => updateShow(index, 'app_download_android', e.target.value)}
                          placeholder="https://play.google.com/store/apps/..."
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-600">iOS 다운로드 링크</Label>
                        <Input
                          value={show.app_download_ios || ''}
                          onChange={(e) => updateShow(index, 'app_download_ios', e.target.value)}
                          placeholder="https://apps.apple.com/us/app/..."
                        />
                      </div>

                      <div>
                        <Label className="text-xs text-gray-600">프로그램 URL</Label>
                        <Input
                          value={show.program_url || ''}
                          onChange={(e) => updateShow(index, 'program_url', e.target.value)}
                          placeholder="https://program.imbc.com/..."
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addShow}
                className="w-full gap-2"
              >
                <Plus className="w-4 h-4" />
                음악 방송 추가
              </Button>
            </div>

            {/* 미리보기 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-sm font-semibold text-gray-700">현재 설정 요약</Label>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>• 투표 가능 방송: {editingShows.filter(s => s.has_voting).length}개</p>
                <p>• 전체 방송: {editingShows.length}개</p>
              </div>
            </div>

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