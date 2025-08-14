// API client for fetching data from GitHub Pages
import { ChartData, MVData, ApiResponse } from "@/lib/types/index";
import { PlatformType } from "@/lib/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_DATA_BASE_URL ||
  "https://raw.githubusercontent.com/YOUR_USERNAME//main/public-data";

class ApiClient {
  private async fetchWithRetry<T>(url: string, retries = 3): Promise<T> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(url, {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        if (i === retries - 1) throw error;
        // Wait before retry with exponential backoff
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, i) * 1000)
        );
      }
    }
    throw new Error("Max retries exceeded");
  }

  async getSummary(): Promise<ApiResponse<unknown>> {
    try {
      const data = await this.fetchWithRetry<unknown>(
        `${BASE_URL}/summary.json`
      );
      return {
        data,
        success: true,
        lastUpdated:
          (data as { updatedAtKST?: string })?.updatedAtKST ||
          new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: {} as unknown,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  async getChartData(platform: PlatformType): Promise<ApiResponse<ChartData>> {
    try {
      const data = await this.fetchWithRetry<ChartData>(
        `${BASE_URL}/charts/${platform}/latest.json`
      );
      return {
        data,
        success: true,
        lastUpdated: data.collectedAtKST,
      };
    } catch (error) {
      return {
        data: {} as ChartData,
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  async getHistoricalData(
    platform: PlatformType,
    days = 7
  ): Promise<ApiResponse<ChartData[]>> {
    try {
      const data = await this.fetchWithRetry<ChartData[]>(
        `${BASE_URL}/charts/${platform}/history-${days}d.json`
      );
      return {
        data,
        success: true,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  async getMVData(): Promise<ApiResponse<MVData[]>> {
    try {
      const data = await this.fetchWithRetry<MVData[]>(
        `${BASE_URL}/youtube/latest.json`
      );
      return {
        data,
        success: true,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  async getVoteData(): Promise<ApiResponse<unknown[]>> {
    try {
      // This would fetch from a votes.json file or similar
      const data = await this.fetchWithRetry<unknown[]>(
        `${BASE_URL}/votes.json`
      );
      return {
        data,
        success: true,
        lastUpdated: new Date().toISOString(),
      };
    } catch (error) {
      // Return mock data for now since vote data structure may vary
      return {
        data: [],
        success: false,
        error:
          error instanceof Error ? error.message : "Vote data not available",
        lastUpdated: new Date().toISOString(),
      };
    }
  }
}

export const apiClient = new ApiClient();
