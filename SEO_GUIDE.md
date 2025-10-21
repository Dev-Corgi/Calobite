# SEO Implementation Guide

## 🎯 Overview

This Next.js 15 application now includes enterprise-level SEO optimizations:
- ✅ Structured Data (JSON-LD)
- ✅ Google Analytics 4
- ✅ Core Web Vitals Tracking
- ✅ Comprehensive Metadata
- ✅ Mobile-First Optimization
- ✅ PWA Support

---

## 🚀 Quick Start

### 1. Configure Environment Variables (Required)

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add:
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GOOGLE_VERIFICATION=your_verification_code
```

### 2. Create OG Image

Create a social media sharing image:
- Path: `/public/og-image.png`
- Size: 1200x630 pixels
- Include: Calobite branding, tagline

### 3. Deploy

```bash
npm run build
npm start
```

---

## 📚 Schema Library Usage

### Available Schemas

The `lib/schema.ts` library provides:

#### 1. Organization Schema
```typescript
import { generateOrganizationSchema } from '@/lib/schema';

const schema = generateOrganizationSchema();
// Already implemented in app/layout.tsx
```

#### 2. WebSite Schema with SearchAction
```typescript
import { generateWebSiteSchema } from '@/lib/schema';

const schema = generateWebSiteSchema();
// Already implemented in app/layout.tsx
```

#### 3. FAQ Schema
```typescript
import { generateFAQSchema } from '@/lib/schema';

const faqData = [
  { question: 'Question?', answer: 'Answer...' }
];
const schema = generateFAQSchema(faqData);
// Implemented in app/faq/page.tsx
```

#### 4. Product Schema
```typescript
import { generateProductSchema } from '@/lib/schema';

const schema = generateProductSchema(product);
// Implemented in app/product/[code]/page.tsx
```

#### 5. Breadcrumb Schema
```typescript
import { generateBreadcrumbSchema } from '@/lib/schema';

const schema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://...' },
  { name: 'Products', url: 'https://...' }
]);
// Implemented in product pages
```

#### 6. Article Schema
```typescript
import { generateArticleSchema } from '@/lib/schema';

const schema = generateArticleSchema({
  title: 'Article Title',
  description: 'Description...',
  publishedTime: '2025-01-01T00:00:00Z',
  authors: ['Author Name'],
  url: 'https://...'
});
// Implemented in legal pages
```

### Adding Schema to a Page

```typescript
// Example: Adding schema to a new page
import { generateArticleSchema } from '@/lib/schema';

export default function BlogPost() {
  const schema = generateArticleSchema({
    title: 'My Blog Post',
    description: 'Post description',
    publishedTime: new Date().toISOString(),
    url: 'https://calobite.com/blog/my-post'
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema)
        }}
      />
      {/* Your content */}
    </>
  );
}
```

---

## 📊 Analytics Implementation

### Tracking Events

```typescript
import { trackEvent, trackSearch, trackProductView } from '@/lib/analytics';

// Generic event
trackEvent('button_click', 'User Interaction', 'CTA Button');

// Search event
trackSearch('apple juice', 42); // query, resultCount

// Product view
trackProductView('Apple Juice', '1234567890');
```

### Web Vitals

Web Vitals are automatically tracked via `app/web-vitals.tsx`:
- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **INP** (Interaction to Next Paint)

View in Google Analytics:
1. Navigate to Events
2. Filter by "Web Vitals" category
3. Monitor LCP, FID, CLS values

---

## 🖼️ Image Optimization

### Using OptimizedImage Component

```typescript
import { OptimizedImage } from '@/components/optimized-image';

// Fixed size
<OptimizedImage
  src="/image.jpg"
  alt="Descriptive alt text"
  width={400}
  height={300}
  priority={false} // true for above-fold images
/>

// Fill container
<div className="relative w-full h-64">
  <OptimizedImage
    src="/image.jpg"
    alt="Descriptive alt text"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
  />
</div>
```

### Alt Text Best Practices

✅ **Good Alt Text:**
- "Calobite nutrition dashboard showing calorie tracking"
- "Apple juice nutrition facts - 120 calories per serving"

❌ **Bad Alt Text:**
- "image"
- "img_001.jpg"
- Empty string

---

## 🔍 Metadata Best Practices

### Page-Level Metadata

```typescript
// app/my-page/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Title',
  description: 'Clear description 150-160 chars',
  openGraph: {
    title: 'OG Title',
    description: 'OG Description',
    images: ['/og-image.png'],
  },
};
```

### Dynamic Metadata

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await fetchData(params.id);
  
  return {
    title: `${data.name} | Calobite`,
    description: data.description.slice(0, 160),
  };
}
```

