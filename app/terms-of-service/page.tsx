import { Metadata } from 'next';
import { TermsContent } from './_components/terms-content';

export const metadata: Metadata = {
  title: 'Terms of Service | Calobite',
  description: 'Please read our Terms of Service carefully before using the Calobite application. This document governs your use of our service.',
  openGraph: {
    title: 'Calobite Terms of Service',
    description: 'Review the terms and conditions for using the Calobite platform.',
    url: 'https://www.calobite.com/terms-of-service',
    type: 'article',
    publishedTime: new Date().toISOString(),
    authors: ['Calobite Legal Team'],
  },
  twitter: {
    card: 'summary',
    title: 'Calobite Terms of Service',
    description: 'Understand the rules and guidelines for using our service.',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto py-16 md:py-24 max-w-4xl">
      <div className="prose lg:prose-xl dark:prose-invert mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Terms of Service</h1>
        <p className="text-muted-foreground">Last updated: October 20, 2025</p>
        <TermsContent />
      </div>
    </div>
  );
}
