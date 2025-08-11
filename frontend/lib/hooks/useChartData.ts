"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { PlatformType } from "@/lib/types";

export function useSummaryData() {
  return useQuery({
    queryKey: ["summary"],
    queryFn: () => apiClient.getSummary(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 10, // 10 minutes
    retry: 3,
  });
}

export function useChartData(platform: PlatformType) {
  return useQuery({
    queryKey: ["chart", platform],
    queryFn: () => apiClient.getChartData(platform),
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 10, // 10 minutes
    retry: 2,
    enabled: !!platform,
  });
}

export function useHistoricalData(platform: PlatformType, days = 7) {
  return useQuery({
    queryKey: ["historical", platform, days],
    queryFn: () => apiClient.getHistoricalData(platform, days),
    staleTime: 1000 * 60 * 30, // 30 minutes
    retry: 2,
    enabled: !!platform,
  });
}

export function useMVData() {
  return useQuery({
    queryKey: ["mv-data"],
    queryFn: () => apiClient.getMVData(),
    staleTime: 1000 * 60 * 10, // 10 minutes
    refetchInterval: 1000 * 60 * 20, // 20 minutes
    retry: 2,
  });
}

export function useVoteData() {
  return useQuery({
    queryKey: ["vote-data"],
    queryFn: () => apiClient.getVoteData(),
    staleTime: 1000 * 60 * 60, // 1 hour
    refetchInterval: 1000 * 60 * 60 * 2, // 2 hours
    retry: 1,
  });
}
