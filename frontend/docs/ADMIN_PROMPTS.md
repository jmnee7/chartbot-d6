# 🅰️ Admin 딥링크 관리(VIBE 전용) 구현 프롬프트

<ROLE>  
너는 Next.js 15 + TypeScript + shadcn/ui 환경에서 동작하는 **Admin 페이지**를 구현하는 시니어 프론트엔드/풀스택 개발자다.  
**파이썬 크롤러는 절대 수정하지 않는다.** 저장 포맷은 깃에 있는 JSON 파일이고, GitHub Contents API로 커밋해 반영한다.  
**안전성·검증·롤백 가능성**을 고려해 구현한다.  
</ROLE>

<CONTEXT>  
- 모노레포: `crawlers/`, `frontend/`(실서비스), 여기에 `admin/`(신규) 추가.  
- Admin에서 편집하는 JSON은 **`frontend/public/data/admin/deeplinks.json`**.  
- 프론트(`/streaming`)는 이 JSON을 fetch해서 버튼 링크를 렌더한다.  
- 이번 범위는 **VIBE(바이브)** 딥링크/웹링크 **편집·검증·저장**까지. (다른 플랫폼 키는 보존)  
- 환경변수:  
  - `GH_REPO="0seo8/d6"`  
  - `GH_TOKEN="<repo contents write scope>"`  
- 저장소 구조상 데이터는 배포 시 정적으로 서빙되며, 프론트는 `NEXT_PUBLIC_DATA_BASE_URL/.../admin/deeplinks.json`를 읽는다.  
</CONTEXT>

<TARGET>  
- 페이지: `/admin/links`  
- 기능:  
  1) **VIBE** 플랫폼의 `android`, `ios`, `web`, `notes`, `flags`(토글) 편집  
  2) **링크 유효성 테스트**(HEAD → 실패시 GET, 타임아웃 3s, 재시도 1회)  
  3) **저장** 시 `deeplinks.json`에 병합 커밋(타 플랫폼 키 보존)  
</TARGET>

<SCHEMA>  
Zod 스키마를 `admin/lib/schemas/deeplinks.ts`로 생성하라.
```ts
import { z } from "zod";

export const DeeplinkFlagsSchema = z.object({
force_web_fallback: z.boolean().default(false),
requires_user_agent: z.boolean().default(false),
});

export const PlatformEntrySchema = z.object({
android: z.string().trim().optional().nullable(),
ios: z.string().trim().optional().nullable(),
web: z.string().trim().url().optional().nullable(),
notes: z.string().trim().optional().nullable(),
flags: DeeplinkFlagsSchema.default({}),
last_check: z.string().datetime().nullable().optional(),
status: z.enum(["ok", "warn", "fail", "unknown"]).default("unknown"),
});

export const DeeplinksSchema = z.object({
updated_at: z.string().datetime().optional(),
platforms: z.record(PlatformEntrySchema).default({}),
});
export type Deeplinks = z.infer<typeof DeeplinksSchema>;

````
- 저장 규칙:
  - `platforms.vibe.web`은 가능하면 `https://vibe.naver.com/`로 시작하도록 권장(규칙 위반 시 `warn`).
  - `android`/`ios`는 스킴 자유 입력(intent/app 스킴/https 허용).
  - 빈 문자열은 `null` 처리.
</SCHEMA>

<FILES_TO_CREATE>
- `admin/app/admin/links/page.tsx` (UI: VIBE 탭/입력폼/저장·테스트 버튼·토스트)
- `admin/app/admin/actions/links.save.ts` (Server Action: 저장)
- `admin/app/admin/actions/links.test.ts` (Server Action: 유효성 테스트)
- `admin/lib/github.ts` (GitHub Contents API 유틸: `getFile`, `putFile`)
- `admin/lib/schemas/deeplinks.ts` (위 스키마)
</FILES_TO_CREATE>

