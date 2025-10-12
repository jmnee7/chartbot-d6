"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  fetchComebackSchedules,
  addComebackSchedule,
  updateComebackSchedule,
  deleteComebackSchedule,
  formatDateDisplay,
  type ComebackSchedule
} from "@/lib/api/comeback";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Save, Trash2, Edit } from "lucide-react";

interface ComebackScheduleEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate?: () => void; // eslint-disable-line @typescript-eslint/no-unused-vars
}

export function ComebackScheduleEditModal({ isOpen, onClose, onUpdate }: ComebackScheduleEditModalProps) {
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{
    event: string;
    datetime: string;
    description: string;
    status: 'upcoming' | 'ongoing' | 'completed';
    display_order: number;
  }>({
    event: '',
    datetime: '',
    description: '',
    status: 'upcoming',
    display_order: 1,
  });

  // 컴백 스케줄 목록 가져오기
  const { data: schedules, isLoading } = useQuery({
    queryKey: ["comebackSchedules"],
    queryFn: fetchComebackSchedules,
    staleTime: 60000,
  });

  // 폼 리셋
  const resetForm = () => {
    setFormData({
      event: '',
      datetime: '',
      description: '',
      status: 'upcoming',
      display_order: (schedules?.length || 0) + 1,
    });
    setEditingId(null);
  };

  // 편집 시작
  const startEdit = (schedule: ComebackSchedule) => {
    setFormData({
      event: schedule.event,
      datetime: schedule.datetime,
      description: schedule.description || '',
      status: schedule.status,
      display_order: schedule.display_order,
    });
    setEditingId(schedule.id);
  };

  // 저장
  const handleSave = async () => {
    if (!formData.event || !formData.datetime) {
      alert('이벤트명과 날짜를 입력해주세요.');
      return;
    }

    setIsSaving(true);
    
    try {
      let success = false;
      
      if (editingId) {
        // 수정
        success = await updateComebackSchedule(editingId, {
          event: formData.event,
          datetime: formData.datetime,
          date: formatDateDisplay(formData.datetime),
          description: formData.description,
          status: formData.status,
          display_order: formData.display_order,
        });
      } else {
        // 추가
        success = await addComebackSchedule({
          event: formData.event,
          datetime: formData.datetime,
          date: formatDateDisplay(formData.datetime),
          description: formData.description,
          status: formData.status,
          display_order: formData.display_order,
          is_active: true,
        });
      }

      if (success) {
        queryClient.invalidateQueries({ queryKey: ["comebackSchedules"] });
        resetForm();
        alert(editingId ? '일정이 수정되었습니다.' : '일정이 추가되었습니다.');
      } else {
        alert('저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
    
    setIsSaving(false);
  };

  // 삭제
  const handleDelete = async (id: number, event: string) => {
    if (!confirm(`"${event}" 일정을 삭제하시겠습니까?`)) return;
    
    setIsSaving(true);
    
    const success = await deleteComebackSchedule(id);
    
    if (success) {
      queryClient.invalidateQueries({ queryKey: ["comebackSchedules"] });
      alert('일정이 삭제되었습니다.');
    } else {
      alert('삭제에 실패했습니다.');
    }
    
    setIsSaving(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl bg-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            컴백 스케줄 관리
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 좌측: 일정 추가/편집 폼 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              {editingId ? '일정 편집' : '새 일정 추가'}
            </h3>
            
            <div>
              <Label className="text-sm font-semibold">이벤트명</Label>
              <Input
                value={formData.event}
                onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                placeholder="데이식스 is 10 EP2"
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold">날짜</Label>
              <Input
                type="date"
                value={formData.datetime}
                onChange={(e) => setFormData({ ...formData, datetime: e.target.value })}
                className="mt-1"
              />
            </div>

            <div>
              <Label className="text-sm font-semibold">설명</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="이벤트에 대한 상세 설명"
                className="mt-1"
                rows={3}
              />
            </div>

            <div>
              <Label className="text-sm font-semibold">상태</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value: 'upcoming' | 'ongoing' | 'completed') => 
                  setFormData({ ...formData, status: value })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">예정</SelectItem>
                  <SelectItem value="ongoing">진행중</SelectItem>
                  <SelectItem value="completed">완료</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="text-sm font-semibold">표시 순서</Label>
              <Input
                type="number"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 1 })}
                min="1"
                className="mt-1"
              />
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={handleSave}
                disabled={isSaving || !formData.event || !formData.datetime}
                className="flex-1 bg-mint-primary hover:bg-mint-dark text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? '저장 중...' : (editingId ? '수정' : '추가')}
              </Button>
              
              {editingId && (
                <Button 
                  onClick={resetForm}
                  variant="outline"
                  className="px-4"
                >
                  취소
                </Button>
              )}
            </div>
          </div>

          {/* 우측: 기존 일정 목록 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">기존 일정 목록</h3>
            
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="text-sm text-gray-500">목록을 불러오는 중...</div>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {schedules && schedules.length > 0 ? (
                  schedules
                    .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
                    .map((schedule) => (
                      <div 
                        key={schedule.id} 
                        className={`p-3 border rounded-lg ${
                          editingId === schedule.id ? 'border-mint-primary bg-mint-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-sm">{schedule.event}</h4>
                            <p className="text-xs text-gray-500 mt-1">{schedule.date}</p>
                            {schedule.description && (
                              <p className="text-xs text-gray-600 mt-1">{schedule.description}</p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <span className={`text-xs px-2 py-1 rounded ${
                                schedule.status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                                schedule.status === 'ongoing' ? 'bg-green-100 text-green-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {schedule.status === 'upcoming' ? '예정' :
                                 schedule.status === 'ongoing' ? '진행중' : '완료'}
                              </span>
                              <span className="text-xs text-gray-400">순서: {schedule.display_order}</span>
                            </div>
                          </div>
                          <div className="flex gap-1 ml-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEdit(schedule)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDelete(schedule.id, schedule.event)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">등록된 일정이 없습니다.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}