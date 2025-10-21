# 🔄 Canonical URLs & Duplicate Content 가이드

Calobite 프로젝트의 중복 콘텐츠 방지 및 canonical URL 관리 가이드입니다.

---

## 🎯 개요

모든 페이지에 올바른 canonical URL과 robots 메타 태그가 설정되어 있습니다.

**핵심 기능:**
- ✅ 100% Canonical coverage
- ✅ Self-referencing canonical URLs
- ✅ Intelligent robots meta tags
- ✅ Pagination SEO support
- ✅ Automated duplicate content checker

---

## 📁 파일 구조

```
project/
├── lib/
│   └── seo-utils.ts                   # SEO 유틸리티 함수
├── components/
│   └── pagination-seo.tsx             # Pagination SEO 컴포넌트
├── scripts/
│   └── check-duplicate-content.ts     # 중복 콘텐츠 체크
└── app/
    └── [각 페이지]/page.tsx           # Canonical 설정
```

---

## 🚀 기본 사용법

### 1. 정적 페이지 (About, FAQ, Contact 등)

**수동 설정 (현재 방식):**
```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Calobite',
  description: '...',
  alternates: {
    canonical: 'https://www.calobite.com/about',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};
```

**자동 설정 (권장):**
```tsx
import { generateSEOMetadata } from '@/lib/seo-utils';

export const metadata = generateSEOMetadata({
  path: '/about',
  title: 'About Calobite',
  description: '...',
  pageType: 'static',
});
```

### 2. 동적 페이지 (Product 등)

```tsx
export async function generateMetadata({ params }) {
  const product = await getProduct(params.code);
  
  return generateSEOMetadata({
    path: `/product/${params.code}`,
    title: product.name,
    description: product.description,
    pageType: 'product',
  });
}
```

### 3. 검색 결과 페이지

```tsx
export async function generateMetadata({ searchParams }) {
  const query = searchParams.query;
  
  return generateSEOMetadata({
    path: `/search${query ? `?query=${query}` : ''}`,
    title: query ? `Search: ${query}` : 'Search',
    description: '...',
    pageType: 'search',
    includeQueryInCanonical: true, // Query가 있으면 포함
  });
}
```

---

## 🎨 SEO 유틸리티 사용법

### 1. Canonical URL 생성

```typescript
import { 
  generateCanonicalUrl, 
  generateSelfCanonical 
} from '@/lib/seo-utils';

// Self-referencing canonical (가장 일반적)
const canonical = generateSelfCanonical('/about');
// → 'https://www.calobite.com/about'

// Query parameter 포함/제외 제어
const withQuery = generateCanonicalUrl('/search?query=apple', true);
// → 'https://www.calobite.com/search?query=apple'

const withoutQuery = generateCanonicalUrl('/search?query=apple', false);
// → 'https://www.calobite.com/search'
```

### 2. Robots 설정

```typescript
import { getRobotsForPageType, ROBOTS_PRESETS } from '@/lib/seo-utils';

// 페이지 타입별 자동 설정
const robots = getRobotsForPageType('static');
// → { index: true, follow: true, googleBot: {...} }

// 검색 결과 (query 있을 때 noindex)
const searchRobots = getRobotsForPageType('search', hasQuery: true);
// → { index: false, follow: true }

// 직접 프리셋 사용
const noindexRobots = ROBOTS_PRESETS.noindex;
// → { index: false, follow: true }
```

### 3. 통합 메타데이터 생성

```typescript
import { generateSEOMetadata } from '@/lib/seo-utils';

const metadata = generateSEOMetadata({
  path: '/faq',
  title: 'FAQ - Frequently Asked Questions',
  description: 'Find answers to common questions',
  pageType: 'static',
  ogImage: '/og-faq.png', // Optional
  keywords: ['faq', 'help', 'questions'], // Optional
});

// Returns complete Metadata object:
// - canonical
// - robots
// - openGraph
// - twitter
```

### 4. URL 인덱싱 여부 확인

```typescript
import { shouldIndexUrl } from '@/lib/seo-utils';

shouldIndexUrl('https://www.calobite.com/about');
// → true

shouldIndexUrl('https://www.calobite.com/search?query=test');
// → false (검색 결과)

shouldIndexUrl('https://www.calobite.com/api/data');
// → false (API 경로)

shouldIndexUrl('https://www.calobite.com/products?page=2');
// → false (pagination)
```

---

## 🔢 Pagination SEO

### 클라이언트 컴포넌트 사용

```tsx
import { PaginationSEO } from '@/components/pagination-seo';

export default function SearchPage({ searchParams }) {
  const currentPage = parseInt(searchParams.page || '1');
  const totalPages = 10;
  
  return (
    <>
      {/* Automatically adds rel="prev" and rel="next" */}
      <PaginationSEO 
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/search"
      />
      
      <div>
        {/* Search results */}
      </div>
    </>
  );
}
```

**생성되는 HTML (Page 2):**
```html
<link rel="prev" href="https://www.calobite.com/search" />
<link rel="next" href="https://www.calobite.com/search?page=3" />
```

### 서버 사이드 메타데이터

```tsx
import { generatePaginationMetadata } from '@/components/pagination-seo';

export async function generateMetadata({ searchParams }) {
  const page = parseInt(searchParams.page || '1');
  
  return {
    title: `Search Results - Page ${page}`,
    description: '...',
    ...generatePaginationMetadata(page, 10, '/search'),
    // → robots: { index: false, follow: true } for page > 1
    // → canonical: points to page 1
  };
}
```

---

## 🧪 테스트 & 검증

### 1. 자동 체크 스크립트

```bash
# 중복 콘텐츠 체크
npm run check-duplicates

# 전체 SEO 체크
npm run check-all
```

