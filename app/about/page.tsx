import { Metadata } from 'next';
import { HeroSection } from './_components/hero-section';
import { MissionSection } from './_components/mission-section';
import { TeamSection } from './_components/team-section';
import { ValuesSection } from './_components/values-section';

export const metadata: Metadata = {
  title: 'About Calobite | Our Mission, Vision, and Team',
  description: 'Learn about Calobite, the team dedicated to making nutrition accessible and understandable for everyone. Discover our mission to empower healthier lifestyles through technology.',
  openGraph: {
    title: 'About Calobite | Our Mission, Vision, and Team',
    description: 'Discover the story behind Calobite and our commitment to nutritional transparency.',
    url: 'https://www.calobite.com/about',
    type: 'website',
    images: [
      {
        url: 'https://www.calobite.com/images/about-og-image.jpg',
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
    images: ['https://www.calobite.com/images/about-twitter-image.jpg'],
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
