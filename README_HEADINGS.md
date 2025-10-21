# 📑 Heading Structure Guide

Calobite 프로젝트의 Heading 계층 구조 가이드입니다.

---

## 🎯 개요

모든 페이지의 Heading 구조가 SEO와 접근성 베스트 프랙티스에 맞춰 최적화되었습니다.

**핵심 원칙:**
- H1: 페이지당 정확히 1개
- H2-H6: 논리적 계층 구조
- Semantic HTML 사용
- 키워드 자연스럽게 배치

---

## 📁 파일 구조

```
project/
├── scripts/
│   └── check-headings.ts          # Heading analyzer
└── app/
    └── [각 페이지]/                # Optimized headings
```

---

## 🚀 빠른 시작

### Heading 구조 확인

```bash
npm run check-headings
```

**출력:**
- H1 count (페이지당 1개)
- Heading hierarchy
- 품질 점수
- 개선 권장사항

---

## 📝 Heading 규칙

### H1 Tag

**원칙:**
```
✅ 페이지당 정확히 1개
✅ 타겟 키워드 포함
✅ 20-70자 적정 길이
✅ Title과 유사하지만 동일하지 않게
✅ 의미있는 텍스트
```

**예시:**
```tsx
// ✅ Good
<h1>Track Nutrition for Millions of Foods</h1>

// ❌ Bad - Multiple H1s
<h1>Welcome</h1>
<h1>Main Content</h1>

// ❌ Bad - Too short
<h1>Home</h1>

// ❌ Bad - Just numbers
<h1>404</h1>
```

### H2-H6 Hierarchy

**올바른 순서:**
```
H1: 페이지 메인 제목
  └─ H2: 주요 섹션
       └─ H3: 서브 섹션
            └─ H4: 세부 항목
```

**예시:**
```tsx
// ✅ Good
<h1>About Us</h1>
<h2>Mission & Vision</h2>
  <h3>Our Mission</h3>
  <h3>Our Vision</h3>
<h2>Our Team</h2>
  <h3>John Doe</h3>
  <h3>Jane Smith</h3>

// ❌ Bad - Skipped level
<h1>About Us</h1>
<h3>Mission</h3>  // Missing H2!

// ❌ Bad - Wrong order
<h1>About Us</h1>
<h3>Details</h3>
<h2>Overview</h2>  // H2 after H3!
```

---

## 🏗️ Semantic HTML

### Tags to Use

**`<header>`** - 페이지/섹션 헤더
```tsx
<header className="text-center mb-16">
  <h1>Contact Us</h1>
  <p>Description...</p>
</header>
```

**`<section>`** - 주제별 섹션
```tsx
<section>
  <h2>Nutrition Information</h2>
  {/* related content */}
</section>
```

**`<article>`** - 독립적인 콘텐츠
```tsx
<article>
  <h3>Team Member Name</h3>
  <p>Role and bio...</p>
</article>
```

**`<aside>`** - 부수적 콘텐츠
```tsx
<aside>
  <h2>Related Information</h2>
  {/* supplementary content */}
</aside>
```

**`<nav>`** - 내비게이션
```tsx
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    {/* ... */}
  </ul>
</nav>
```

---

## 📊 페이지별 구조

### Homepage

```tsx
<section>
  <h1>Track Nutrition for Millions of Foods</h1>
  <p>Description...</p>
</section>

<section>
  <h2>Frequently Eaten Top 10 Popular Foods</h2>
  {/* food list */}
</section>

<section>
  <h2>Foods by Nutrient</h2>
  {/* nutrient grid */}
</section>
```

### About Page

```tsx
<h1>We're on a Mission to Simplify Nutrition</h1>

<section>
  <h2>Mission & Vision</h2>
  <article>
    <h3>Our Mission</h3>
    {/* content */}
  </article>
  <article>
    <h3>Our Vision</h3>
    {/* content */}
  </article>
</section>

<section>
  <h2>Our Core Values</h2>
  <article>
    <h3>Accuracy</h3>
    {/* content */}
  </article>
  {/* more values */}
</section>

<section>
  <h2>Meet the Team</h2>
  <article>
    <h3>Team Member Name</h3>
    {/* bio */}
  </article>
  {/* more members */}
</section>
```

