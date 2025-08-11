"use client";

import { Button } from "@/components/ui/button";
import { PlatformType } from "@/lib/types";

interface PlatformFiltersProps {
  selectedPlatforms: PlatformType[];
  onPlatformChange: (platforms: PlatformType[]) => void;
}

const PLATFORMS = [
  { id: "melon" as const, name: "멜론", color: "bg-green-500" },
  { id: "genie" as const, name: "지니", color: "bg-blue-500" },
  { id: "bugs" as const, name: "벅스", color: "bg-orange-500" },
  { id: "vibe" as const, name: "바이브", color: "bg-purple-500" },
  { id: "flo" as const, name: "플로", color: "bg-pink-500" },
];

export function PlatformFilters({
  selectedPlatforms,
  onPlatformChange,
}: PlatformFiltersProps) {
  const togglePlatform = (platform: PlatformType) => {
    if (selectedPlatforms.includes(platform)) {
      onPlatformChange(selectedPlatforms.filter((p) => p !== platform));
    } else {
      onPlatformChange([...selectedPlatforms, platform]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      {PLATFORMS.map((platform) => (
        <Button
          key={platform.id}
          variant={
            selectedPlatforms.includes(platform.id) ? "default" : "outline"
          }
          size="sm"
          onClick={() => togglePlatform(platform.id)}
          className={
            selectedPlatforms.includes(platform.id)
              ? `${platform.color} text-white hover:opacity-90`
              : ""
          }
        >
          {platform.name}
        </Button>
      ))}
    </div>
  );
}
