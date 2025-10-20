import { Metadata } from 'next';
import { FaqList } from './_components/faq-list';

export const metadata: Metadata = {
  title: 'FAQ | Calobite - Answers to Your Nutrition Questions',
  description: 'Find answers to frequently asked questions about Calobite, including how to use the app, data accuracy, and subscription details. Get the information you need to start your health journey.',
  openGraph: {
    title: 'Calobite FAQ | Get Answers to Your Questions',
    description: 'Explore our FAQ page to find answers about Calobite&apos;s features and data.',
    url: 'https://www.calobite.com/faq',
    type: 'website',
    images: [
      {
        url: 'https://www.calobite.com/images/faq-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Calobite Frequently Asked Questions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Calobite FAQ | Answers to Common Questions',
    description: 'Find the information you need on our comprehensive FAQ page.',
    images: ['https://www.calobite.com/images/faq-twitter-image.jpg'],
  },
};

export default function FaqPage() {
  return (
    <div className="container mx-auto py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Frequently Asked Questions</h1>
        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
          Have questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for, feel free to contact us.
        </p>
      </div>
      <FaqList />
    </div>
  );
}
