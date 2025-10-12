"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Save, RotateCcw, ExternalLink } from "lucide-react";
import { Platform } from "@/lib/constants/platforms";

interface StreamingLinkEditModalProps {
  platform: Platform;
  trigger?: React.ReactNode;
}

export function StreamingLinkEditModal({ platform, trigger }: StreamingLinkEditModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // 편집 상태 - tinyurl 링크들의 pathname 부분만 관리
  const [editingLinks, setEditingLinks] = useState({
    android: platform.urls?.android?.map(url => extractTinyUrlPath(url)) || [],
    iphone: platform.urls?.iphone?.map(url => extractTinyUrlPath(url)) || [],
    pc: platform.urls?.pc?.map(url => extractTinyUrlPath(url)) || [],
    webUrl: platform.url || "",
  });

  // tinyurl에서 경로 부분만 추출하는 함수
  function extractTinyUrlPath(url: string): string {
    if (url.includes('tinyurl.com/')) {
      return url.split('tinyurl.com/')[1] || '';
    }
    return url;
  }

  // 전체 URL로 복원하는 함수
  function buildFullUrl(path: string): string {
    if (path.startsWith('http')) {
      return path; // 이미 전체 URL인 경우
    }
    return `https://tinyurl.com/${path}`;
  }

  // 링크 수정 핸들러
  const updateLink = (deviceType: 'android' | 'iphone' | 'pc', index: number, value: string) => {
    setEditingLinks(prev => ({
      ...prev,
      [deviceType]: prev[deviceType].map((link, i) => i === index ? value : link)
    }));
  };

  // 링크 추가/제거
  const addLink = (deviceType: 'android' | 'iphone' | 'pc') => {
    setEditingLinks(prev => ({
      ...prev,
      [deviceType]: [...prev[deviceType], '']
    }));
  };

  const removeLink = (deviceType: 'android' | 'iphone' | 'pc', index: number) => {
    setEditingLinks(prev => ({
      ...prev,
      [deviceType]: prev[deviceType].filter((_, i) => i !== index)
    }));
  };

  // 저장 함수 (나중에 API 연동)
  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // TODO: API 호출로 DB에 저장
      console.log('Saving links for platform:', platform.id, editingLinks);
      
      // 임시로 로컬스토리지에 저장
      localStorage.setItem(`platform_links_${platform.id}`, JSON.stringify(editingLinks));
      
      setIsOpen(false);
      alert('링크가 저장되었습니다.');
      
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  // 초기화 함수
  const handleReset = () => {
    setEditingLinks({
      android: platform.urls?.android?.map(url => extractTinyUrlPath(url)) || [],
      iphone: platform.urls?.iphone?.map(url => extractTinyUrlPath(url)) || [],
      pc: platform.urls?.pc?.map(url => extractTinyUrlPath(url)) || [],
      webUrl: platform.url || "",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" />
            링크 편집
          </Button>
        )}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {platform.name} 링크 편집
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Tabs defaultValue="mobile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mobile">모바일</TabsTrigger>
              <TabsTrigger value="pc">PC</TabsTrigger>
              <TabsTrigger value="web">웹 URL</TabsTrigger>
            </TabsList>

            <TabsContent value="mobile" className="space-y-4">
              {/* Android 링크 */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  Android 링크
                  <Badge variant="outline">{editingLinks.android.length}개</Badge>
                </Label>
                {editingLinks.android.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <Label className="text-xs text-gray-600">
                        링크 {index + 1}
                      </Label>
                      <div className="flex">
                        <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l-md text-sm text-gray-600">
                          https://tinyurl.com/
                        </span>
                        <Input
                          value={link}
                          onChange={(e) => updateLink('android', index, e.target.value)}
                          placeholder="4r7fwzc2"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(buildFullUrl(link), '_blank')}
                        disabled={!link}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeLink('android', index)}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addLink('android')}
                  className="w-full"
                >
                  + Android 링크 추가
                </Button>
              </div>

              {/* iPhone 링크 */}
              <div className="space-y-3">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  iPhone 링크
                  <Badge variant="outline">{editingLinks.iphone.length}개</Badge>
                </Label>
                {editingLinks.iphone.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <Label className="text-xs text-gray-600">
                        링크 {index + 1}
                      </Label>
                      <div className="flex">
                        <span className="px-3 py-2 bg-gray-100 border border-r-0 rounded-l-md text-sm text-gray-600">
                          https://tinyurl.com/
                        </span>
                        <Input
                          value={link}
                          onChange={(e) => updateLink('iphone', index, e.target.value)}
                          placeholder="4r7fwzc2"
                          className="rounded-l-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(buildFullUrl(link), '_blank')}
                        disabled={!link}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeLink('iphone', index)}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addLink('iphone')}
                  className="w-full"
                >
                  + iPhone 링크 추가
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="pc" className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  PC 링크
                  <Badge variant="outline">{editingLinks.pc.length}개</Badge>
                </Label>
                {editingLinks.pc.map((link, index) => (
                  <div key={index} className="flex gap-2">
                    <div className="flex-1">
                      <Label className="text-xs text-gray-600">
                        링크 {index + 1}
                      </Label>
                      <Input
                        value={link}
                        onChange={(e) => updateLink('pc', index, e.target.value)}
                        placeholder="전체 URL 또는 tinyurl 경로"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(link.startsWith('http') ? link : buildFullUrl(link), '_blank')}
                        disabled={!link}
                      >
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => removeLink('pc', index)}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => addLink('pc')}
                  className="w-full"
                >
                  + PC 링크 추가
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="web" className="space-y-4">
              <div className="space-y-3">
                <Label className="text-sm font-semibold">기본 웹 URL</Label>
                <Input
                  value={editingLinks.webUrl}
                  onChange={(e) => setEditingLinks(prev => ({ ...prev, webUrl: e.target.value }))}
                  placeholder="https://www.melon.com/album/detail.htm?albumId=11796328"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => window.open(editingLinks.webUrl, '_blank')}
                  disabled={!editingLinks.webUrl}
                  className="w-fit"
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  테스트
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          {/* 미리보기 */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <Label className="text-sm font-semibold text-gray-700">현재 설정 요약</Label>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>• Android: {editingLinks.android.length}개 링크</p>
              <p>• iPhone: {editingLinks.iphone.length}개 링크</p>
              <p>• PC: {editingLinks.pc.length}개 링크</p>
              <p>• 웹 URL: {editingLinks.webUrl ? '설정됨' : '미설정'}</p>
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
            disabled={isSaving}
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