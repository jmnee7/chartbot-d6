"use client";

import { Radio, MessageSquare, ExternalLink, X, Edit } from "lucide-react";
import { useState, useEffect } from "react";
import { useAdminMode } from "@/lib/contexts/admin-mode-context";
import { QuickLinksEditModal } from "@/components/admin/quick-links-edit-modal";
import { fetchRadioContent, fetchMusicVoteContent, type QuickLinksContent } from "@/lib/api/quick-links";

export function QuickLinksBanner() {
  const { isAdminMode } = useAdminMode();
  const [showRadioModal, setShowRadioModal] = useState(false);
  const [showMusicBankModal, setShowMusicBankModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<string>("INSIDE OUT");
  const [radioContent, setRadioContent] = useState<QuickLinksContent | null>(null);
  const [musicVoteContent, setMusicVoteContent] = useState<QuickLinksContent | null>(null);

  useEffect(() => {
    const loadContent = async () => {
      const [radio, musicVote] = await Promise.all([
        fetchRadioContent(),
        fetchMusicVoteContent()
      ]);
      
      console.log('Radio content from DB:', radio);
      console.log('Music vote content from DB:', musicVote);
      
      setRadioContent(radio);
      setMusicVoteContent(musicVote);
      
      // Set first song as default selection
      if (radio?.songs && radio.songs.length > 0) {
        setSelectedSong(radio.songs[0]);
      }
    };
    
    loadContent();
  }, []);

  const handleContentUpdate = () => {
    // Reload content after edit
    const loadContent = async () => {
      const [radio, musicVote] = await Promise.all([
        fetchRadioContent(),
        fetchMusicVoteContent()
      ]);
      
      console.log('Updated radio content:', radio);
      console.log('Updated music vote content:', musicVote);
      
      setRadioContent(radio);
      setMusicVoteContent(musicVote);
      
      // Update selected song if songs changed
      if (radio?.songs && radio.songs.length > 0) {
        setSelectedSong(radio.songs[0]);
      }
    };
    loadContent();
  };

  return (
    <>
      <div className="relative">
        {isAdminMode && (
          <button
            onClick={() => setShowEditModal(true)}
            className="absolute -top-2 -right-2 z-10 bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full shadow-lg transition-colors"
            title="빠른 링크 편집"
          >
            <Edit className="h-4 w-4" />
          </button>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 라디오 신청 */}
          <button
            onClick={() => setShowRadioModal(true)}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 transition-colors rounded-lg shadow-md text-white w-full text-left"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Radio className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{radioContent?.title || "라디오 신청"}</h3>
              <p className="text-sm opacity-90">{radioContent?.description || "DAY6 라디오 신청하기"}</p>
            </div>
            <ExternalLink className="h-4 w-4 opacity-80" />
          </button>

          {/* 음중 문자 투표 */}
          <button
            onClick={() => setShowMusicBankModal(true)}
            className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-colors rounded-lg shadow-md text-white w-full text-left"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold">{musicVoteContent?.title || "음중 문자 투표"}</h3>
              <p className="text-sm opacity-90">{musicVoteContent?.description || "음악중심 투표 참여"}</p>
            </div>
            <ExternalLink className="h-4 w-4 opacity-80" />
          </button>
        </div>
      </div>

      {/* 라디오 신청 모달 */}
      {showRadioModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">라디오 신청</h2>
              <button
                onClick={() => setShowRadioModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 타이틀곡 선택 버튼 */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-3">
                신청할 타이틀곡을 선택해주세요:
              </p>
              <div className="flex gap-2 flex-wrap">
                {(radioContent?.songs || ["INSIDE OUT", "꿈의 버스"]).map((song) => (
                  <button
                    key={song}
                    onClick={() => setSelectedSong(song)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedSong === song
                        ? "bg-mint-primary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {song}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              {(radioContent?.radio_stations || [
                { name: 'KBS', sms_number: '8910', color: 'bg-red-500', message_template: 'DAY6(데이식스)의 ${selectedSong} 신청합니다.' },
                { name: 'MBC', sms_number: '8000', color: 'bg-blue-500', message_template: 'DAY6(데이식스)의 ${selectedSong} 신청합니다.' },
                { name: 'SBS', sms_number: '1077', color: 'bg-green-500', message_template: 'DAY6(데이식스)의 ${selectedSong} 신청합니다.' }
              ]).map((station) => {
                const message = station.message_template.replace('${selectedSong}', selectedSong);
                const hoverColor = station.color.replace('bg-', 'hover:bg-').replace('-500', '-600');
                
                return (
                  <a
                    key={station.name}
                    href={`sms:%23${station.sms_number}?body=${message}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`block w-full p-3 ${station.color} ${hoverColor} text-white text-center rounded-lg font-medium transition-colors`}
                  >
                    {station.name} 라디오 신청
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 음중 문자 투표 모달 */}
      {showMusicBankModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">음중 문자 투표</h2>
              <button
                onClick={() => setShowMusicBankModal(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              {musicVoteContent?.vote_sms?.description || "DAY6 투표를 위해 모바일에서 접속해주세요."}
            </p>
            <div className="space-y-3">
              <a
                href={`sms:%23${musicVoteContent?.vote_sms?.sms_number || "0505"}?body=${musicVoteContent?.vote_sms?.message || "DAY6"}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full p-3 bg-blue-500 hover:bg-blue-600 text-white text-center rounded-lg font-medium transition-colors"
              >
                {musicVoteContent?.vote_sms?.button_text || "DAY6 투표하기 (#0505)"}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 관리자 편집 모달 */}
      {showEditModal && (
        <QuickLinksEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleContentUpdate}
        />
      )}
    </>
  );
}
