import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function QuickAccessCard() {
  const streamingPlatforms = [
    {
      name: "멜론",
      url: "https://www.melon.com",
      logo: "/ico_melon.png",
    },
    {
      name: "지니",
      url: "https://www.genie.co.kr",
      logo: "/Geenie.png",
    },
    {
      name: "벅스",
      url: "https://music.bugs.co.kr",
      logo: "/bucks.png",
    },
    {
      name: "바이브",
      url: "https://vibe.naver.com",
      logo: "/vibe.jpeg",
    },
    {
      name: "플로",
      url: "https://www.music-flo.com",
      logo: "/fillo.png",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/c/DAY6Official",
      logo: "/youtube.png",
    },
  ];

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-3">
          {streamingPlatforms.map((platform) => (
            <Button
              key={platform.name}
              asChild
              variant="ghost"
              className="flex flex-col items-center p-3 h-auto border border-gray-100 hover:border-gray-200"
            >
              <a href={platform.url} target="_blank" rel="noopener noreferrer">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center mb-2 bg-white overflow-hidden">
                  <Image
                    src={platform.logo}
                    alt={platform.name}
                    width={28}
                    height={28}
                    className="rounded object-cover"
                  />
                </div>
                <span className="text-xs lg:text-sm font-medium text-gray-700 text-center">
                  {platform.name}
                </span>
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
