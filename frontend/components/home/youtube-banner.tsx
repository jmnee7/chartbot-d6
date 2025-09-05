"use client";

interface YouTubeBannerProps {
  videoId?: string;
}

// 날짜별 뮤비 스케줄
function getScheduledVideo(): string {
  const today = new Date();
  const month = today.getMonth() + 1; // 0-based이므로 +1
  const day = today.getDate();

  // 9월 5일: INSIDE OUT
  if (month === 9 && day === 5) {
    return "b_Eh-9Jz_L8"; // INSIDE OUT
  }
  // 9월 6일 이후: 꿈의 버스
  else if (month === 9 && day >= 6) {
    return "y_tOzRLM2o8"; // 꿈의 버스
  }
  // 그 외: INSIDE OUT (기본값)
  else {
    return "b_Eh-9Jz_L8"; // INSIDE OUT
  }
}

export default function YouTubeBanner({ videoId }: YouTubeBannerProps) {
  const scheduledVideoId = videoId || getScheduledVideo();
  return (
    <div className="relative w-full aspect-video overflow-hidden">
      {/* YouTube Embedded Video */}
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${scheduledVideoId}?autoplay=1&mute=1&loop=1&playlist=${scheduledVideoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
        title="DAY6 Music Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
