"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, Vote } from "lucide-react";
import { MusicShow } from "@/lib/constants/music-shows";

interface MusicShowCardProps {
  show: MusicShow;
}

export function MusicShowCard({ show }: MusicShowCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div
            className={`w-full h-16 ${show.color} rounded-lg flex items-center justify-center`}
          >
            <span className="text-2xl">{show.icon}</span>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 text-base">{show.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{show.channel}</p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-3 h-3" />
              <span>{show.schedule}</span>
            </div>

            {show.votingPeriod && show.votingPeriod !== "사전투표 없음" && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-3 h-3" />
                <span>투표: {show.votingPeriod}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Vote className="w-3 h-3 text-gray-600" />
              <Badge
                variant={
                  show.votingMethod === "사전투표 없음"
                    ? "secondary"
                    : "default"
                }
                className="text-xs"
              >
                {show.votingMethod}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
