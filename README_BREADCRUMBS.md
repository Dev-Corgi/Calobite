# 🍞 Breadcrumb Navigation 가이드

Calobite 프로젝트의 Breadcrumb Navigation 시스템 사용 가이드입니다.

---

## 🎯 개요

모든 페이지에 자동으로 표시되는 Breadcrumb Navigation이 구현되었습니다.

**주요 기능:**
- ✅ 경로 기반 자동 생성
- ✅ Schema.org JSON-LD (SEO)
- ✅ 반응형 디자인
- ✅ 접근성 보장
- ✅ 현재 페이지 비활성화

**예시:**
```
🏠 Home > Products > Apple iPhone 15
```

---

## 📁 파일 구조

```
project/
├── hooks/
│   └── useBreadcrumbs.ts          # Breadcrumb 생성 hook
├── components/
│   ├── ui/
│   │   └── breadcrumb.tsx         # shadcn/ui 기본 컴포넌트
│   └── breadcrumb-nav.tsx         # 통합 Breadcrumb 컴포넌트
└── app/
    └── layout.tsx                 # 전역 통합
```

---

## 🚀 기본 사용법

### 1. 전역 표시 (이미 적용됨)

`app/layout.tsx`에 이미 통합되어 있어 별도 작업 불필요:

```tsx
<BreadcrumbNav showHomeIcon />
```

**모든 페이지에 자동 표시됨** ✅

---

## 🎨 커스터마이징

### 1. 커스텀 라벨

특정 페이지에서 다른 라벨을 사용하고 싶을 때:

```tsx
import { BreadcrumbNav } from '@/components/breadcrumb-nav';

export default function MyPage() {
  return (
    <>
      {/* 페이지별 breadcrumb 재정의 */}
      <BreadcrumbNav 
        customLabels={{
          'product': '제품',
          'about': '회사 소개',
        }}
      />
      
      {/* 페이지 내용 */}
    </>
  );
}
```

### 2. 제품 페이지 (제품명 표시)

제품 상세 페이지에서 제품명을 breadcrumb에 표시:

```tsx
import { BreadcrumbNav } from '@/components/breadcrumb-nav';

export default function ProductPage({ product }) {
  return (
    <>
      <BreadcrumbNav 
        productName={product.product_name}
      />
      
      {/* 제품 내용 */}
    </>
  );
}
```

**결과:**
```
🏠 Home > Products > Apple iPhone 15
```

### 3. 완전히 커스텀 Breadcrumbs

자동 생성 대신 수동으로 breadcrumb 정의:

```tsx
const customBreadcrumbs = [
  { label: 'Home', href: '/', isCurrent: false },
  { label: 'Blog', href: '/blog', isCurrent: false },
  { label: 'SEO Guide', href: '/blog/seo-guide', isCurrent: true },
];

<BreadcrumbNav 
  customBreadcrumbs={customBreadcrumbs}
/>
```

### 4. 홈 아이콘 토글

```tsx
{/* 홈 아이콘 표시 */}
<BreadcrumbNav showHomeIcon />

{/* 'Home' 텍스트 표시 */}
<BreadcrumbNav showHomeIcon={false} />
```

---

## 🎨 스타일 커스터마이징

### 기본 스타일

`components/breadcrumb-nav.tsx` 컨테이너:

```tsx
<div className="border-b border-border/40 bg-muted/30">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
    <BreadcrumbNav showHomeIcon />
  </div>
</div>
```

### 스타일 변경

**배경색 변경:**
```tsx
<div className="bg-white dark:bg-gray-900">
  <BreadcrumbNav />
</div>
```

**패딩 조정:**
```tsx
<div className="py-2">  {/* 기본 py-3에서 변경 */}
  <BreadcrumbNav />
</div>
```

**테두리 제거:**
```tsx
<div className="bg-muted/30">  {/* border-b 제거 */}
  <BreadcrumbNav />
</div>
```

---

## 🔧 Hook 사용법

직접 `useBreadcrumbs` hook을 사용하여 데이터만 가져오기:

```tsx
'use client';

import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';

export function MyComponent() {
  const breadcrumbs = useBreadcrumbs({
    customLabels: {
      'product': 'Products',
    },
  });
  
  return (
    <div>
      {breadcrumbs.map(crumb => (
        <span key={crumb.href}>
          {crumb.label}
          {!crumb.isCurrent && ' > '}
        </span>
      ))}
    </div>
  );
}
```

---

## 📊 Schema.org JSON-LD

Breadcrumb은 자동으로 Schema.org JSON-LD를 생성합니다:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.calobite.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Products",
      "item": "https://www.calobite.com/product"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Apple iPhone 15",
      "item": "https://www.calobite.com/product/12345"
    }
  ]
}
```

**SEO 효과:**
- Google 검색 결과에 breadcrumb 표시
- 사이트 구조 명확화
- 클릭률(CTR) 향상

---

## 🧪 테스트

### 1. 로컬 테스트

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 확인
http://localhost:3000/about
http://localhost:3000/product/sample
```

### 2. Google Rich Results Test

**URL:** https://search.google.com/test/rich-results

