import { Metadata } from 'next';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BackButton } from './not-found-client';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Calobite',
  description: 'The page you are looking for does not exist. Return to the Calobite homepage or search our nutrition database.',
  robots: {
    index: false,
    follow: true,
  },
};

/**
 * Custom 404 Not Found page with SEO optimization
 * Provides helpful navigation options for users
 */
export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-primary/20">
            404
          </h1>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. 
          The product or page may have been moved or doesn&apos;t exist.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button asChild size="lg">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Go to Homepage
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/search">
              <Search className="mr-2 h-5 w-5" />
              Search Products
            </Link>
          </Button>
        </div>

        {/* Popular Links */}
        <div className="border-t pt-8">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Popular Pages
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/about" 
              className="text-sm text-primary hover:underline"
            >
              About Us
            </Link>
            <Link 
              href="/faq" 
              className="text-sm text-primary hover:underline"
            >
              FAQ
            </Link>
            <Link 
              href="/contact" 
              className="text-sm text-primary hover:underline"
            >
              Contact
            </Link>
            <Link 
              href="/privacy-policy" 
              className="text-sm text-primary hover:underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <BackButton />
        </div>
      </div>
    </div>
  );
}
