"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  fetchRadioStations, 
  updateRadioStation,
  addRadioStation,
  deleteRadioStation
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
import { Settings, Save, RotateCcw, Plus, Trash2, ExternalLink } from "lucide-react";
import type { RadioStation } from "@/lib/api/voting-content";

interface RadioStationEditModalProps {
  trigger?: React.ReactNode;
}

export function RadioStationEditModal({ trigger }: RadioStationEditModalProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // DB에서 라디오 방송국 데이터 가져오기
  const { data: radioStations, isLoading } = useQuery({
    queryKey: ["radioStations"],
    queryFn: fetchRadioStations,
    staleTime: 60000, // 1분간 캐시
  });

  // 편집 상태
  const [editingStations, setEditingStations] = useState<
    Omit<RadioStation, 'created_at' | 'updated_at'>[]
  >([]);

  // 데이터 로드시 편집 상태 초기화
  useEffect(() => {
    if (radioStations) {
      setEditingStations(radioStations.map(station => ({
        id: station.id,
        name: station.name,
        url: station.url,
        logo: station.logo,
        description: station.description,
        is_active: station.is_active,
        display_order: station.display_order,
      })));
    } else {
      // DB에 데이터가 없으면 기본값 사용
      setEditingStations([
        { id: 0, name: "KBS", url: "https://world.kbs.co.kr/service/program_main.htm?lang=e&procode=weekend", is_active: true, display_order: 1 },
        { id: 0, name: "MBC", url: "https://www.imbc.com/broad/radio", is_active: true, display_order: 2 },
        { id: 0, name: "SBS", url: "https://www.sbs.co.kr/radio?div=gnb_pc", is_active: true, display_order: 3 },
      ]);
    }
  }, [radioStations]);

  // 방송국 수정 핸들러
  const updateStation = (index: number, field: keyof typeof editingStations[0], value: any) => {
    setEditingStations(prev => prev.map((station, i) => 
      i === index ? { ...station, [field]: value } : station
    ));
  };

  // 방송국 추가
  const addStation = () => {
    const newOrder = Math.max(...editingStations.map(s => s.display_order), 0) + 1;
    setEditingStations(prev => [...prev, {
      id: 0, // 새 항목은 id 0으로 시작
      name: "",
      url: "",
      is_active: true,
      display_order: newOrder,
    }]);
  };

  // 방송국 제거
  const removeStation = (index: number) => {
    setEditingStations(prev => prev.filter((_, i) => i !== index));
  };

  // DB에 저장하는 함수
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      let allSuccess = true;

      for (const station of editingStations) {
        if (!station.name.trim() || !station.url.trim()) {
          continue; // 빈 항목은 건너뛰기
        }

        if (station.id === 0) {
          // 새 항목 추가
          const success = await addRadioStation({
            name: station.name,
            url: station.url,
            logo: station.logo,
            description: station.description,
            is_active: station.is_active,
            display_order: station.display_order,
          });
          if (!success) allSuccess = false;
        } else {
          // 기존 항목 업데이트
          const success = await updateRadioStation(station.id, {
            name: station.name,
            url: station.url,
            logo: station.logo,
            description: station.description,
            is_active: station.is_active,
            display_order: station.display_order,
          });
          if (!success) allSuccess = false;
        }
      }

      // 삭제된 항목 처리 (기존 DB에 있었는데 편집 목록에 없는 항목들)
      if (radioStations) {
        const editingIds = editingStations.filter(s => s.id !== 0).map(s => s.id);
        const deletedStations = radioStations.filter(s => !editingIds.includes(s.id));
        
        for (const station of deletedStations) {
          const success = await deleteRadioStation(station.id);
          if (!success) allSuccess = false;
        }
      }

      if (allSuccess) {
        // React Query 캐시 무효화
        queryClient.invalidateQueries({ queryKey: ["radioStations"] });
        
        setIsOpen(false);
        alert('라디오 방송국이 저장되었습니다.');
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
    if (radioStations) {
      setEditingStations(radioStations.map(station => ({
        id: station.id,
        name: station.name,
        url: station.url,
        logo: station.logo,
        description: station.description,
        is_active: station.is_active,
        display_order: station.display_order,
      })));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            라디오 편집
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            라디오 방송국 편집
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-sm text-gray-500">데이터를 불러오는 중...</div>
          </div>
        ) : (
          <div className="space-y-6 py-4">
            {/* 방송국 목록 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-semibold">라디오 방송국 목록</Label>
                <Badge variant="outline">{editingStations.length}개</Badge>
              </div>

              {editingStations.map((station, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm font-medium">방송국 {index + 1}</Label>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => removeStation(index)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs text-gray-600">방송국명</Label>
                      <Input
                        value={station.name}
                        onChange={(e) => updateStation(index, 'name', e.target.value)}
                        placeholder="KBS"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-gray-600">순서</Label>
                      <Input
                        type="number"
                        value={station.display_order}
                        onChange={(e) => updateStation(index, 'display_order', parseInt(e.target.value) || 1)}
                        min="1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">URL</Label>
                    <div className="flex gap-2">
                      <Input
                        value={station.url}
                        onChange={(e) => updateStation(index, 'url', e.target.value)}
                        placeholder="https://world.kbs.co.kr/..."
                        className="flex-1"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(station.url, '_blank')}
                        disabled={!station.url}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-gray-600">설명 (선택사항)</Label>
                    <Input
                      value={station.description || ''}
                      onChange={(e) => updateStation(index, 'description', e.target.value)}
                      placeholder="라디오 신청하기"
                    />
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addStation}
                className="w-full gap-2"
              >
                <Plus className="w-4 h-4" />
                라디오 방송국 추가
              </Button>
            </div>

            {/* 미리보기 */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-sm font-semibold text-gray-700">현재 설정 요약</Label>
              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <p>• 활성 방송국: {editingStations.filter(s => s.is_active).length}개</p>
                <p>• 전체 방송국: {editingStations.length}개</p>
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