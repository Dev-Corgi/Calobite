import { Metadata } from 'next';
import { FaqList } from './_components/faq-list';
import { generateFAQSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'FAQ | Common Questions About Calobite Answered',
  description: 'Find answers to frequently asked questions about Calobite. Learn how to use the app, understand data accuracy, and get tips for tracking nutrition effectively.',
  alternates: {
    canonical: 'https://www.calobite.com/faq',
  },
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
    title: 'Calobite FAQ | Get Answers to Your Questions',
    description: 'Explore our FAQ page to find answers about Calobite&apos;s features and data.',
    url: 'https://www.calobite.com/faq',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
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
    images: ['/twitter-card.png'],
  },
};

// FAQ data for schema generation
const faqData = [
  {
    question: 'What is Calobite?',
    answer: 'Calobite is a comprehensive nutrition tracking platform that helps you understand the food you eat. We provide detailed nutritional information for millions of products, allowing you to make smarter, healthier choices.'
  },
  {
    question: 'How accurate is the nutritional data?',
    answer: 'Our data is sourced from official, verified databases like the USDA FoodData Central and the Open Food Facts database. We continuously update our information to ensure the highest level of accuracy.'
  },
  {
    question: 'Can I track my own recipes?',
    answer: 'Yes! Our recipe importer allows you to paste a link to any recipe online, and we will automatically calculate the nutritional information for you. You can also create and save your own custom foods and meals.'
  },
  {
    question: 'Is Calobite free to use?',
    answer: 'Calobite offers a robust free version with access to our entire food database and basic tracking features. We also offer a Premium subscription that unlocks advanced features like meal planning, detailed nutrient analysis, and ad-free browsing.'
  },
  {
    question: 'How do you calculate exercise calorie burn?',
    answer: 'We use the Metabolic Equivalent of Task (MET) formula, which is a standard method for estimating energy expenditure. The calculation takes into account the specific activity, its intensity, and your body weight to provide an accurate estimate.'
  },
];

export default function FaqPage() {
  const faqSchema = generateFAQSchema(faqData);

  return (
    <>
      {/* FAQ Schema for rich snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />
      <div className="container mx-auto py-16 md:py-24">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Frequently Asked Questions</h1>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-2xl mx-auto">
            Have questions? We&apos;ve got answers. If you can&apos;t find what you&apos;re looking for, feel free to contact us.
          </p>
        </header>
        <section>
          <FaqList />
        </section>
      </div>
    </>
  );
}