페이지 URL 입력:
```
https://www.calobite.com/about
https://www.calobite.com/product/[code]
```

**확인 사항:**
- ✅ BreadcrumbList 스키마 감지
- ✅ 에러 없음
- ✅ 경고 없음

### 3. 스크린샷 확인

**모바일:**
```
┌─────────────────────────┐
│ 🏠 > Products > Apple   │  ← 긴 텍스트 truncate
└─────────────────────────┘
```

**데스크톱:**
```
┌────────────────────────────────────┐
│ 🏠 Home > Products > Apple iPhone  │
└────────────────────────────────────┘
```

---

## 🐛 트러블슈팅

### Breadcrumb이 표시되지 않음

**원인:** 홈페이지(/)에서는 breadcrumb 비표시

**해결:**
```tsx
// 홈페이지가 아닌 페이지에서만 표시됨
if (pathname === '/') {
  return null;
}
```

### 제품명이 표시되지 않음

**원인:** `productName` prop 누락

**해결:**
```tsx
<BreadcrumbNav 
  productName={product?.product_name || 'Product'}
/>
```

### Schema가 중복됨

**원인:** 페이지와 layout 모두에 breadcrumb 추가

**해결:**
- Layout에 하나만 유지 (전역)
- 또는 페이지별로 재정의

### 긴 제품명이 깨짐

**원인:** 모바일에서 긴 텍스트

**해결:** 이미 `truncate` 적용됨
```tsx
<span className="max-w-[120px] sm:max-w-none truncate">
  {crumb.label}
</span>
```

---

## 🎯 Best Practices

### 1. 일관성 유지

모든 페이지에서 동일한 breadcrumb 스타일 사용:

```tsx
// ✅ Good
<BreadcrumbNav showHomeIcon />

// ❌ Avoid
<BreadcrumbNav showHomeIcon={Math.random() > 0.5} />
```

### 2. 의미 있는 라벨

사용자가 이해하기 쉬운 라벨 사용:

```tsx
// ✅ Good
customLabels={{
  'product': 'Products',
  'about': 'About Us',
}}

// ❌ Avoid
customLabels={{
  'product': 'P',
  'about': 'AB',
}}
```

### 3. 현재 페이지 비활성화

현재 페이지는 클릭 불가능하게 유지 (이미 적용됨):

```tsx
{isLast ? (
  <BreadcrumbPage>{label}</BreadcrumbPage>
) : (
  <BreadcrumbLink asChild>
    <Link href={href}>{label}</Link>
  </BreadcrumbLink>
)}
```

### 4. 모바일 최적화

긴 라벨은 truncate 적용 (이미 적용됨):

```tsx
<span className="max-w-[120px] sm:max-w-none truncate">
  {crumb.label}
</span>
```

---

## 📚 API Reference

### `useBreadcrumbs(options)`

**Options:**
```typescript
interface UseBreadcrumbsOptions {
  customLabels?: Record<string, string>;
  customBreadcrumbs?: BreadcrumbItem[];
  includeHome?: boolean;  // default: true
}
```

**Returns:**
```typescript
BreadcrumbItem[] = [
  {
    label: string;
    href: string;
    isCurrent: boolean;
  },
  ...
]
```

### `<BreadcrumbNav />`

**Props:**
```typescript
interface BreadcrumbNavProps {
  customLabels?: Record<string, string>;
  customBreadcrumbs?: BreadcrumbItem[];
  showHomeIcon?: boolean;  // default: false
  productName?: string;
  className?: string;
}
```

---

## ✨ 예제 모음

### 예제 1: 기본 사용

```tsx
export default function AboutPage() {
  return (
    <div>
      {/* Breadcrumb은 layout에서 자동 표시 */}
      <h1>About Us</h1>
      <p>Welcome to Calobite...</p>
    </div>
  );
}
```

**결과:** `🏠 Home > About Us`

### 예제 2: 제품 페이지

```tsx
export default async function ProductPage({ params }) {
  const product = await getProduct(params.code);
  
  return (
    <div>
      {/* 필요시 제품명 표시 */}
      <BreadcrumbNav productName={product.product_name} />
      
      <ProductDetails product={product} />
    </div>
  );
}
```

**결과:** `🏠 Home > Products > Apple iPhone 15`

### 예제 3: 블로그 (향후)

```tsx
export default function BlogPostPage() {
  return (
    <div>
      <BreadcrumbNav 
        customLabels={{
          'blog': 'Blog',
          'category': 'Nutrition Tips',
        }}
      />
      
      <article>...</article>
    </div>
  );
}
```

**결과:** `🏠 Home > Blog > Nutrition Tips > Post Title`

---

## 🔗 관련 문서

- [SITE_ARCHITECTURE_REPORT.md](../../SITE_ARCHITECTURE_REPORT.md) - 전체 구조 리포트
- [SEO_COMPLETE_AUDIT_REPORT.md](../../SEO_COMPLETE_AUDIT_REPORT.md) - SEO 감사
- [Google Breadcrumb Guide](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)

---

**마지막 업데이트:** 2025-01-21  
**버전:** 1.0.0
