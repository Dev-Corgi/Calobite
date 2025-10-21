# 🔍 크롤링 최적화 가이드

이 프로젝트의 크롤링 및 SEO 설정에 대한 빠른 참조 가이드입니다.

---

## 📁 주요 파일

### SEO & 크롤링 설정
```
project/
├── app/
│   ├── robots.ts           # robots.txt 생성
│   ├── sitemap.ts          # sitemap.xml 생성
│   ├── not-found.tsx       # 404 페이지 (noindex)
│   └── search/page.tsx     # 검색 페이지 (결과 noindex)
├── lib/
│   ├── static-config.ts    # Static generation 설정
│   ├── sitemap-utils.ts    # Sitemap 유틸리티
│   └── top-brands.ts       # Top brands 파싱
└── scripts/
    ├── check-crawling.ts   # 크롤링 체크 스크립트
    └── check-seo-headers.ts # SEO 헤더 체크
```

---

## 🚀 빠른 시작

### 1. 로컬 테스트
```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 확인
# http://localhost:3000/robots.txt
# http://localhost:3000/sitemap.xml
```

### 2. 크롤링 체크
```bash
# 전체 체크 실행
npm run check-all

# 개별 체크
npm run check-crawling  # robots.txt, sitemap, 404, redirects
npm run check-seo       # Meta tags, headers, canonical
```

### 3. 배포
```bash
# 빌드
npm run build

# 프로덕션 서버 (로컬 테스트)
npm run start
```

---

## 🔧 설정 방법

### 환경 변수
`.env.local` 파일:
```bash
# 필수
NEXT_PUBLIC_BASE_URL=https://www.calobite.com

# Supabase (기존 설정)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

# 선택적
MAX_STATIC_PAGES=10000  # 기본값: 10000
```

### Static Generation 설정
`lib/static-config.ts`:
```typescript
export const STATIC_GENERATION_CONFIG = {
  MAX_STATIC_PAGES: 10000,        // 최대 정적 페이지 수
  REVALIDATE_SECONDS: 86400,      // ISR 갱신 주기 (24시간)
  MAX_PRODUCTS_PER_BRAND: 1000,   // 브랜드당 최대 제품 수
  GENERATE_SITEMAP: true,          // Sitemap 생성 여부
};
```

---

## 📊 체크 스크립트 상세

### check-crawling
robots.txt, sitemap, 404, redirect를 종합 체크합니다.

```bash
npm run check-crawling
```

**체크 항목:**
- ✅ robots.txt 접근성 및 내용
- ✅ sitemap.xml URL 수 (50,000 제한)
- ✅ 주요 페이지 404 에러
- ✅ Redirect 체인 및 루프

**출력:**
- 콘솔에 체크 결과 표시
- `crawling-health-report.json` 생성

### check-seo
Meta 태그, 보안 헤더, canonical을 체크합니다.

```bash
npm run check-seo
```

**체크 항목:**
- ✅ Meta tags (title, description, OG, Twitter)
- ✅ Security headers (CSP, HSTS, X-Frame-Options)
- ✅ Canonical URL
- ✅ Structured data (JSON-LD)

---

## 🤖 robots.txt 설정

### 생성 위치
`app/robots.ts` → `/robots.txt`

### 주요 규칙
```txt
# 모든 크롤러
User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /search?*      # 검색 결과만 차단
Disallow: /*?utm_*       # UTM 파라미터
Disallow: /*.json$

# Google
User-agent: Googlebot
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /search?*
Disallow: /*?utm_*

# AI 크롤러 차단
User-agent: GPTBot
Disallow: /

Sitemap: https://www.calobite.com/sitemap.xml
```

### 커스터마이징
`app/robots.ts` 파일 수정:
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', ...],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
```

---

## 🗺️ sitemap.xml 설정

### 생성 위치
`app/sitemap.ts` → `/sitemap.xml`

### 포함 페이지
1. **정적 페이지** (7개)
   - `/` (priority: 1.0)
   - `/search` (priority: 0.9)
   - `/about` (priority: 0.8)
   - `/faq` (priority: 0.8)
   - `/contact` (priority: 0.7)
   - `/privacy-policy` (priority: 0.5)
   - `/terms-of-service` (priority: 0.5)

2. **제품 페이지** (최대 44,993개)
   - `/product/[code]` (priority: 0.7)
   - Top brands 기반 동적 생성
   - ISR: 24시간 갱신

### Google 제한
- ✅ **최대 URL 수:** 50,000 (현재: 45,000으로 제한)
- ✅ **최대 파일 크기:** 50MB
- ✅ **필수 태그:** `<lastmod>`, `<priority>`, `<changeFrequency>`

### URL 제한 초과 시
50,000개 이상 필요한 경우 sitemap index 사용:

```typescript
import { splitIntoSitemaps, needsSitemapIndex } from '@/lib/sitemap-utils';

