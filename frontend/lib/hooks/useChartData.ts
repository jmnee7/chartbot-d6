"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api/client";
import { PlatformType } from "@/lib/types";

// Chart data updates every hour, so optimize cache accordingly
const CHART_UPDATE_INTERVAL = 1000 * 60 * 60; // 1 hour

export function useSummaryData() {
  return useQuery({
    queryKey: ["summary"],
    queryFn: () => apiClient.getSummary(),
    staleTime: 1000 * 60 * 30, // 30 minutes (half of update interval)
    refetchInterval: CHART_UPDATE_INTERVAL, // Only refetch every hour
    retry: 3,
    refetchOnWindowFocus: false, // Don't refetch on focus
  });
}

export function useChartData(platform?: PlatformType) {
  return useQuery({
    queryKey: ["chart", platform],
    queryFn: () => apiClient.getChartData(),
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchInterval: CHART_UPDATE_INTERVAL, // Only refetch every hour
    retry: 2,
    refetchOnWindowFocus: false, // Don't refetch on focus
  });
}

export function useHistoricalData(platform: PlatformType, days = 7) {
  return useQuery({
    queryKey: ["historical", platform, days],
    queryFn: () => apiClient.getHistoricalData(platform, days),
    staleTime: 1000 * 60 * 60 * 2, // 2 hours (historical data changes less frequently)
    retry: 2,
    enabled: !!platform,
    refetchOnWindowFocus: false,
  });
}

export function useMVData() {
  return useQuery({
    queryKey: ["mv-data"],
    queryFn: () => apiClient.getMVData(),
    staleTime: 1000 * 60 * 30, // 30 minutes
    refetchInterval: CHART_UPDATE_INTERVAL, // Only refetch every hour
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

export function useVoteData() {
  return useQuery({
    queryKey: ["vote-data"],
    queryFn: () => apiClient.getVoteData(),
    staleTime: 1000 * 60 * 60 * 6, // 6 hours (vote data rarely changes)
    refetchInterval: false, // No automatic refetch for vote data
    retry: 1,
    refetchOnWindowFocus: false,
  });
}
