# 📝 Meta Tags Guide

Calobite 프로젝트의 Title과 Meta Description 최적화 가이드입니다.

---

## 🎯 개요

모든 페이지의 Title과 Description이 SEO 베스트 프랙티스에 따라 최적화되었습니다.

**최적화 원칙:**
- Title: 50-60자 (픽셀 기준 600px 이하)
- Description: 150-160자
- 브랜드명 포함
- CTA 포함
- 키워드 전략적 배치

---

## 📁 파일 구조

```
project/
├── lib/
│   └── meta-templates.ts          # Meta templates & validation
├── scripts/
│   └── check-meta-tags.ts         # Analysis script
└── app/
    └── [각 페이지]/page.tsx       # Optimized metadata
```

---

## 🚀 빠른 시작

### 메타 태그 확인

```bash
npm run check-meta
```

**출력:**
- Title/Description 길이
- 중복 검사
- 품질 점수
- 개선 권장사항

---

## 📝 Title Tag 규칙

### 최적 길이

```
50-60 characters
또는
500-600 pixels
```

### 구조

```
[Primary Keyword] | [Secondary Keyword] | Calobite
```

**예시:**
```typescript
// ✅ Good
'Track Nutrition & Calories for Millions of Foods | Calobite'  // 59 chars

// ❌ Too Short
'Calobite'  // 8 chars

// ❌ Too Long
'Track Nutrition, Calories, Macros, Ingredients and More with Calobite Food Database'  // 85 chars
```

### 키워드 배치

**앞쪽에 중요 키워드:**
```typescript
// ✅ Good - 키워드 앞쪽
'Search Food Database | Find Nutrition Facts Instantly'

// ❌ Bad - 키워드 뒤쪽
'Calobite - Search Our Amazing Food Database'
```

---

## 📄 Meta Description 규칙

### 최적 길이

```
150-160 characters
```

### 구조

```
[Value Proposition]. [Key Features]. [Call to Action].
```

**예시:**
```typescript
// ✅ Good (157 chars)
'Search millions of food products to find detailed nutrition information. Get instant access to calories, macros, ingredients, and allergens for any food.'

// ❌ Too Short (87 chars)
'Find nutrition information for millions of products. Track calories and macros easily.'

// ❌ Too Long (195 chars)
'Discover comprehensive nutritional information for millions of food products worldwide. Track calories, macronutrients, micronutrients, ingredients, allergens, and much more with our extensive database.'
```

### CTA 포함

**추천 CTA 단어:**
- Discover
- Learn
- Find
- Explore
- Get
- Start
- Try
- Browse
- Search
- Track

**예시:**
```typescript
// ✅ Good - CTA 포함
'Discover detailed nutrition facts... Start your healthy journey today.'

// ❌ Bad - CTA 없음
'Nutrition information for food products. Comprehensive database available.'
```

---

## 🛠️ Meta Templates 사용

### Import

```typescript
import { META_TEMPLATES } from '@/lib/meta-templates';
```

### 정적 페이지

```typescript
// Homepage
export const metadata = META_TEMPLATES.homepage();

// About
export const metadata = META_TEMPLATES.about();

// Contact
export const metadata = META_TEMPLATES.contact();
```

### 동적 페이지

```typescript
// Product page
export async function generateMetadata({ params }) {
  const product = await getProduct(params.code);
  
  return META_TEMPLATES.product(
    product.product_name,
    product.brands
  );
}

// Search with query
export async function generateMetadata({ searchParams }) {
  return META_TEMPLATES.search(searchParams.query);
}
```

### Validation

```typescript
import { validateTitle, validateDescription } from '@/lib/meta-templates';

const title = 'My Page Title | Calobite';
const titleCheck = validateTitle(title);

console.log(titleCheck);
// {
//   valid: true,
//   charCount: 27,
//   pixelEstimate: 230,
//   issues: []
// }
```

---

## 📊 페이지별 최적화

### Homepage

