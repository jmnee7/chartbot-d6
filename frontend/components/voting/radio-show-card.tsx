"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MessageSquare, Phone } from "lucide-react";
import { RadioShow } from "@/lib/constants/radio-shows";

interface RadioShowCardProps {
  show: RadioShow;
}

export function RadioShowCard({ show }: RadioShowCardProps) {
  const handleRequestClick = () => {
    if (show.requestUrl) {
      window.open(show.requestUrl, "_blank");
    }
  };

  const getRequestIcon = () => {
    switch (show.requestType) {
      case "web":
        return <ExternalLink className="w-3 h-3" />;
      case "sms":
        return <MessageSquare className="w-3 h-3" />;
      case "phone":
        return <Phone className="w-3 h-3" />;
      default:
        return <ExternalLink className="w-3 h-3" />;
    }
  };

  const getRequestText = () => {
    switch (show.requestType) {
      case "web":
        return "웹 신청";
      case "sms":
        return show.smsNumber ? `문자 #${show.smsNumber}` : "문자 신청";
      case "phone":
        return show.phoneNumber ? `전화 ${show.phoneNumber}` : "전화 신청";
      default:
        return "신청하기";
    }
  };

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
            <p className="text-sm text-gray-600 mt-1">{show.station}</p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-gray-600">
              <span>{show.schedule}</span>
            </div>

            <div className="flex items-center gap-2">
              {getRequestIcon()}
              <Badge variant="default" className="text-xs">
                {getRequestText()}
              </Badge>
            </div>
          </div>

          <p className="text-xs text-gray-600">{show.description}</p>

          <div className="pt-2 border-t border-gray-100">
            <Button
              size="sm"
              className={`w-full ${show.color} hover:opacity-90 text-white text-xs`}
              onClick={handleRequestClick}
            >
              {getRequestIcon()}
              <span className="ml-1">신청하기</span>
            </Button>

            {show.smsNumber && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-center">
                <p className="text-xs text-gray-600">
                  문자: <span className="font-mono">#{show.smsNumber}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
