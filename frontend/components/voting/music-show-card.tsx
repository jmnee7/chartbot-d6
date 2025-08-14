"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

            {show.hasVoting && show.votingPeriod && (
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-3 h-3" />
                <span>투표: {show.votingPeriod}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Vote className="w-3 h-3 text-gray-600" />
              <Badge
                variant={show.hasVoting ? "default" : "secondary"}
                className="text-xs"
              >
                {show.votingApp}
              </Badge>
            </div>
          </div>

          {show.hasVoting && (
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <div className="grid gap-1">
                {show.appDownload.web && (
                  <Button
                    size="sm"
                    className={`w-full ${show.color} hover:opacity-90 text-white text-xs`}
                    onClick={() => window.open(show.appDownload.web, "_blank")}
                  >
                    <Vote className="w-3 h-3 mr-1" />웹 투표
                  </Button>
                )}

                <div className="grid grid-cols-2 gap-1">
                  {show.appDownload.android && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() =>
                        window.open(show.appDownload.android, "_blank")
                      }
                    >
                      Android
                    </Button>
                  )}
                  {show.appDownload.ios && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() =>
                        window.open(show.appDownload.ios, "_blank")
                      }
                    >
                      iOS
                    </Button>
                  )}
                </div>
              </div>

              {show.notes && (
                <div className="text-center">
                  <p className="text-xs text-gray-500">{show.notes}</p>
                </div>
              )}
            </div>
          )}

          {!show.hasVoting && (
            <div className="pt-2 border-t border-gray-100">
              <div className="text-center space-y-2">
                <p className="text-xs text-gray-500">{show.description}</p>
                {show.notes && (
                  <p className="text-xs text-mint-600">💡 {show.notes}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
