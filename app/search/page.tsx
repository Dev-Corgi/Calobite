import { Suspense } from 'react';
import { Metadata } from 'next';
import { Sidebar } from "../_components/sidebar";
import { SearchSection } from "./_components/search-section";
import { SearchPageClient } from './SearchPageClient';

/**
 * Generate metadata for search page (SEO optimization)
 */
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; type?: string }>;
}): Promise<Metadata> {
  const params = await searchParams;
  const query = params.query || '';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calobite.com';
  
  const title = query 
    ? `${query} - Nutrition Search Results | Calobite`
    : 'Search Food Database | Calobite';
  
  const description = query
    ? `Find nutrition information for ${query}. Search our comprehensive food database with calorie counts, macros, and ingredients for millions of products.`
    : 'Search millions of food products for detailed nutrition information, calorie counts, ingredient lists, and allergen data.';

  return {
    title,
    description,
    alternates: {
      canonical: query 
        ? `${baseUrl}/search?query=${encodeURIComponent(query)}`
        : `${baseUrl}/search`,
    },
    openGraph: {
      title,
      description,
      url: query ? `${baseUrl}/search?query=${encodeURIComponent(query)}` : `${baseUrl}/search`,
      images: [`${baseUrl}/og-image-search.png`],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/twitter-card.png`],
    },
  };
}

/**
 * Search page with SSR for better SEO
 */
export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; type?: string }>;
}) {
  const params = await searchParams;
  const query = params.query || '';
  const searchType = params.type;

  return (
    <section className="pt-8">
      <SearchSection query={query} totalHits={0} searchType={searchType} />
      <div className="bg-muted">
        <div className="container mx-auto flex flex-col lg:flex-row gap-12 px-4 py-8 mt-8">
          <Sidebar />
          <div className="flex-1 max-w-5xl">
            <div className="pt-6">
              <Suspense fallback={<div>Loading search results...</div>}>
                <SearchPageClient initialQuery={query} initialType={searchType} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