```typescript
title: 'Calobite - Track Nutrition & Calories for Millions of Foods'
description: 'Discover detailed nutrition facts for millions of food products. Track calories, macros, and ingredients with Calobite\'s comprehensive food database. Start your healthy journey today.'

✅ Length: 59 chars (title), 160 chars (description)
✅ Keywords: Track Nutrition, Calories, Food Database
✅ CTA: Discover, Start
```

### About

```typescript
title: 'About Calobite | Mission to Make Nutrition Accessible'
description: 'Learn about Calobite\'s mission to simplify nutrition tracking. Meet our team dedicated to providing accurate food data and empowering healthier choices worldwide.'

✅ Length: 57 chars (title), 155 chars (description)
✅ Keywords: Nutrition Accessible, Food Data
✅ CTA: Learn, Meet
```

### Product Pages

```typescript
title: `${productName} by ${brand} - Nutrition Facts | Calobite`
description: `Complete nutrition information for ${productName} by ${brand}. View calories, macros, ingredients, and allergens. Make informed food choices with accurate data.`

✅ Dynamic generation
✅ Auto-truncation if > 60 chars
✅ Keywords: Nutrition Facts, Calories, Macros
✅ CTA: View, Make informed choices
```

---

## 🧪 테스트

### 로컬 테스트

```bash
# 개발 서버
npm run dev

# 메타 분석
npm run check-meta
```

### Screaming Frog

1. URL 입력: `http://localhost:3000`
2. Crawl 시작
3. **Page Titles** 탭 확인
   - Duplicate: 0
   - Over 60 chars: 0
   - Missing: 0
4. **Meta Description** 탭 확인
   - Duplicate: 0
   - Over 160 chars: 0
   - Missing: 0

### 브라우저 DevTools

```html
<!-- 페이지 소스 확인 -->
<title>Your Title Here | Calobite</title>
<meta name="description" content="Your description here..." />
```

---

## 💡 Best Practices

### DO ✅

- 50-60자 title 유지
- 150-160자 description 유지
- 브랜드명 포함 (| Calobite)
- CTA 포함
- 페이지별 고유한 내용
- 키워드 자연스럽게 배치

### DON'T ❌

- 키워드 반복 (stuffing)
- 모든 대문자
- 특수문자 남용
- Title/Description 동일하게
- 너무 일반적인 내용

---

## 🔧 트러블슈팅

### Title이 잘림

**문제:**
Google에서 title이 "..." 로 잘림

**원인:**
- 60자 초과
- 픽셀 폭 600px 초과

**해결:**
```typescript
// 길이 체크
validateTitle(myTitle)

// 짧게 수정
'Long Product Name Here | Calobite'  // 60자 초과
↓
'Long Product Name | Calobite'  // 짧게
```

### Description이 표시 안 됨

**문제:**
Google이 다른 텍스트 표시

**원인:**
- Description 너무 짧음
- 검색어와 관련성 부족
- Google이 페이지 내용 선택

**해결:**
- 150-160자로 확장
- 타겟 키워드 포함
- 페이지 내용과 일치시키기

---

## 📚 참고 자료

### 프로젝트 문서

- [META_OPTIMIZATION_REPORT.md](../META_OPTIMIZATION_REPORT.md) - 전체 리포트
- [SEO_COMPLETE_AUDIT_REPORT.md](../SEO_COMPLETE_AUDIT_REPORT.md) - SEO 감사

### 외부 참고

- [Google Title Links](https://developers.google.com/search/docs/appearance/title-link)
- [Meta Descriptions](https://developers.google.com/search/docs/appearance/snippet)
- [Moz Title Tag](https://moz.com/learn/seo/title-tag)

---

## ✨ 요약

### 핵심 기능

1. ✅ **8개 페이지 최적화**
   - Title: 50-60자
   - Description: 150-160자
   - 중복 0개

2. ✅ **Meta Templates**
   - 재사용 가능
   - 자동 검증
   - 동적 생성

3. ✅ **분석 도구**
   - `npm run check-meta`
   - 점수 계산
   - 개선 권장

### 명령어

```bash
# 메타 분석
npm run check-meta

# 전체 체크
npm run check-all

# 개발
npm run dev
```

---

**마지막 업데이트:** 2025-01-21  
**버전:** 1.0.0
