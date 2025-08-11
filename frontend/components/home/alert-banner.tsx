"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchVotes } from "@/lib/api";

export default function AlertBanner() {
  const { data: votes } = useQuery({
    queryKey: ["votes"],
    queryFn: fetchVotes,
  });

  const urgentVotes = votes?.filter((v) => {
    const daysLeft = Math.ceil(
      (v.deadline.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysLeft <= 1;
  });

  if (!urgentVotes?.length) return null;

  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>긴급 알림</AlertTitle>
      <AlertDescription>
        <div className="space-y-2">
          {urgentVotes.map((vote) => (
            <div key={vote.id} className="flex items-center justify-between">
              <span className="text-sm">
                {vote.title} 마감 임박!
              </span>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-red-200 text-red-700 hover:bg-red-50"
              >
                <a
                  href={vote.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  지금 투표하기 →
                </a>
              </Button>
            </div>
          ))}
        </div>
      </AlertDescription>
    </Alert>
  );
}