### Contact Page

```tsx
<header>
  <h1>Contact Us</h1>
  <p>Description...</p>
</header>

<aside>
  <h2>Contact Information</h2>
  {/* contact details */}
</aside>

<section>
  <h2>Send Us a Message</h2>
  {/* contact form */}
</section>
```

### Product Page

```tsx
<h1>[Product Name]</h1>

<section>
  <h2>Nutrition Information</h2>
  {/* nutrition table */}
</section>

<section>
  <h2>Macronutrient Ratio</h2>
  {/* chart */}
</section>

<section>
  <h2>Exercise Equivalent</h2>
  {/* exercise info */}
</section>
```

---

## 🧪 테스트

### 로컬 테스트

```bash
# 개발 서버
npm run dev

# Heading 분석
npm run check-headings
```

### Screaming Frog

1. URL: `http://localhost:3000`
2. Start crawl
3. **H1 탭** 확인:
   - Duplicate: 0
   - Multiple: 0
   - Missing: 0
4. **H2 탭** 확인:
   - 적절한 섹션 구분

### HTML Validator

```
https://validator.w3.org/
```
- Semantic HTML 검증
- Accessibility 확인

---

## 💡 Best Practices

### DO ✅

- H1 페이지당 1개만
- 논리적 계층 순서
- Semantic HTML 사용
- 키워드 자연스럽게
- 의미있는 텍스트

### DON'T ❌

- Multiple H1s
- 레벨 건너뛰기
- 스타일을 위한 heading
- 빈 heading
- 숫자만 사용

---

## 🔧 트러블슈팅

### Multiple H1s 발견

**문제:**
```tsx
<h1>Welcome</h1>
<h1>Main Content</h1>  // ❌
```

**해결:**
```tsx
<h1>Welcome</h1>
<h2>Main Content</h2>  // ✅
```

### Skipped Heading Level

**문제:**
```tsx
<h1>Page Title</h1>
<h3>Section</h3>  // ❌ Missing H2
```

**해결:**
```tsx
<h1>Page Title</h1>
<h2>Main Section</h2>  // ✅
  <h3>Subsection</h3>
```

### H1 이 숫자만

**문제:**
```tsx
// 404 page
<h1>404</h1>  // ❌ 접근성 나쁨
```

**해결:**
```tsx
<h1>Page Not Found</h1>  // ✅
<p aria-hidden="true">404</p>  // 시각 효과
```

---

## 📚 참고 자료

### 프로젝트 문서

- [HEADING_OPTIMIZATION_REPORT.md](../HEADING_OPTIMIZATION_REPORT.md) - 전체 리포트
- [SEO_COMPLETE_AUDIT_REPORT.md](../SEO_COMPLETE_AUDIT_REPORT.md) - SEO 감사

### 외부 참고

- [MDN Headings](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Heading_Elements)
- [W3C HTML5 Sections](https://www.w3.org/TR/html5/sections.html)
- [WebAIM Headings](https://webaim.org/techniques/semanticstructure/#headings)

---

## ✨ 요약

### 핵심 기능

1. ✅ **H1 최적화**
   - 페이지당 1개
   - 타겟 키워드 포함
   - 적정 길이

2. ✅ **논리적 계층**
   - H1 → H2 → H3 순서
   - 레벨 건너뛰기 없음
   - 섹션별 적절한 레벨

3. ✅ **Semantic HTML**
   - header, section, article, aside
   - 접근성 향상
   - SEO 친화적

4. ✅ **분석 도구**
   - `npm run check-headings`
   - 자동 검증
   - 품질 점수

### 명령어

```bash
# Heading 분석
npm run check-headings

# 전체 체크
npm run check-all

# 개발
npm run dev
```

---

**마지막 업데이트:** 2025-01-21  
**버전:** 1.0.0
