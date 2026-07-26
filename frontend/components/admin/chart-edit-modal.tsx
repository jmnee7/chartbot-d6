"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchAllChartDisplayConfig,
  fetchChartSettings,
  updateChartDisplayConfig,
  updateChartSetting,
  type ChartDisplayConfig
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
import { Settings, Save, RotateCcw, Plus, Trash2, CalendarClock } from "lucide-react";

interface ChartEditModalProps {
  trigger?: React.ReactNode;
}

// "직접 입력" 셀렉 항목을 나타내는 특수 sentinel 값
const CUSTOM_OPTION = "__custom__";

// datetime-local 입력값(로컬 시각, 예: "2026-07-27T18:00")을
// KST(+09:00) 기준 ISO 문자열로 변환.
function localInputToKstIso(local: string): string | null {
  if (!local) return null;
  // 초가 없으면 붙여준다.
  const withSeconds = local.length === 16 ? `${local}:00` : local;
  return `${withSeconds}+09:00`;
}

// 저장된 ISO(TIMESTAMPTZ) 문자열을 datetime-local 입력값(KST 기준)으로 변환.
function kstIsoToLocalInput(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (isNaN(date.getTime())) return "";
  // KST(UTC+9) 기준 각 필드 계산
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  const yyyy = kst.getUTCFullYear();
  const mm = String(kst.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(kst.getUTCDate()).padStart(2, "0");
  const hh = String(kst.getUTCHours()).padStart(2, "0");
  const mi = String(kst.getUTCMinutes()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

// 곡 편집 상태
interface SongDraft {
  song: string;        // 곡명 (셀렉 선택값 또는 직접 입력값)
  isCustom: boolean;   // 직접 입력 모드 여부
  publishAt: string;   // 예약 발매 일시 (datetime-local 문자열, 비어있으면 예약 없음/즉시)
}

const emptyDraft: SongDraft = { song: "", isCustom: false, publishAt: "" };

export function ChartEditModal({ trigger }: ChartEditModalProps) {
  const queryClient = useQueryClient();

  // 관리자용: 비활성화 포함 전체 설정 데이터
  const { data: displayConfig } = useQuery({
    queryKey: ["chartDisplayConfigAll"],
    queryFn: fetchAllChartDisplayConfig,
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

  // DAY6 곡들 추출 (이미 차트에 올라온 발매곡)
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
  const [first, setFirst] = useState<SongDraft>(emptyDraft);
  const [second, setSecond] = useState<SongDraft>(emptyDraft);
  const [hasSecondSong, setHasSecondSong] = useState(false);

  const [rollingInterval, setRollingInterval] = useState(5000);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // 저장된 config를 SongDraft로 변환.
  // 예약(pending_song + publish_at)이 걸려 있으면 예약곡/예약일시를 보여주고,
  // 그렇지 않으면 현재 곡(target_song)을 보여준다.
  const configToDraft = (config: ChartDisplayConfig): SongDraft => {
    const hasReservation = !!(config.pending_song && config.publish_at);
    const song = hasReservation ? config.pending_song! : (config.target_song || "");
    if (!song) return emptyDraft;
    return {
      song,
      isCustom: !availableSongs.includes(song),
      publishAt: hasReservation ? kstIsoToLocalInput(config.publish_at) : "",
    };
  };

  // 초기 데이터 설정
  useEffect(() => {
    if (displayConfig && displayConfig.length > 0) {
      const activeSorted = [...displayConfig]
        .filter(c => c.is_active && c.target_song)
        .sort((a, b) => a.priority - b.priority);

      setFirst(activeSorted[0] ? configToDraft(activeSorted[0]) : emptyDraft);

      if (activeSorted.length >= 2) {
        setSecond(configToDraft(activeSorted[1]));
        setHasSecondSong(true);
      } else {
        setSecond(emptyDraft);
        setHasSecondSong(false);
      }
    }
    // availableSongs가 나중에 로드되면 isCustom 판정이 갱신되도록 의존성에 포함
  }, [displayConfig, availableSongs]);

  useEffect(() => {
    if (chartSettings) {
      setRollingInterval(chartSettings.chart_rolling_interval || 5000);
    }
  }, [chartSettings]);

  // 두 번째 곡 추가/제거
  const handleAddSecondSong = () => {
    setHasSecondSong(true);
    setSecond(emptyDraft);
  };
  const handleRemoveSecondSong = () => {
    setHasSecondSong(false);
    setSecond(emptyDraft);
  };

  // draft를 DB 업데이트 payload로 변환.
  //   예약일시 있음 => 현재 곡(target_song)은 그대로 두고 pending_song/publish_at에 예약 저장
  //   예약일시 없음 => 즉시 target_song 교체 + 예약 정리
  const draftToUpdate = (
    draft: SongDraft,
    currentConfig: ChartDisplayConfig | undefined,
    isActive: boolean,
  ): Partial<ChartDisplayConfig> => {
    const publishIso = localInputToKstIso(draft.publishAt);
    if (publishIso) {
      // 예약: 현재 노출 곡은 유지, 예약곡만 세팅
      return {
        target_song: currentConfig?.target_song ?? draft.song,
        pending_song: draft.song,
        publish_at: publishIso,
        is_active: isActive,
      };
    }
    // 즉시 반영: 곡 교체 + 예약 초기화
    return {
      target_song: draft.song,
      pending_song: null,
      publish_at: null,
      is_active: isActive,
    };
  };

  // 저장 함수
  const handleSave = async () => {
    if (!first.song || (hasSecondSong && !second.song)) return;
    setIsSaving(true);

    try {
      if (displayConfig) {
        const sortedAll = [...displayConfig].sort((a, b) => a.priority - b.priority);

        // 첫 번째 곡 업데이트 (활성화)
        if (sortedAll[0]) {
          await updateChartDisplayConfig(
            sortedAll[0].id,
            draftToUpdate(first, sortedAll[0], true),
          );
        }

        // 두 번째 곡 업데이트 (있으면 활성화, 없으면 비활성화)
        if (sortedAll[1]) {
          if (hasSecondSong && second.song) {
            await updateChartDisplayConfig(
              sortedAll[1].id,
              draftToUpdate(second, sortedAll[1], true),
            );
          } else {
            await updateChartDisplayConfig(sortedAll[1].id, { is_active: false });
          }
        }
      }

      // 롤링 시간 업데이트 (2곡일 때만 의미 있지만 항상 저장)
      if (hasSecondSong) {
        await updateChartSetting('chart_rolling_interval', rollingInterval);
      }

      // 캐시 무효화하여 UI 업데이트
      queryClient.invalidateQueries({ queryKey: ["chartDisplayConfig"] });
      queryClient.invalidateQueries({ queryKey: ["chartDisplayConfigAll"] });
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
    if (displayConfig) {
      const activeSorted = [...displayConfig]
        .filter(c => c.is_active && c.target_song)
        .sort((a, b) => a.priority - b.priority);
      setFirst(activeSorted[0] ? configToDraft(activeSorted[0]) : emptyDraft);
      if (activeSorted.length >= 2) {
        setSecond(configToDraft(activeSorted[1]));
        setHasSecondSong(true);
      } else {
        setSecond(emptyDraft);
        setHasSecondSong(false);
      }
    }
    setRollingInterval(chartSettings?.chart_rolling_interval || 5000);
  };

  // 곡 입력 UI (셀렉 + 직접입력 토글 + 예약일시)
  const renderSongEditor = (
    draft: SongDraft,
    setDraft: (d: SongDraft) => void,
    excludeSong: string,
    idPrefix: string,
  ) => {
    // 셀렉 값: 직접 입력 모드면 CUSTOM_OPTION, 아니면 곡명
    const selectValue = draft.isCustom ? CUSTOM_OPTION : draft.song;

    return (
      <div className="space-y-2">
        <Select
          value={selectValue}
          onValueChange={(value) => {
            if (value === CUSTOM_OPTION) {
              setDraft({ ...draft, isCustom: true, song: "" });
            } else {
              setDraft({ ...draft, isCustom: false, song: value });
            }
          }}
        >
          <SelectTrigger className="mt-1">
            <SelectValue placeholder="차트에서 곡을 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {availableSongs
              .filter((song) => song !== excludeSong)
              .map((song) => (
                <SelectItem key={song} value={song}>
                  {song}
                </SelectItem>
              ))}
            <SelectItem value={CUSTOM_OPTION}>➕ 직접 입력 (미발매곡)</SelectItem>
          </SelectContent>
        </Select>

        {/* 직접 입력 모드일 때 곡명 텍스트 입력 */}
        {draft.isCustom && (
          <Input
            id={`${idPrefix}-custom`}
            value={draft.song}
            onChange={(e) => setDraft({ ...draft, song: e.target.value })}
            placeholder="미발매곡 제목 (예: Shut The Door)"
            className="mt-1"
          />
        )}

        {/* 예약 발매 일시 */}
        <div className="flex items-center gap-2 pt-1">
          <CalendarClock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <Label htmlFor={`${idPrefix}-publish`} className="text-xs text-gray-500 shrink-0">
            발매 예약
          </Label>
          <Input
            id={`${idPrefix}-publish`}
            type="datetime-local"
            value={draft.publishAt}
            onChange={(e) => setDraft({ ...draft, publishAt: e.target.value })}
            className="h-8 text-xs"
          />
          {draft.publishAt && (
            <button
              type="button"
              onClick={() => setDraft({ ...draft, publishAt: "" })}
              className="text-xs text-gray-400 hover:text-red-500 shrink-0"
              title="예약 해제 (즉시 반영)"
            >
              해제
            </button>
          )}
        </div>
        <p className="text-[11px] text-gray-400 pl-6">
          {draft.publishAt
            ? "예약 시각(KST) 전까지는 기존 곡이 유지되고, 이후 이 곡으로 자동 전환됩니다."
            : "비워두면 즉시 이 곡으로 반영됩니다."}
        </p>
      </div>
    );
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

            {/* 첫 번째 곡 (필수) */}
            <div>
              <Label htmlFor="first-song" className="text-xs text-gray-600">
                타이틀곡
              </Label>
              {renderSongEditor(first, setFirst, second.song, "first-song")}
            </div>

            {/* 두 번째 곡 (선택) */}
            {hasSecondSong ? (
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="second-song" className="text-xs text-gray-600">
                    추가 곡
                  </Label>
                  <button
                    type="button"
                    onClick={handleRemoveSecondSong}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    제거
                  </button>
                </div>
                {renderSongEditor(second, setSecond, first.song, "second-song")}
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAddSecondSong}
                className="flex items-center gap-1.5 text-sm text-mint-primary hover:text-mint-dark transition-colors"
              >
                <Plus className="w-4 h-4" />
                곡 추가
              </button>
            )}
          </div>

          {/* 롤링 시간 설정 (2곡 이상일 때만) */}
          {hasSecondSong && (
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
          )}

          {/* 미리보기 */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <Label className="text-xs font-semibold text-gray-700">미리보기</Label>
            <div className="mt-2 text-sm space-y-1">
              {hasSecondSong && second.song ? (
                <>
                  <p><strong>{first.song || "곡1"}</strong> ↔ <strong>{second.song}</strong></p>
                  <p className="text-gray-600">{rollingInterval / 1000}초마다 전환</p>
                </>
              ) : (
                <p><strong>{first.song || "곡을 선택하세요"}</strong></p>
              )}
              {first.publishAt && (
                <p className="text-[11px] text-orange-600">
                  ⏰ {first.publishAt.replace("T", " ")} (KST)부터 <strong>{first.song}</strong>(으)로 전환 예약
                </p>
              )}
              {hasSecondSong && second.publishAt && (
                <p className="text-[11px] text-orange-600">
                  ⏰ {second.publishAt.replace("T", " ")} (KST)부터 <strong>{second.song}</strong>(으)로 전환 예약
                </p>
              )}
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
            disabled={isSaving || !first.song || (hasSecondSong && !second.song)}
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
