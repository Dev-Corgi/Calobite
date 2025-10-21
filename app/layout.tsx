import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { MainNav } from "@/components/main-nav";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { WebVitals } from './web-vitals';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/schema';
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

// Viewport configuration for mobile-first indexing
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
}

// Comprehensive metadata for SEO
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calobite.com'),
  title: {
    default: 'Calobite - Smart Nutrition Tracker & Food Database',
    template: '%s | Calobite'
  },
  description: 'Discover nutritional information for millions of food products. Track calories, macros, and make healthier choices with Calobite\'s comprehensive nutrition database.',
  keywords: [
    'nutrition tracker',
    'calorie counter',
    'food database',
    'nutrition facts',
    'macro tracking',
    'nutritional information',
    'food nutrition',
    'calorie tracking',
    'healthy eating',
    'diet tracker'
  ],
  authors: [{ name: 'Calobite Inc.' }],
  creator: 'Calobite',
  publisher: 'Calobite Inc.',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.calobite.com',
    siteName: 'Calobite',
    title: 'Calobite - Smart Nutrition Tracker & Food Database',
    description: 'Track nutrition for millions of food products. Comprehensive calorie and macro information.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Calobite Nutrition Platform',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@calobite',
    creator: '@calobite',
    title: 'Calobite - Smart Nutrition Tracker',
    description: 'Track nutrition for millions of food products',
    images: ['/og-image.png'],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
  alternates: {
    canonical: 'https://www.calobite.com',
  },
  category: 'health',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const orgSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en">
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://world.openfoodfacts.org" />
        <link rel="dns-prefetch" href="https://world.openfoodfacts.org" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Organization Schema for Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(orgSchema)
          }}
        />
        {/* WebSite Schema with Search Action */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
      </head>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <MainNav />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </div>
        {/* Google Analytics 4 */}
        {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        {/* Web Vitals Tracking */}
        <WebVitals />
      </body>
    </html>
  )
}