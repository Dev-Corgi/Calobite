# 🔒 Security & HTTPS Configuration Guide

Calobite 프로젝트의 보안 설정 가이드입니다.

---

## 🎯 개요

프로덕션 수준의 보안 헤더와 HTTPS 설정이 완료되었습니다.

**구현된 기능:**
- ✅ 7개 주요 보안 헤더
- ✅ HTTPS 자동 리다이렉트
- ✅ Content Security Policy (CSP)
- ✅ Mixed content 방지
- ✅ 자동 보안 감사 스크립트

**예상 등급:**
- SecurityHeaders.com: A+
- SSL Labs: A / A+

---

## 📁 파일 구조

```
project/
├── next.config.ts          # Security headers 설정
├── middleware.ts           # HTTPS redirect
└── scripts/
    └── check-security.ts   # Security audit script
```

---

## 🚀 빠른 시작

### 1. 로컬 테스트

```bash
# 개발 서버 실행
npm run dev

# 보안 체크
npm run check-security
```

### 2. 배포

```bash
# 빌드
npm run build

# 배포 (Vercel)
vercel deploy --prod

# 배포 후 체크
NEXT_PUBLIC_BASE_URL=https://www.calobite.com npm run check-security
```

---

## 🛡️ 보안 헤더

### 1. Strict-Transport-Security (HSTS)

```
max-age=63072000; includeSubDomains; preload
```

**설정 위치:** `next.config.ts`

**효과:**
- HTTPS 강제 사용
- 중간자 공격 방지
- 2년 동안 유효
- 모든 서브도메인 포함

### 2. X-Content-Type-Options

```
nosniff
```

**효과:**
- MIME 스니핑 공격 방지
- 선언된 Content-Type만 사용

### 3. X-Frame-Options

```
DENY
```

**효과:**
- Clickjacking 공격 방지
- iframe 삽입 차단

### 4. X-XSS-Protection

```
1; mode=block
```

**효과:**
- XSS 공격 감지 시 차단
- 레거시 브라우저 지원

### 5. Referrer-Policy

```
strict-origin-when-cross-origin
```

**효과:**
- Referrer 정보 제어
- 민감한 URL 유출 방지

### 6. Permissions-Policy

```
camera=(), microphone=(), geolocation=(), interest-cohort=()
```

**효과:**
- 불필요한 브라우저 기능 차단
- 개인정보 보호

### 7. Content-Security-Policy

```csp
default-src 'self';
script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
img-src 'self' data: blob: https://images.unsplash.com https://world.openfoodfacts.org;
connect-src 'self' https://world.openfoodfacts.org https://*.supabase.co;
font-src 'self' data: https://fonts.gstatic.com;
upgrade-insecure-requests;
```

**효과:**
- XSS 공격 차단
- 신뢰할 수 있는 소스만 허용
- HTTP→HTTPS 자동 업그레이드

---

## 🔄 HTTPS Redirect

### Middleware 구현

**파일:** `middleware.ts`

```typescript
export function middleware(request: NextRequest) {
  // Force HTTPS in production
  if (process.env.NODE_ENV === 'production') {
    const protocol = request.headers.get('x-forwarded-proto');
    
    if (protocol === 'http') {
      const url = request.nextUrl.clone();
      url.protocol = 'https:';
      return NextResponse.redirect(url, 301);
    }
  }
  
  return NextResponse.next();
}
```

**작동:**
- 프로덕션에서만 활성화
- HTTP 요청 → HTTPS 301 Redirect
- SEO 안전 (영구 리다이렉트)

---

## 🧪 보안 테스트

### 자동 테스트

```bash
npm run check-security
```

**체크 항목:**
- ✅ HTTPS 사용 여부
- ✅ 7개 보안 헤더
- ✅ Mixed content
- ✅ 보안 점수 계산

### 외부 도구

**1. SecurityHeaders.com**
```
https://securityheaders.com/?q=https://www.calobite.com
```
- 목표: A+ 등급

**2. SSL Labs**
```
https://www.ssllabs.com/ssltest/analyze.html?d=www.calobite.com
```
- 목표: A 등급

**3. Mozilla Observatory**
```
https://observatory.mozilla.org/analyze/www.calobite.com
```
- 목표: A 등급

---

## 🔧 CSP 설정

### 도메인 추가

새 외부 리소스 사용 시:

