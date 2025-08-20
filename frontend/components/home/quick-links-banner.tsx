"use client";

import { Radio, MessageSquare, ExternalLink, X } from "lucide-react";
import { useState } from "react";

export function QuickLinksBanner() {
  const [showRadioModal, setShowRadioModal] = useState(false);
  const [showMusicBankModal, setShowMusicBankModal] = useState(false);

  return (
    <>
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
            <h3 className="font-bold">라디오 신청</h3>
            <p className="text-sm opacity-90">DAY6 라디오 신청하기</p>
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
            <h3 className="font-bold">음중 문자 투표</h3>
            <p className="text-sm opacity-90">음악중심 투표 참여</p>
          </div>
          <ExternalLink className="h-4 w-4 opacity-80" />
        </button>
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
            <p className="text-sm text-gray-600 mb-4">
              DAY6 &ldquo;Maybe Tomorrow&rdquo; 신청을 위해 모바일에서
              접속해주세요.
            </p>
            <div className="space-y-3">
              <a
                href="sms:%238910?body=DAY6"
                target="_blank"
                rel="noreferrer"
                className="block w-full p-3 bg-red-500 hover:bg-red-600 text-white text-center rounded-lg font-medium transition-colors"
              >
                KBS 라디오 신청
              </a>
              <a
                href="sms:%238000?body=DAY6"
                target="_blank"
                rel="noreferrer"
                className="block w-full p-3 bg-blue-500 hover:bg-blue-600 text-white text-center rounded-lg font-medium transition-colors"
              >
                MBC 라디오 신청
              </a>
              <a
                href="sms:%231077?body=DAY6"
                target="_blank"
                rel="noreferrer"
                className="block w-full p-3 bg-green-500 hover:bg-green-600 text-white text-center rounded-lg font-medium transition-colors"
              >
                SBS 라디오 신청
              </a>
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
              DAY6 투표를 위해 모바일에서 접속해주세요.
            </p>
            <div className="space-y-3">
              <a
                href="sms:%230505?body=DAY6"
                target="_blank"
                rel="noreferrer"
                className="block w-full p-3 bg-blue-500 hover:bg-blue-600 text-white text-center rounded-lg font-medium transition-colors"
              >
                DAY6 투표하기 (#0505)
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
