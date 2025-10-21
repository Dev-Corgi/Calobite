import { Metadata } from 'next';
import { PolicyContent } from './_components/policy-content';
import { generateArticleSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Privacy Policy | How Calobite Protects Your Data',
  description: 'Read Calobite\'s Privacy Policy to understand how we collect, use, and protect your personal information. Your privacy matters. GDPR compliant and transparent.',
  alternates: {
    canonical: 'https://www.calobite.com/privacy-policy',
  },
  openGraph: {
    title: 'Calobite Privacy Policy',
    description: 'Learn how Calobite handles your data and protects your privacy.',
    url: 'https://www.calobite.com/privacy-policy',
    type: 'article',
    publishedTime: '2024-12-01T00:00:00Z',
    modifiedTime: '2025-10-20T00:00:00Z',
    authors: ['Calobite Legal Team'],
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary',
    title: 'Calobite Privacy Policy',
    description: 'Understand our commitment to your privacy.',
    images: ['/twitter-card.png'],
  },
};

export default function PrivacyPolicyPage() {
  const articleSchema = generateArticleSchema({
    title: 'Privacy Policy | Calobite',
    description: 'Read the Calobite Privacy Policy to understand how we collect, use, and protect your personal data.',
    publishedTime: '2025-10-20T00:00:00Z',
    modifiedTime: '2025-10-20T00:00:00Z',
    authors: ['Calobite Legal Team'],
    url: 'https://www.calobite.com/privacy-policy',
  });

  return (
    <>
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema)
        }}
      />
      <div className="container mx-auto py-16 md:py-24 max-w-4xl">
        <div className="prose lg:prose-xl dark:prose-invert mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: October 20, 2025</p>
          <PolicyContent />
        </div>
      </div>
    </>
  );
}
