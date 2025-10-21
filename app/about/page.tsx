import { Metadata } from 'next';
import { HeroSection } from './_components/hero-section';
import { MissionSection } from './_components/mission-section';
import { TeamSection } from './_components/team-section';
import { ValuesSection } from './_components/values-section';

export const metadata: Metadata = {
  title: 'About Calobite | Mission to Make Nutrition Accessible',
  description: 'Learn about Calobite\'s mission to simplify nutrition tracking. Meet our team dedicated to providing accurate food data and empowering healthier choices worldwide.',
  alternates: {
    canonical: 'https://www.calobite.com/about',
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
    title: 'About Calobite | Our Mission, Vision, and Team',
    description: 'Discover the story behind Calobite and our commitment to nutritional transparency.',
    url: 'https://www.calobite.com/about',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Calobite Team and Mission Statement',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Calobite | Our Mission, Vision, and Team',
    description: 'Learn about the people and principles driving Calobite forward.',
    images: ['/twitter-card.png'],
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-20 md:space-y-32">
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <TeamSection />
    </div>
  );
}
