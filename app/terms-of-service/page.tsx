import { Metadata } from 'next';
import { TermsContent } from './_components/terms-content';
import { generateArticleSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'Terms of Service | Calobite User Agreement & Guidelines',
  description: 'Review Calobite\'s Terms of Service before using our platform. Understand your rights, responsibilities, and our commitment to providing quality nutrition data.',
  alternates: {
    canonical: 'https://www.calobite.com/terms-of-service',
  },
  openGraph: {
    title: 'Calobite Terms of Service',
    description: 'Review the terms and conditions for using the Calobite platform.',
    url: 'https://www.calobite.com/terms-of-service',
    type: 'article',
    publishedTime: '2024-12-01T00:00:00Z',
    modifiedTime: '2025-10-20T00:00:00Z',
    authors: ['Calobite Legal Team'],
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary',
    title: 'Calobite Terms of Service',
    description: 'Understand the rules and guidelines for using our service.',
    images: ['/twitter-card.png'],
  },
};

export default function TermsOfServicePage() {
  const articleSchema = generateArticleSchema({
    title: 'Terms of Service | Calobite',
    description: 'Please read our Terms of Service carefully before using the Calobite application.',
    publishedTime: '2025-10-20T00:00:00Z',
    modifiedTime: '2025-10-20T00:00:00Z',
    authors: ['Calobite Legal Team'],
    url: 'https://www.calobite.com/terms-of-service',
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: October 20, 2025</p>
          <TermsContent />
        </div>
      </div>
    </>
  );
}
