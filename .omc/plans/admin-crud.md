# 관리자 페이지 구현 계획

## 개요
- **목표**: 학생이 직접 작품을 등록/수정/삭제할 수 있는 관리자 페이지
- **스택**: Supabase (DB/Auth) + Cloudflare R2 (이미지)
- **범위**: 작품 CRUD만 (프로필 관리 제외)

---

## 아키텍처

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
├─────────────────────────────────────────────────────────┤
│  /admin (보호됨)          │  / (공개)                    │
│  ├─ 로그인               │  ├─ 홈                       │
│  ├─ 작품 목록            │  ├─ 포트폴리오               │
│  ├─ 작품 등록/수정        │  ├─ 작품 상세               │
│  └─ 이미지 업로드         │  └─ 소개/연락처              │
├─────────────────────────────────────────────────────────┤
│                    API Routes (/api)                     │
│  ├─ /api/artworks (CRUD)                                │
│  ├─ /api/upload (이미지 → R2)                           │
│  └─ /api/auth (Supabase Auth)                           │
├─────────────────────────────────────────────────────────┤
│         Supabase                │    Cloudflare R2      │
│  ├─ PostgreSQL (artworks 테이블) │  ├─ 이미지 저장       │
│  └─ Auth (이메일/비밀번호)        │  └─ Public URL 제공   │
└─────────────────────────────────────────────────────────┘
```

---

## 데이터베이스 스키마

### artworks 테이블
```sql
CREATE TABLE artworks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  year INTEGER NOT NULL,
  tag TEXT NOT NULL CHECK (tag IN ('selected-works', 'sketchbook', 'process')),
  medium TEXT NOT NULL,
  dimensions TEXT NOT NULL,
  season TEXT,
  description TEXT NOT NULL,
  thumbnail TEXT NOT NULL,      -- R2 URL
  hero_image TEXT NOT NULL,     -- R2 URL
  process_images TEXT[],        -- R2 URL 배열
  technical_insight TEXT,
  studio_image TEXT,            -- R2 URL
  studio_text TEXT,
  reflection TEXT,
  featured BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 정책
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- 공개 읽기 허용
CREATE POLICY "Public read access" ON artworks
  FOR SELECT USING (true);

-- 인증된 사용자만 쓰기 허용
CREATE POLICY "Authenticated write access" ON artworks
  FOR ALL USING (auth.role() = 'authenticated');