**체크 항목:**
- ✅ Canonical tags (존재 여부, 정확성)
- ✅ Robots meta tags
- ✅ Duplicate titles
- ✅ Duplicate descriptions
- ✅ Self-referencing canonical

**출력 예시:**
```
📊 Summary:
   Total Pages Checked: 8
   Canonical Coverage: 100.0%
   Self-Referencing Canonical: 8
   Duplicate Content Issues: 0

✅ All pages have correct canonical tags!
```

### 2. 수동 확인

**브라우저 DevTools:**
```bash
# 1. 페이지 열기
# 2. F12 > Elements 탭
# 3. <head> 섹션에서 확인:

<link rel="canonical" href="https://www.calobite.com/about" />
<meta name="robots" content="index, follow" />
```

**Curl 명령어:**
```bash
curl http://localhost:3000/about | grep canonical
curl http://localhost:3000/about | grep robots
```

### 3. Screaming Frog 크롤

1. Screaming Frog SEO Spider 실행
2. URL 입력: `http://localhost:3000`
3. Start 클릭
4. **Internal > Canonical** 탭 확인
   - All pages should have canonical
   - Canonical URL = Page URL (self-referencing)
5. **Internal > Meta Robots** 탭 확인
   - Static pages: index, follow
   - Search results: noindex, follow

---

## 📋 페이지별 Canonical 전략

### Static Pages
```tsx
// All static pages point to themselves
canonical: 'https://www.calobite.com/about'
robots: index, follow
```

### Product Pages
```tsx
// Each product has unique canonical
canonical: 'https://www.calobite.com/product/12345'
robots: index, follow
```

### Search Main Page
```tsx
// Main search page is indexed
canonical: 'https://www.calobite.com/search'
robots: index, follow
```

### Search Results
```tsx
// Search results are NOT indexed
canonical: 'https://www.calobite.com/search?query=apple'
robots: noindex, follow
```

### Pagination (Page 2+)
```tsx
// Paginated pages point to page 1
canonical: 'https://www.calobite.com/search'
robots: noindex, follow
```

### 404 Pages
```tsx
// Error pages are not indexed
robots: noindex, follow
```

---

## 🔧 트러블슈팅

### Canonical이 표시되지 않음

**확인:**
```bash
# 페이지 소스 확인
curl http://localhost:3000/about | grep canonical
```

**원인:**
- `alternates.canonical` 누락
- 환경 변수 `NEXT_PUBLIC_BASE_URL` 미설정

**해결:**
```tsx
// app/about/page.tsx
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.calobite.com/about',
  },
};
```

### Robots meta가 적용되지 않음

**확인:**
```bash
curl http://localhost:3000/search?query=test | grep robots
```

**원인:**
- `robots` 설정 누락
- 조건부 로직 오류

**해결:**
```tsx
export const metadata: Metadata = {
  robots: query 
    ? { index: false, follow: true }
    : { index: true, follow: true },
};
```

### Google이 다른 Canonical 선택

**Google Search Console > URL Inspection:**

```
User-declared canonical: https://www.calobite.com/about
Google-selected canonical: https://www.calobite.com/about (다를 경우)
```

**원인:**
- Duplicate content
- 잘못된 canonical URL
- Redirect chains

**해결:**
1. 중복 콘텐츠 제거
2. Canonical URL 수정
3. Redirect 정리

---

## 📚 API Reference

### `generateSEOMetadata(options)`

**Parameters:**
```typescript
interface GenerateSEOMetadataOptions {
  path: string;                    // '/about'
  title: string;                   // Page title
  description: string;             // Meta description
  pageType: PageType;              // 'static' | 'product' | 'search' | ...
  includeQueryInCanonical?: boolean; // Default: false
  ogImage?: string;                // Default: '/og-image.png'
  twitterImage?: string;           // Default: '/twitter-card.png'
  keywords?: string[];             // Optional
  noindex?: boolean;               // Force noindex
}
```

**Returns:** `Metadata`

### `getRobotsForPageType(pageType, hasQuery?)`

**Parameters:**
- `pageType`: 'homepage' | 'static' | 'product' | 'search' | 'pagination' | 'noindex'
- `hasQuery`: boolean (optional, for search pages)

**Returns:** `Metadata['robots']`

### `<PaginationSEO />`

**Props:**
```typescript
interface PaginationSEOProps {
  currentPage: number;  // Current page number
  totalPages: number;   // Total number of pages
  basePath: string;     // Base URL path (e.g., '/search')
}
```

---

## ✨ Best Practices

### 1. 항상 Self-Referencing Canonical 사용

```tsx
// ✅ Good
canonical: 'https://www.calobite.com/about'

// ❌ Bad
canonical: 'https://www.calobite.com' // Points to different page
```

### 2. Query Parameters 신중하게 처리

```tsx
// ✅ Good: Meaningful parameters included
canonical: 'https://www.calobite.com/search?query=apple'

// ✅ Good: Tracking parameters removed
canonical: 'https://www.calobite.com/about'
// (not: /about?utm_source=twitter)
```

### 3. Pagination은 항상 Noindex

```tsx
// Page 2+
robots: { index: false, follow: true }
canonical: 'https://www.calobite.com/page-1'
```

### 4. Search Results는 Noindex

```tsx
// /search?query=anything
robots: { index: false, follow: true }
```

---

## 🔗 관련 문서

- [DUPLICATE_CONTENT_REPORT.md](../../DUPLICATE_CONTENT_REPORT.md) - 전체 리포트
- [SEO_COMPLETE_AUDIT_REPORT.md](../../SEO_COMPLETE_AUDIT_REPORT.md) - SEO 감사
- [Google Canonical URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)

---

**마지막 업데이트:** 2025-01-21  
**버전:** 1.0.0
