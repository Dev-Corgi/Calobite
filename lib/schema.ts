// project/lib/schema.ts
import type { Product } from './types';

/**
 * Generate Organization Schema (Schema.org)
 * For knowledge graph and brand identity
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Calobite Inc.',
    alternateName: 'Calobite',
    url: 'https://www.calobite.com',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.calobite.com/icon.svg',
      width: 512,
      height: 512
    },
    description: 'Smart nutrition tracking platform providing comprehensive food database and nutritional information for millions of products.',
    foundingDate: '2024-01-01',
    foundingLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US'
      }
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-415-555-0199',
      contactType: 'customer service',
      email: 'hello@calobite.com',
      areaServed: 'US',
      availableLanguage: ['English']
    },
    sameAs: [
      'https://twitter.com/calobite',
      'https://facebook.com/calobite',
      'https://instagram.com/calobite'
    ],
    knowsAbout: [
      'Nutrition',
      'Food Database',
      'Calorie Tracking',
      'Nutritional Information',
      'Health Technology'
    ]
  };
}

/**
 * Generate WebSite Schema with SearchAction
 * Enables Google search box in SERP
 */
export function generateWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Calobite',
    url: 'https://www.calobite.com',
    description: 'Discover nutritional information for millions of food products',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.calobite.com/search?query={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  };
}

/**
 * Generate FAQ Schema for rich snippets
 * Enables FAQ accordion in Google search results
 */
export function generateFAQSchema(faqItems: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

/**
 * Generate Product Schema with Nutrition Information
 * Enables product rich results in SERP
 */
export function generateProductSchema(product: Product) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calobite.com';
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.product_name || 'Product',
    brand: product.brands ? {
      '@type': 'Brand',
      name: product.brands
    } : undefined,
    image: product.image_url || `${baseUrl}/icon.svg`,
    description: product.ingredients_text?.slice(0, 200) || `Nutritional information for ${product.product_name}`,
    sku: product.code,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    nutrition: product.nutriments ? {
      '@type': 'NutritionInformation',
      calories: product.nutriments['energy-kcal_100g'] 
        ? `${Math.round(product.nutriments['energy-kcal_100g'])} kcal` 
        : undefined,
      fatContent: product.nutriments.fat_100g 
        ? `${product.nutriments.fat_100g}g` 
        : undefined,
      saturatedFatContent: product.nutriments['saturated-fat_100g']
        ? `${product.nutriments['saturated-fat_100g']}g`
        : undefined,
      carbohydrateContent: product.nutriments.carbohydrates_100g 
        ? `${product.nutriments.carbohydrates_100g}g` 
        : undefined,
      sugarContent: product.nutriments.sugars_100g
        ? `${product.nutriments.sugars_100g}g`
        : undefined,
      proteinContent: product.nutriments.proteins_100g 
        ? `${product.nutriments.proteins_100g}g` 
        : undefined,
      sodiumContent: product.nutriments.sodium_100g
        ? `${product.nutriments.sodium_100g}g`
        : undefined,
    } : undefined
  };
}

/**
 * Generate BreadcrumbList Schema
 * Displays breadcrumb trail in search results
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: item.url
    }))
  };
}

/**
 * Generate Article Schema (for blog posts)
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  authors?: string[];
  url: string;
  imageUrl?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedTime,
    dateModified: article.modifiedTime || article.publishedTime,
    author: article.authors?.map(author => ({
      '@type': 'Person',
      name: author
    })) || [{ '@type': 'Organization', name: 'Calobite Legal Team' }],
    publisher: {
      '@type': 'Organization',
      name: 'Calobite Inc.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.calobite.com/icon.svg'
      }
    },
    image: article.imageUrl || 'https://www.calobite.com/icon.svg',
    url: article.url
  };
}
