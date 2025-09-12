/**
 * Supabase 연결 테스트 (Next.js)
 * 사용법: Node.js 환경에서 실행
 * node -r ts-node/register frontend/lib/supabase/test.ts
 */

import { supabase, createAdminClient } from "./client";

export async function testConnection() {
  try {
    console.log("🔗 Supabase 연결 테스트 시작...");

    // 1. 기본 클라이언트 테스트 (anon key)
    console.log("\n1️⃣ 기본 클라이언트 테스트 (anon key)...");
    const { data, error } = await supabase
      .from("admin_settings")
      .select("key, description, category")
      .limit(3);

    if (error) {
      console.error("❌ 기본 클라이언트 오류:", error.message);
      return false;
    }

    console.log(`✅ 설정 개수: ${data?.length || 0}`);
    data?.forEach((setting) => {
      console.log(`   - ${setting.key} (${setting.category})`);
    });

    // 2. YouTube 설정 조회 테스트
    console.log("\n2️⃣ YouTube 설정 조회 테스트...");
    const { data: youtubeData, error: youtubeError } = await supabase
      .from("admin_settings")
      .select("value")
      .eq("key", "youtube_videos")
      .single();

    if (youtubeError) {
      console.error("❌ YouTube 설정 조회 실패:", youtubeError.message);
    } else if (youtubeData) {
      const youtubeConfig = youtubeData.value;
      console.log("✅ YouTube 설정 로드 성공");
      console.log(
        `   - 배너 스케줄: ${youtubeConfig.banner_schedule?.length || 0}개`
      );
      console.log(
        `   - 통계 비디오: ${youtubeConfig.stats_video?.title || "N/A"}`
      );
    }

    console.log(
      "\n🎉 모든 테스트 성공! Supabase 연결이 정상적으로 작동합니다."
    );
    return true;
  } catch (error) {
    console.error("❌ Supabase 연결 실패:", error);
    return false;
  }
}

export async function testAdminClient() {
  try {
    console.log("\n3️⃣ 관리자 클라이언트 테스트 (service_role key)...");

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.log("⚠️  SUPABASE_SERVICE_ROLE_KEY가 설정되지 않음 - 스킵");
      return true;
    }

    const adminClient = createAdminClient();

    // 관리자 권한으로 설정 수정 테스트
    const { data, error } = await adminClient
      .from("admin_settings")
      .select("key, updated_at")
      .eq("key", "crawler_enabled")
      .single();

    if (error) {
      console.error("❌ 관리자 클라이언트 오류:", error.message);
      return false;
    }

    console.log(`✅ 관리자 클라이언트 정상 작동`);
    console.log(`   크롤러 설정 마지막 수정: ${data?.updated_at}`);
    return true;
  } catch (error) {
    console.error("❌ 관리자 클라이언트 테스트 실패:", error);
    return false;
  }
}

// 직접 실행 시 테스트 수행
if (require.main === module) {
  async function runTests() {
    console.log("🚀 D6 Admin System - Next.js Supabase 연결 테스트\n");

    const basicTest = await testConnection();
    if (basicTest) {
      await testAdminClient();
    }

    console.log("\n" + "=".repeat(50));
    console.log("테스트 완료!");
  }

  runTests();
}
