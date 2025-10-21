# SEO Setup Checklist

## ⚡ 5-Minute Quick Start

### Step 1: Environment Variables (2 min)
```bash
cp .env.example .env.local
```

Edit `.env.local`:
- [ ] Set `NEXT_PUBLIC_BASE_URL` to your domain
- [ ] Add `NEXT_PUBLIC_GA_ID` (skip for now if not ready)
- [ ] Add `NEXT_PUBLIC_GOOGLE_VERIFICATION` (skip for now)

### Step 2: Build & Test (3 min)
```bash
npm install
npm run build
npm run dev
```

Visit http://localhost:3000 and verify:
- [ ] Homepage loads without errors
- [ ] Console shows no TypeScript errors
- [ ] Pages render correctly

---

## 📊 Google Analytics Setup (10 min)

### Create GA4 Property
1. [ ] Go to https://analytics.google.com/
2. [ ] Click "Admin" → "Create Property"
3. [ ] Name: "Calobite"
4. [ ] Enable "Enhanced measurement"
5. [ ] Copy Measurement ID (G-XXXXXXXXXX)

### Add to Application
1. [ ] Open `.env.local`
2. [ ] Add: `NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX`
3. [ ] Restart dev server
4. [ ] Visit site and check GA Real-time reports

---

## 🔍 Google Search Console Setup (10 min)

### Add Property
1. [ ] Go to https://search.google.com/search-console
2. [ ] Click "Add Property"
3. [ ] Enter your domain
4. [ ] Choose "HTML tag" verification method
5. [ ] Copy verification code

### Configure Application
1. [ ] Open `.env.local`
2. [ ] Add: `NEXT_PUBLIC_GOOGLE_VERIFICATION=your_code`
3. [ ] Deploy to production
4. [ ] Click "Verify" in Search Console

### Submit Sitemap
1. [ ] In Search Console, go to "Sitemaps"
2. [ ] Enter: `https://yourdomain.com/sitemap.xml`
3. [ ] Click "Submit"

---

## 🖼️ Create OG Image (15 min)

### Requirements
- Size: 1200x630 pixels
- Format: PNG or JPG
- File: `public/og-image.png`

### Content Should Include
- [ ] Calobite logo
- [ ] Tagline: "Smart Nutrition Tracker"
- [ ] Background: Clean, branded
- [ ] Text: Readable at thumbnail size

### Quick Tools
- [Canva](https://canva.com) - Free template
- [Figma](https://figma.com) - Design from scratch
- [Pablo](https://pablo.buffer.com) - Quick creation

---

## ✅ Verify Implementation (15 min)

### 1. Test Structured Data
Visit: https://search.google.com/test/rich-results

Test URLs:
- [ ] Homepage → Should show Organization + WebSite schema
- [ ] /faq → Should show FAQ schema
- [ ] /product/[any-code] → Should show Product + Breadcrumb schema

### 2. Test Mobile Friendliness
Visit: https://search.google.com/test/mobile-friendly

- [ ] Enter your homepage URL
- [ ] Verify "Page is mobile friendly"

### 3. PageSpeed Insights
Visit: https://pagespeed.web.dev/

Test your site:
- [ ] Mobile score: Target 90+
- [ ] Desktop score: Target 95+
- [ ] Core Web Vitals: All green

### 4. Test Analytics
1. [ ] Open your site
2. [ ] Open Google Analytics
3. [ ] Go to Reports → Realtime
4. [ ] Verify you see your visit

---

## 📱 PWA Setup (Optional - 5 min)

### Already Configured
- [x] manifest.webmanifest created
- [x] Icons configured
- [x] Theme colors set

### To Enable Full PWA
1. [ ] Create service worker (optional)
2. [ ] Add offline functionality (optional)
3. [ ] Test install prompt on mobile

---

## 🎯 Post-Launch Checklist (Week 1)

### Day 1
- [ ] Verify GA4 is tracking
- [ ] Check Search Console for errors
- [ ] Test all schema validations

### Day 3
- [ ] Review initial analytics data
- [ ] Check Core Web Vitals
- [ ] Fix any console errors

### Day 7
- [ ] Review first week's traffic
- [ ] Identify slow pages
- [ ] Plan content improvements

---

## 🚀 Optimization Priorities

### High Priority (Do First)
1. [ ] Configure environment variables
2. [ ] Set up Google Analytics
3. [ ] Create OG image
4. [ ] Deploy to production
5. [ ] Submit sitemap to Search Console

### Medium Priority (This Month)
1. [ ] Optimize product images
2. [ ] Add more FAQ items
3. [ ] Create blog content
4. [ ] Build internal linking
5. [ ] Add related products

### Low Priority (Next Quarter)
1. [ ] Implement service worker
2. [ ] Add video content
3. [ ] Create nutrition guides
4. [ ] Build email capture
5. [ ] Add social proof

---

## 📊 KPI Tracking

### Week 1
- [ ] Baseline traffic established
- [ ] No critical errors
- [ ] Analytics working

### Month 1
- [ ] Traffic trend: Aim for +10%
- [ ] Core Web Vitals: All green
- [ ] Schema: No validation errors

### Month 3
- [ ] Traffic: +30% from baseline
- [ ] Rankings: First page for brand terms
- [ ] SERP features: 5+ FAQ snippets

---

## 🛑 Common Issues

### "Analytics not tracking"
**Solution:**
1. Check `.env.local` has GA_ID
2. Restart dev server
3. Clear browser cache
4. Wait 24 hours for data

### "Schema not validating"
**Solution:**
1. Use Rich Results Test
2. Check JSON syntax
3. Verify all required fields
4. Review console errors

### "Slow page loads"
**Solution:**
1. Check image sizes
2. Enable Next.js Image optimization
3. Review bundle size
4. Check database queries

### "Mobile not responsive"
**Solution:**
1. Verify viewport in layout.tsx
2. Test on real devices
3. Use Chrome DevTools
4. Check CSS breakpoints

---

## 📞 Quick Reference

### Important Files
- **Schema**: `lib/schema.ts`
- **Analytics**: `lib/analytics.ts`
- **Web Vitals**: `app/web-vitals.tsx`
- **Metadata**: `app/layout.tsx`
- **Environment**: `.env.local`

### Key Commands
```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Check brands
npm run check-brands
```

### Testing URLs
- Rich Results: https://search.google.com/test/rich-results
- Mobile-Friendly: https://search.google.com/test/mobile-friendly
- PageSpeed: https://pagespeed.web.dev/
- GA4: https://analytics.google.com/

---

## ✨ Success Indicators

You'll know it's working when:
- ✅ GA4 shows real-time visitors
- ✅ Search Console accepts sitemap
- ✅ Rich Results Test passes
- ✅ No console errors
- ✅ Mobile-friendly test passes
- ✅ Core Web Vitals are green

---

## 🎉 You're Ready!

Once you complete the Quick Start + Analytics Setup, your SEO implementation is live!

**Next:** Monitor weekly, optimize monthly, and watch your traffic grow. 📈
