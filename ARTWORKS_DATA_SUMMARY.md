# Supabase Artworks Table Data Summary

**Retrieved:** 2026-02-04
**Endpoint:** http://localhost:3001/api/artworks
**Total Artworks:** 3

---

## Image URLs by Artwork

### 1. **Test2** (Slug: test2)
- **ID:** 6e691225-65c1-4c4d-bb50-943ae00a2c18
- **Tag:** process
- **Year:** 2026
- **Featured:** Yes
- **Medium:** Oil
- **Dimensions:** 36×48
- **Season:** Summer 2025

#### Images:
- **Thumbnail:** `https://pub-e3d9ba3ff31243bfabde409c7d0a8462.r2.dev/artworks/8583eba6-9ceb-43ec-b991-6788eac06f40.png`
- **Hero Image:** `https://pub-e3d9ba3ff31243bfabde409c7d0a8462.r2.dev/artworks/f54a34f4-ff8e-4286-8a38-fa3b7ec5ea2e.jpg`
- **Studio Image:** `https://pub-e3d9ba3ff31243bfabde409c7d0a8462.r2.dev/artworks/ecb12fa0-f432-49d8-a0d4-cc2c4c4db688.jpg`
- **Process Images:** (empty)

#### Content:
- **Description:** 테스트 글입니다.
- **Technical Insight:** 테스트 임
- **Studio Text:** 테스트
- **Reflection:** 멋진 작품입니다

---

### 2. **test** (Slug: test)
- **ID:** b0c92566-4d43-4f9c-89aa-4581279e4228
- **Tag:** selected-works
- **Year:** 2026
- **Featured:** Yes
- **Medium:** test
- **Dimensions:** test
- **Season:** winter

#### Images:
- **Thumbnail:** `https://pub-e3d9ba3ff31243bfabde409c7d0a8462.r2.dev/artworks/1f8c9ae2-05f4-4027-a705-175c3513ca7b.jpg`
- **Hero Image:** `https://pub-e3d9ba3ff31243bfabde409c7d0a8462.r2.dev/artworks/a3edcd75-ef46-4366-94b0-c63e0de5e434.webp`
- **Studio Image:** `https://pub-e3d9ba3ff31243bfabde409c7d0a8462.r2.dev/artworks/4b915983-d7eb-4806-9c7b-ee355cb074f3.jpg`
- **Process Images:** (empty)

#### Content:
- **Description:** test
- **Technical Insight:** test
- **Studio Text:** test
- **Reflection:** test

---

### 3. **테스트** (Slug: empty)
- **ID:** 9a641a63-3c6d-4ba6-ae54-d9ddf9bdb118
- **Tag:** sketchbook
- **Year:** 2026
- **Featured:** Yes
- **Medium:** Oil
- **Dimensions:** 36"X48"
- **Season:** fall 2024

#### Images:
- **Thumbnail:** `https://pub-e3d9ba3ff31243bfabde409c7d0a8462.r2.dev/artworks/31cfd2c7-8444-4a93-9953-68347830add3.jpg`
- **Hero Image:** `https://pub-e3d9ba3ff31243bfabde409c7d0a8462.r2.dev/artworks/4a943476-b00a-49d4-9591-d8a3f78ee145.jpg`
- **Studio Image:** `https://pub-e3d9ba3ff31243bfabde409c7d0a8462.r2.dev/artworks/4df33b1e-2a0d-44e6-b1c9-55e2b6678b62.jpg`
- **Process Images:** (empty)

#### Content:
- **Description:** test
- **Technical Insight:** 테스트1
- **Studio Text:** 테스트2
- **Reflection:** 테스트3

---

## All Image URLs (Consolidated List)

### Cloudflare R2 Bucket: `art-portfolio-jubin`
**Base URL:** `https://pub-e3d9ba3ff31243bfabde409c7d0a8462.r2.dev/artworks/`

#### All Images:
1. `8583eba6-9ceb-43ec-b991-6788eac06f40.png` (Test2 thumbnail)
2. `f54a34f4-ff8e-4286-8a38-fa3b7ec5ea2e.jpg` (Test2 hero)
3. `ecb12fa0-f432-49d8-a0d4-cc2c4c4db688.jpg` (Test2 studio)
4. `1f8c9ae2-05f4-4027-a705-175c3513ca7b.jpg` (test thumbnail)
5. `a3edcd75-ef46-4366-94b0-c63e0de5e434.webp` (test hero)
6. `4b915983-d7eb-4806-9c7b-ee355cb074f3.jpg` (test studio)
7. `31cfd2c7-8444-4a93-9953-68347830add3.jpg` (테스트 thumbnail)
8. `4a943476-b00a-49d4-9591-d8a3f78ee145.jpg` (테스트 hero)
9. `4df33b1e-2a0d-44e6-b1c9-55e2b6678b62.jpg` (테스트 studio)

---

## Storage Information

**Storage Provider:** Cloudflare R2
**Bucket Name:** art-portfolio-jubin
**Public URL:** https://pub-e3d9ba3ff31243bfabde409c7d0a8462.r2.dev
**Image Format:** Mixed (jpg, webp, png)

---

## Key Findings

- All 3 artworks are marked as **featured**
- All have **sort_order = 0** (may need differentiation)
- **No process images** stored for any artwork
- Images are stored in **Cloudflare R2**, not Supabase storage
- All artworks contain **thumbnail**, **hero_image**, and **studio_image** fields
- Content includes Korean (한글) text for some artworks
- Database structure appears complete with metadata fields
