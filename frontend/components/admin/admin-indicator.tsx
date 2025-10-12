"use client";

import { useAdminMode } from "@/lib/contexts/admin-mode-context";
import { Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminIndicator() {
  const { isAdminMode, disableAdminMode } = useAdminMode();

  if (!isAdminMode) return null;

  return (
    <div className="fixed top-16 right-4 z-30 bg-mint-primary text-white px-3 py-2 rounded-lg shadow-lg flex items-center gap-2 text-sm">
      <Shield className="w-4 h-4" />
      <span className="font-medium">관리자 모드</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={disableAdminMode}
        className="h-6 w-6 p-0 hover:bg-white/20 text-white"
      >
        <X className="w-3 h-3" />
      </Button>
    </div>
  );
}