---

## ✅ Testing Your SEO

### 1. Structured Data Testing

**Google Rich Results Test:**
```
https://search.google.com/test/rich-results
```

Test these pages:
- Homepage (Organization, WebSite schema)
- `/faq` (FAQ schema)
- `/product/[code]` (Product, Breadcrumb schema)

### 2. PageSpeed Insights

```
https://pagespeed.web.dev/
```

Target scores:
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 95+

### 3. Mobile-Friendly Test

```
https://search.google.com/test/mobile-friendly
```

Should pass all checks with viewport configuration.

### 4. Google Analytics Real-Time

After deployment:
1. Open Google Analytics
2. Go to Reports → Realtime
3. Visit your site
4. Verify events are tracking

---

## 📈 Monitoring & Maintenance

### Weekly Checks

- [ ] Google Analytics traffic trends
- [ ] Search Console coverage errors
- [ ] Core Web Vitals status

### Monthly Tasks

- [ ] Update FAQ schema with new questions
- [ ] Review and optimize slow pages
- [ ] Check for 404 errors in Search Console
- [ ] Add new products to sitemap

### Quarterly Reviews

- [ ] Full Lighthouse audit
- [ ] Competitor SEO analysis
- [ ] Keyword ranking review
- [ ] Content gap identification

---

## 🛠️ Troubleshooting

### Analytics Not Tracking

1. Check `.env.local` has `NEXT_PUBLIC_GA_ID`
2. Verify GA_ID format: `G-XXXXXXXXXX`
3. Check browser console for errors
4. Use GA Debugger extension

### Schema Not Validating

1. Use Rich Results Test
2. Check JSON syntax errors
3. Verify required fields present
4. Review schema.org documentation

### Images Not Optimizing

1. Check Next.js Image component usage
2. Verify `next.config.ts` image config
3. Check remote image domains
4. Review image file sizes

### Mobile Issues

1. Verify viewport export in layout.tsx
2. Test on actual devices
3. Use Chrome DevTools device emulation
4. Check responsive breakpoints

---

## 📚 Additional Resources

- [Next.js Metadata Docs](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Schema.org Types](https://schema.org/docs/schemas.html)
- [Google Search Central](https://developers.google.com/search/docs)
- [Web Vitals Guide](https://web.dev/vitals/)
- [GA4 Documentation](https://support.google.com/analytics/answer/9304153)

---

## 🎉 Success Metrics

After 90 days, you should see:

### Traffic
- Organic traffic: +30-50%
- Mobile traffic: +40-60%
- Direct traffic: +15-25%

### SERP Features
- FAQ snippets: 5-10 questions
- Product rich results: 100+ products
- Breadcrumb trails: All pages
- Sitelinks: 6+ deep links

### Technical
- Lighthouse SEO: 95+
- Mobile score: 90+
- Core Web Vitals: All green

### Rankings
- Brand queries: Top 3
- Product queries: First page
- Info queries: Featured snippets

---

## 💡 Tips for Maximum SEO Impact

1. **Content Quality**
   - Write unique product descriptions
   - Add nutritional insights
   - Create helpful blog content

2. **Internal Linking**
   - Link related products
   - Create category pages
   - Add "Popular in [Brand]" sections

3. **Performance**
   - Optimize images before upload
   - Use static generation where possible
   - Monitor Core Web Vitals

4. **User Experience**
   - Fast page loads
   - Clear navigation
   - Mobile-friendly design

5. **Regular Updates**
   - Fresh content signals
   - Update old pages
   - Fix broken links

---

## 🚨 Important Notes

- Schema changes may take 2-4 weeks to appear in search results
- Analytics data has 24-48 hour delay
- Core Web Vitals measured over 28 days
- Rankings improve gradually over 60-90 days

---

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review SEO_IMPLEMENTATION_SUMMARY.md
3. Check Next.js documentation
4. Review Google Search Central

Remember: SEO is a marathon, not a sprint. Consistent implementation and monitoring will yield the best results.