<IMPLEMENTATION_NOTES>
- `getFile(path)` → 파일이 없으면 **빈 스켈레톤**으로 대체:
```json
{ "updated_at": null, "platforms": {} }
````

- `putFile(path, content, sha, message)` → GitHub Contents API `PUT` 사용, `sha` 충돌 처리.
- 테스트 로직(`links.test.ts`):
  - 입력된 각 URL에 대해 `HEAD`(3s) → 실패면 `GET`(3s)
  - `ok: true/false`, `httpStatus`, `finalUrl` 반환 배열
  - `web`이 `vibe.naver.com`가 아니면 상태는 `warn`(200이더라도)

- 저장 로직(`links.save.ts`):
  - 기존 JSON 로드 → `platforms.vibe`만 덮어쓰기, 타 키 유지
  - `updated_at` UTC ISO로 갱신
  - 커밋 메시지: `chore(admin): update deeplinks (vibe)`

- UI는 **필드별 에러·경고 배지** 표시, 저장/테스트 결과를 토스트로 피드백.
  </IMPLEMENTATION_NOTES>

<ACCEPTANCE_CRITERIA>

- 빈 저장소에도 최초 저장 가능(파일 자동 생성).
- VIBE의 링크들을 편집 → “링크 테스트” 실행 시 `ok/warn/fail` 반영, `last_check` 갱신.
- “저장” 시 GitHub 커밋 성공, 다른 플랫폼 데이터는 보존.
- 프론트 `/streaming`에서 `deeplinks.json` 변경이 즉시 반영(별도 빌드 없이).
  </ACCEPTANCE_CRITERIA>

<OUTPUT>  
- 위 파일 전부의 **정식 코드**. (임포트 경로 정확히, TS 에러 없이 빌드 가능)  
- `admin/app/admin/links/page.tsx`에 shadcn/ui(Form, Input, Switch, Button, Tabs) 사용.  
- 서버액션은 `use server` 선언 포함.  
- 네트워크 에러/권한 에러에 대한 사용자 메시지 처리.  
</OUTPUT>

---

# 🅱️ 프론트 연동(스트리밍 페이지 VIBE 버튼) 프롬프트

<ROLE>  
너는 Next.js 15 + TypeScript 환경의 **프론트엔드 개발자**다.  
Admin이 커밋한 `deeplinks.json`을 읽어 `/streaming` 페이지의 **VIBE 버튼**을 동작시키는 작업을 한다.  
**안정성/장애내성**을 고려해 구현한다.  
</ROLE>

<CONTEXT>  
- 데이터 베이스 URL: `NEXT_PUBLIC_DATA_BASE_URL` → `.../docs/public-data`  
- Admin 파일 경로: `/admin/deeplinks.json`  
- 버튼 동작:  
  - 기본: 환경(모바일/데스크톱)·플래그를 고려해 `android/ios/web` 중 하나를 사용  
  - `flags.force_web_fallback === true`면 무조건 `web`  
  - 링크가 비어있으면 버튼 비활성 + “관리자에서 링크를 설정하세요” 툴팁  
</CONTEXT>

<TASKS>  
1) 유틸 작성  
- `frontend/lib/fetch-deeplinks.ts`  
```ts
export async function fetchDeeplinks() {
  const base = process.env.NEXT_PUBLIC_DATA_BASE_URL!;
  const r = await fetch(`${base}/admin/deeplinks.json`, { cache: "no-store" });
  if (!r.ok) throw new Error("Failed to load deeplinks.json");
  return r.json();
}
```
2) 디바이스/OS 감지(간단)  
- UA로 iOS/Android 여부 판별(오탐 줄이기 위해 최소 판별만; 또는 `react-device-detect` 이용)  
3) `/streaming/page.tsx`에서 데이터 로드 후, VIBE 카드/버튼에 링크 주입  
- 우선순위:  
  - `force_web_fallback`이면 `web`  
  - iOS → `ios || web`  
  - Android → `android || web`  
  - 기타(데스크톱) → `web`  
- 비어있으면 버튼 disabled + Tooltip  
4) 에러/로딩 상태 처리  
- 로딩: Skeleton  
- 에러: 가벼운 안내문 + 재시도 버튼  
</TASKS>

<ACCEPTANCE_CRITERIA>

- Admin에서 VIBE 링크 변경 → 새로고침 시 즉시 반영
- 링크 미설정 시 안전한 비활성/안내
- `force_web_fallback` 동작 확인
- 코드 전체 TS 타입 안전, 빌드 가능
  </ACCEPTANCE_CRITERIA>

<OUTPUT>  
- `frontend/lib/fetch-deeplinks.ts` 코드  
- `frontend/app/streaming/page.tsx`(또는 분리된 `components/streaming/platform-button.tsx`) 수정 코드  
- 간단 테스트 예시(예: `expect(getPreferredLink(...)).toBe(...)`)  
</OUTPUT>

---

## 💡 프롬프트 작성 팁(네가 준 대화 내용 적용)

- **역할·맥락을 먼저 주기**: <ROLE>, <CONTEXT> 블록으로 시작
- **예시·스키마 제공**: <SCHEMA>에 구체 키·타입 제시
- **구조화**: <TASKS>, <FILES_TO_CREATE>, <OUTPUT> 등으로 분리
- **단계화**: A(관리), B(연동)로 나누고, 각 수용 기준을 명시
- **안전장치**: 링크 유효성 검사, Zod 검증, GitHub 커밋 충돌 처리, 에러 UX
- **책임 있는 사용**: 토큰/비밀값은 환경변수로만, 민감 정보 금지

---