if (needsSitemapIndex(totalUrls)) {
  const chunks = splitIntoSitemaps(allUrls, 40000);
  // sitemap-0.xml, sitemap-1.xml, ... 생성
}
```

---

## 🔍 SEO 최적화 포인트

### 1. 검색 결과 페이지 noindex
**파일:** `app/search/page.tsx`

검색 결과는 무한히 생성될 수 있으므로 인덱싱 차단:
```typescript
robots: query 
  ? { index: false, follow: true }  // 검색 결과: noindex
  : { index: true, follow: true },   // 메인 검색 페이지: index
```

**효과:**
- 크롤 예산 절약
- 중복 콘텐츠 방지
- 주요 페이지 인덱싱 집중

### 2. 404 페이지 noindex
**파일:** `app/not-found.tsx`

```typescript
export const metadata: Metadata = {
  robots: {
    index: false,  // 404 페이지는 인덱싱 안 함
    follow: true,  // 링크는 따라감
  },
};
```

### 3. Canonical URL
모든 페이지에 canonical URL 설정:
```typescript
alternates: {
  canonical: `${baseUrl}/current-path`,
},
```

---

## 📈 Google Search Console 가이드

### 1. Sitemap 제출
1. https://search.google.com/search-console 접속
2. 속성 선택: `www.calobite.com`
3. Sitemaps > 새 sitemap 추가
4. URL 입력: `https://www.calobite.com/sitemap.xml`
5. 제출

### 2. URL 검사
주요 페이지 샘플 테스트:
- 홈: `/`
- 검색: `/search`
- 제품: `/product/sample-code`
- About: `/about`

### 3. Coverage 리포트
**확인 주기:** 주 1회

**목표:**
- Valid URLs: 95%+
- Errors: 0개
- Warnings: 최소화

---

## 🛠️ 트러블슈팅

### Sitemap이 생성되지 않음
**원인:**
- `GENERATE_SITEMAP: false` 설정
- Supabase 연결 실패
- Top brands 데이터 없음

**해결:**
```bash
# 1. 설정 확인
cat lib/static-config.ts | grep GENERATE_SITEMAP

# 2. Top brands 확인
npm run check-brands

# 3. Sitemap 재생성
npm run build
```

### robots.txt가 적용되지 않음
**원인:**
- 캐싱 문제
- 환경 변수 미설정

**해결:**
```bash
# 1. 캐시 클리어
npm run clean
npm run dev

# 2. 브라우저 캐시 클리어 (Ctrl+Shift+R)

# 3. 환경 변수 확인
echo $NEXT_PUBLIC_BASE_URL
```

### 404 체크 실패
**원인:**
- 로컬 서버 미실행
- 환경 변수 오류

**해결:**
```bash
# 1. 서버 실행 확인
npm run dev

# 2. BASE_URL 확인
NEXT_PUBLIC_BASE_URL=http://localhost:3000 npm run check-crawling
```

---

## 📚 관련 문서

### 프로젝트 문서
- [../CRAWLING_DIAGNOSTIC_REPORT.md](../CRAWLING_DIAGNOSTIC_REPORT.md) - 전체 진단 리포트
- [../CRAWLING_CHECKLIST.md](../CRAWLING_CHECKLIST.md) - 빠른 체크리스트
- [../SEO_COMPLETE_AUDIT_REPORT.md](../SEO_COMPLETE_AUDIT_REPORT.md) - SEO 감사
- [../STATIC_GENERATION_README.md](../STATIC_GENERATION_README.md) - SSG 가이드

### 외부 참고
- [Google Robots.txt 가이드](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google Sitemap 가이드](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)

---

## ✅ 요약

### 핵심 기능
- ✅ **robots.txt:** 자동 생성, 최적화된 크롤 규칙
- ✅ **sitemap.xml:** 동적 생성, 45,000 URL 제한
- ✅ **404 페이지:** 사용자 친화적, noindex 적용
- ✅ **검색 결과:** noindex로 크롤 예산 절약
- ✅ **체크 스크립트:** 자동화된 검증 도구

### 필수 명령어
```bash
npm run dev            # 개발 서버
npm run build          # 프로덕션 빌드
npm run check-all      # 전체 체크
```

### 배포 후 필수 작업
1. ✅ Google Search Console에 sitemap 제출
2. ✅ Coverage 리포트 모니터링
3. ✅ 주간/월간 크롤링 체크 실행

---

**마지막 업데이트:** 2025-01-21  
**버전:** 1.0.0
