"use client";

interface YouTubeBannerProps {
  videoId?: string;
}

export default function YouTubeBanner({
  videoId = "0zdkvGDDnQg", // DAY6 - The DECADE Trailer Film
}: YouTubeBannerProps) {
  return (
    <div className="relative w-full aspect-video overflow-hidden">
      {/* YouTube Embedded Video */}
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1`}
        title="DAY6 Music Video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />

      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}
