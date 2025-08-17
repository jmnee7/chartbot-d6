"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { MUSIC_PLATFORMS } from "@/lib/constants/platforms";
import { PlatformCard } from "@/components/platform/platform-card";

export default function QuickAccessCard() {
  // 플로를 제외한 주요 4개 플랫폼만 표시
  const mainPlatforms = MUSIC_PLATFORMS.filter((platform) =>
    ["melon", "genie", "bugs", "vibe"].includes(platform.id)
  );

  return (
    <Card>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3">
          {mainPlatforms.map((platform, index) => (
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
              <PlatformCard platform={platform} variant="grid" />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
