"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MUSIC_PLATFORMS } from "@/lib/constants/platforms";
import { PlatformCard } from "@/components/platform/platform-card";
import { usePlatformLinks } from "@/lib/api/platform-links";

export default function QuickAccessCard() {
  const { data: platformLinks } = usePlatformLinks();


  // 항상 모든 플랫폼을 표시하되, PlatformCard에서 DB 데이터 유무에 따라 처리
  const platformsToShow = MUSIC_PLATFORMS;

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 overflow-visible">
          {platformsToShow.map((platform, index) => (
            <motion.div
              key={platform.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                delay: index * 0.05,
                ease: "easeOut",
              }}
            >
              <PlatformCard 
                platform={platform} 
                variant="grid" 
                isHome={true} 
                platformLinks={platformLinks}
              />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
