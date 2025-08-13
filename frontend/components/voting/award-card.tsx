"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy } from "lucide-react";
import { Award } from "@/lib/constants/awards";

interface AwardCardProps {
  award: Award;
}

export function AwardCard({ award }: AwardCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div
            className={`w-full h-16 ${award.color} rounded-lg flex items-center justify-center`}
          >
            <span className="text-2xl">{award.icon}</span>
          </div>

          <div>
            <h3 className="font-bold text-gray-900 text-base">{award.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{award.organizer}</p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-3 h-3" />
              <span>{award.date}</span>
            </div>

            <div className="flex items-center gap-2">
              <Trophy className="w-3 h-3 text-gray-600" />
              <Badge variant={award.isActive ? "default" : "secondary"}>
                {award.isActive ? "투표 진행중" : "투표 대기"}
              </Badge>
            </div>

            <p className="text-gray-500 mt-2">{award.description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
