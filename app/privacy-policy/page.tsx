import { Metadata } from 'next';
import { PolicyContent } from './_components/policy-content';

export const metadata: Metadata = {
  title: 'Privacy Policy | Calobite',
  description: 'Read the Calobite Privacy Policy to understand how we collect, use, and protect your personal data. Your privacy is important to us.',
  openGraph: {
    title: 'Calobite Privacy Policy',
    description: 'Learn how Calobite handles your data and protects your privacy.',
    url: 'https://www.calobite.com/privacy-policy',
    type: 'article',
    publishedTime: new Date().toISOString(),
    authors: ['Calobite Legal Team'],
  },
  twitter: {
    card: 'summary',
    title: 'Calobite Privacy Policy',
    description: 'Understand our commitment to your privacy.',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-16 md:py-24 max-w-4xl">
      <div className="prose lg:prose-xl dark:prose-invert mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: October 20, 2025</p>
        <PolicyContent />
      </div>
    </div>
  );
}
