"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  fetchChartDisplayConfig, 
  fetchChartSettings,
  updateChartDisplayConfig,
  updateChartSetting 
} from "@/lib/api/chart-config";
import { fetchChartData } from "@/lib/api";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Save, RotateCcw } from "lucide-react";

interface ChartEditModalProps {
  trigger?: React.ReactNode;
}

export function ChartEditModal({ trigger }: ChartEditModalProps) {
  const queryClient = useQueryClient();
  
  // 현재 설정 데이터
  const { data: displayConfig } = useQuery({
    queryKey: ["chartDisplayConfig"],
    queryFn: fetchChartDisplayConfig,
  });

  const { data: chartSettings } = useQuery({
    queryKey: ["chartSettings"],
    queryFn: fetchChartSettings,
  });

  // 차트 데이터 가져오기
  const { data: chartData } = useQuery({
    queryKey: ["chartData"],
    queryFn: fetchChartData,
  });

  // DAY6 곡들 추출
  const availableSongs = useMemo(() => {
    if (!chartData) return [];
    
    const songs = new Set<string>();
    const platforms = ["melon_top100", "melon_hot100", "genie", "bugs", "vibe", "flo"];
    
    platforms.forEach(platform => {
      const platformSongs = chartData[platform as keyof typeof chartData] as any[];
      if (platformSongs) {
        platformSongs.forEach(song => {
          if (song.artist && song.artist.includes("DAY6") && song.title) {
            songs.add(song.title);
          }
        });
      }
    });
    
    return Array.from(songs).sort();
  }, [chartData]);

  // 편집 상태
  const [editingSongs, setEditingSongs] = useState<{
    first: string;
    second: string;
  }>({ first: "", second: "" });

  const [rollingInterval, setRollingInterval] = useState(5000);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 초기 데이터 설정
  useEffect(() => {
    if (displayConfig && displayConfig.length >= 2) {
      const sortedSongs = [...displayConfig].sort((a, b) => a.priority - b.priority);
      setEditingSongs({
        first: sortedSongs[0]?.target_song || "",
        second: sortedSongs[1]?.target_song || "",
      });
    }
  }, [displayConfig]);

  useEffect(() => {
    if (chartSettings) {
      setRollingInterval(chartSettings.chart_rolling_interval || 5000);
    }
  }, [chartSettings]);

  // 저장 함수
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // 타이틀곡 업데이트
      if (displayConfig && displayConfig.length >= 2) {
        const sortedSongs = [...displayConfig].sort((a, b) => a.priority - b.priority);
        
        await updateChartDisplayConfig(sortedSongs[0].id, {
          target_song: editingSongs.first,
          updated_at: new Date().toISOString()
        });
        
        await updateChartDisplayConfig(sortedSongs[1].id, {
          target_song: editingSongs.second,
          updated_at: new Date().toISOString()
        });
      }

      // 롤링 시간 업데이트
      await updateChartSetting('chart_rolling_interval', rollingInterval);

      // 캐시 무효화하여 UI 업데이트
      queryClient.invalidateQueries({ queryKey: ["chartDisplayConfig"] });
      queryClient.invalidateQueries({ queryKey: ["chartSettings"] });

      setIsOpen(false);
      
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  // 초기화 함수
  const handleReset = () => {
    if (displayConfig && displayConfig.length >= 2) {
      const sortedSongs = [...displayConfig].sort((a, b) => a.priority - b.priority);
      setEditingSongs({
        first: sortedSongs[0]?.target_song || "",
        second: sortedSongs[1]?.target_song || "",
      });
    }
    setRollingInterval(chartSettings?.chart_rolling_interval || 5000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            차트 설정
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            메인 차트 설정
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* 타이틀곡 설정 */}
          <div className="space-y-4">
            <Label className="text-sm font-semibold">메인 타이틀곡</Label>
            
            <div className="space-y-3">
              <div>
                <Label htmlFor="first-song" className="text-xs text-gray-600">
                  첫 번째 곡 (우선순위 1)
                </Label>
                <Select value={editingSongs.first} onValueChange={(value) => setEditingSongs(prev => ({ ...prev, first: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="차트에서 곡을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSongs.map((song) => (
                      <SelectItem key={song} value={song}>
                        {song}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="second-song" className="text-xs text-gray-600">
                  두 번째 곡 (우선순위 2)
                </Label>
                <Select value={editingSongs.second} onValueChange={(value) => setEditingSongs(prev => ({ ...prev, second: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="차트에서 곡을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSongs.map((song) => (
                      <SelectItem key={song} value={song}>
                        {song}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* 롤링 시간 설정 */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold">롤링 시간</Label>
            
            <div className="flex gap-2 flex-wrap">
              {[3000, 5000, 8000, 10000].map((time) => (
                <Badge
                  key={time}
                  variant={rollingInterval === time ? "default" : "outline"}
                  className="cursor-pointer hover:bg-mint-primary hover:text-white"
                  onClick={() => setRollingInterval(time)}
                >
                  {time / 1000}초
                </Badge>
              ))}
            </div>
            
            <div className="flex items-center gap-2">
              <Label htmlFor="custom-time" className="text-xs">사용자 지정:</Label>
              <Input
                id="custom-time"
                type="number"
                value={rollingInterval}
                onChange={(e) => setRollingInterval(Number(e.target.value))}
                className="w-20 text-center"
                min="1000"
                max="30000"
                step="1000"
              />
              <span className="text-xs text-gray-500">ms</span>
            </div>
          </div>

          {/* 미리보기 */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <Label className="text-xs font-semibold text-gray-700">미리보기</Label>
            <div className="mt-2 text-sm">
              <p><strong>{editingSongs.first}</strong> ↔ <strong>{editingSongs.second}</strong></p>
              <p className="text-gray-600">{rollingInterval / 1000}초마다 전환</p>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={handleReset}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            초기화
          </Button>
          
          <Button
            onClick={handleSave}
            disabled={isSaving || !editingSongs.first || !editingSongs.second}
            className="gap-2 bg-mint-primary hover:bg-mint-dark"
          >
            <Save className="w-4 h-4" />
            {isSaving ? '저장 중...' : '저장'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}