```typescript
// next.config.ts
{
  key: 'Content-Security-Policy',
  value: `
    script-src 'self' https://new-domain.com;
    img-src 'self' https://new-cdn.com;
  `
}
```

### CSP Violation 디버깅

**1. 브라우저 콘솔 확인**
```
Refused to load ... because it violates CSP directive
```

**2. 도메인 화이트리스트 추가**

**3. Report-Only 모드로 테스트**
```typescript
{
  key: 'Content-Security-Policy-Report-Only',
  value: '...'
}
```

---

## 🚨 Mixed Content 방지

### 자동 방지

CSP `upgrade-insecure-requests`가 자동으로 HTTP→HTTPS 변환

### 수동 체크

**이미지:**
```tsx
// ❌ Bad
<img src="http://example.com/image.jpg" />

// ✅ Good
<img src="https://example.com/image.jpg" />
```

**API 호출:**
```typescript
// ❌ Bad
fetch('http://api.example.com/data')

// ✅ Good
fetch('https://api.example.com/data')
```

---

## 🔐 추가 권장사항

### HSTS Preload 등록

```
https://hstspreload.org/
```

1. 도메인 입력
2. 요구사항 확인:
   - HTTPS 제공
   - HSTS 헤더 (max-age ≥ 31536000)
   - includeSubDomains
   - preload 디렉티브
3. 제출

**효과:**
- 브라우저 사전 등록
- 첫 방문부터 HTTPS 강제

### Cookie 보안

```typescript
cookies.set('session', value, {
  httpOnly: true,      // JavaScript 접근 차단
  secure: true,        // HTTPS만
  sameSite: 'strict',  // CSRF 방지
});
```

### Subresource Integrity (SRI)

```html
<script
  src="https://cdn.example.com/script.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>
```

**효과:**
- CDN 리소스 무결성 검증
- 변조 방지

---

## 📊 보안 점수

### 점수 체계

```
Required Headers (6개 x 10점): 60점
- HSTS
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection
- CSP
- Referrer-Policy

Optional Headers (1개 x 5점): 5점
- Permissions-Policy

No Mixed Content: 15점

총점: 80점 (100% = A+)
```

### 등급

- A+: 90% 이상 (72+점)
- A: 85-89% (68-71점)
- B+: 80-84% (64-67점)
- B: 75-79% (60-63점)

---

## 🛠️ 트러블슈팅

### Security Headers가 표시되지 않음

**확인:**
```bash
curl -I https://www.calobite.com | grep -i strict
```

**원인:**
- 빌드 필요
- CDN 캐시

**해결:**
```bash
npm run build
# CDN 캐시 클리어 (Vercel은 자동)
```

### CSP Violation

**확인:**
```
F12 > Console 탭
```

**해결:**
1. Violation 메시지에서 차단된 URL 확인
2. `next.config.ts`에 도메인 추가
3. 재배포

### HTTPS Redirect 작동 안 함

**확인:**
```bash
curl -I http://www.calobite.com
# Location: https://www.calobite.com 확인
```

**원인:**
- Middleware 미적용
- 프로덕션 환경 아님

**해결:**
- `NODE_ENV=production` 확인
- `middleware.ts` 존재 확인

---

## 📚 참고 자료

### 프로젝트 문서

- [SECURITY_OPTIMIZATION_REPORT.md](../SECURITY_OPTIMIZATION_REPORT.md) - 전체 리포트
- [SEO_COMPLETE_AUDIT_REPORT.md](../SEO_COMPLETE_AUDIT_REPORT.md) - SEO 감사

### 외부 참고

- [OWASP Secure Headers](https://owasp.org/www-project-secure-headers/)
- [CSP Reference](https://content-security-policy.com/)
- [HSTS Preload](https://hstspreload.org/)

---

## ✨ 요약

### 핵심 기능

1. ✅ **7개 보안 헤더**
   - 업계 표준 모두 구현
   - A+ 등급 달성 가능

2. ✅ **HTTPS 강제**
   - Middleware 자동 리다이렉트
   - HSTS로 브라우저 강제

3. ✅ **CSP 보호**
   - XSS 공격 차단
   - Mixed content 자동 업그레이드

4. ✅ **자동 검증**
   - `npm run check-security`
   - 점수 및 등급 계산

### 명령어

```bash
# 개발
npm run dev
npm run check-security

# 배포
npm run build
vercel deploy --prod

# 전체 체크
npm run check-all
```

---

**마지막 업데이트:** 2025-01-21  
**버전:** 1.0.0