```

---

## 구현 단계

### Phase 1: 인프라 설정
1. Supabase 프로젝트 생성 및 테이블 생성
2. Cloudflare R2 버킷 생성 및 CORS 설정
3. 환경변수 설정 (.env.local)

**필요한 환경변수:**
```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Cloudflare R2
R2_ACCOUNT_ID=xxx
R2_ACCESS_KEY_ID=xxx
R2_SECRET_ACCESS_KEY=xxx
R2_BUCKET_NAME=art-portfolio
R2_PUBLIC_URL=https://pub-xxx.r2.dev
```

### Phase 2: 패키지 설치 및 클라이언트 설정
```bash
npm install @supabase/supabase-js @aws-sdk/client-s3
```

**파일 생성:**
- `src/lib/supabase/client.ts` - 브라우저용 클라이언트
- `src/lib/supabase/server.ts` - 서버용 클라이언트
- `src/lib/r2/client.ts` - R2 업로드 클라이언트

### Phase 3: API 라우트 구현
| 엔드포인트 | 메서드 | 설명 |
|-----------|--------|------|
| `/api/artworks` | GET | 모든 작품 조회 |
| `/api/artworks` | POST | 작품 생성 (인증 필요) |
| `/api/artworks/[id]` | GET | 단일 작품 조회 |
| `/api/artworks/[id]` | PUT | 작품 수정 (인증 필요) |
| `/api/artworks/[id]` | DELETE | 작품 삭제 (인증 필요) |
| `/api/upload` | POST | 이미지 R2 업로드 (인증 필요) |

### Phase 4: 기존 데이터 소스 교체
- `src/lib/data/artworks.ts` → Supabase 쿼리로 교체
- 포트폴리오 페이지: API fetch로 변경
- 작품 상세: ISR (Incremental Static Regeneration) 적용

### Phase 5: 관리자 페이지 UI
```
/admin
├─ /admin/login        - 로그인 페이지
├─ /admin              - 대시보드 (작품 목록)
├─ /admin/artworks/new - 작품 등록
└─ /admin/artworks/[id] - 작품 수정
```

**관리자 페이지 컴포넌트:**
- `AdminLayout` - 사이드바 + 헤더
- `ArtworkForm` - 등록/수정 폼 (재사용)
- `ImageUploader` - 드래그앤드롭 이미지 업로드
- `ArtworkTable` - 작품 목록 테이블

### Phase 6: 데이터 마이그레이션
- 기존 10개 샘플 작품을 Supabase로 이전
- picsum.photos URL → 실제 이미지 업로드 (선택사항)

---

## 파일 구조 (추가되는 파일)

```
src/
├─ app/
│  ├─ admin/
│  │  ├─ layout.tsx           # 관리자 레이아웃 (인증 체크)
│  │  ├─ page.tsx             # 대시보드 (작품 목록)
│  │  ├─ login/
│  │  │  └─ page.tsx          # 로그인 페이지
│  │  └─ artworks/
│  │     ├─ new/
│  │     │  └─ page.tsx       # 작품 등록
│  │     └─ [id]/
│  │        └─ page.tsx       # 작품 수정
│  └─ api/
│     ├─ artworks/
│     │  ├─ route.ts          # GET (목록), POST (생성)
│     │  └─ [id]/
│     │     └─ route.ts       # GET, PUT, DELETE
│     └─ upload/
│        └─ route.ts          # 이미지 업로드
│
├─ components/
│  └─ admin/
│     ├─ AdminLayout.tsx
│     ├─ AdminSidebar.tsx
│     ├─ ArtworkForm.tsx
│     ├─ ArtworkTable.tsx
│     ├─ ImageUploader.tsx
│     └─ index.ts
│
└─ lib/
   ├─ supabase/
   │  ├─ client.ts            # 브라우저 클라이언트
   │  ├─ server.ts            # 서버 클라이언트
   │  └─ middleware.ts        # 인증 미들웨어
   ├─ r2/
   │  └─ client.ts            # R2 업로드 유틸
   └─ data/
      └─ artworks.ts          # Supabase 쿼리로 교체
```

---

## 보안 고려사항

1. **RLS (Row Level Security)**: Supabase에서 인증된 사용자만 쓰기 허용
2. **API 인증**: 모든 쓰기 엔드포인트에서 세션 검증
3. **이미지 검증**: 파일 타입/크기 제한 (최대 5MB, jpg/png/webp만)
4. **CORS**: R2 버킷에 도메인 제한 설정

---

## 예상 작업량

| Phase | 설명 | 예상 파일 수 |
|-------|------|-------------|
| 1 | 인프라 설정 | 설정만 |
| 2 | 클라이언트 설정 | 3 파일 |
| 3 | API 라우트 | 4 파일 |
| 4 | 데이터 소스 교체 | 2 파일 수정 |
| 5 | 관리자 UI | 10+ 파일 |
| 6 | 마이그레이션 | 스크립트 |

**총 예상**: 새 파일 ~20개, 수정 ~5개

---

## 사전 요구사항 (사용자 준비)

시작하기 전 다음을 준비해주세요:

1. **Supabase 계정** - https://supabase.com 가입
2. **Cloudflare 계정** - https://cloudflare.com 가입
3. **R2 버킷 생성** - Cloudflare 대시보드에서 R2 활성화

---

## 승인 요청

이 계획대로 진행할까요?

- [ ] Phase 1-6 순차 진행
- [ ] 예상 파일 수: ~25개
- [ ] 기존 기능 유지하면서 관리자 기능 추가
