// project/lib/image-utils.ts

/**
 * Optimized image configuration utilities for Core Web Vitals
 * Provides helpers for Next.js Image component optimization
 */

export const PLACEHOLDER_FOOD_IMG = '/placeholder-food.png';

// Tiny 10x10 blur placeholder for better perceived performance
export const BLUR_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg==';

export type ImageSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const IMAGE_DIMENSIONS: Record<ImageSize, { width: number; height: number }> = {
  xs: { width: 80, height: 80 },
  sm: { width: 150, height: 150 },
  md: { width: 300, height: 300 },
  lg: { width: 600, height: 600 },
  xl: { width: 1200, height: 1200 },
};

export interface OptimizedImageProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

/**
 * Get optimized Next.js Image props with fallback and blur placeholder
 * 
 * @param url - Image URL (can be undefined/null for fallback)
 * @param alt - Alt text for accessibility
 * @param size - Predefined size (xs, sm, md, lg, xl)
 * @param priority - Whether to prioritize loading (for above-fold images)
 * @returns Optimized image props ready for Next.js Image component
 * 
 * @example
 * ```tsx
 * import Image from 'next/image';
 * import { getOptimizedImageProps } from '@/lib/image-utils';
 * 
 * const imageProps = getOptimizedImageProps(product.image_url, 'Product photo', 'md');
 * <Image {...imageProps} />
 * ```
 */
export function getOptimizedImageProps(
  url: string | undefined | null,
  alt: string,
  size: ImageSize = 'md',
  priority = false
): OptimizedImageProps {
  const dimensions = IMAGE_DIMENSIONS[size];
  
  return {
    src: url || PLACEHOLDER_FOOD_IMG,
    ...dimensions,
    alt: alt || 'Food product image',
    loading: priority ? 'eager' : 'lazy',
    priority,
    placeholder: 'blur',
    blurDataURL: BLUR_DATA_URL,
  };
}

/**
 * Get product image URL with automatic fallback
 * Validates OpenFoodFacts URLs and provides fallback for invalid/missing images
 * 
 * @param imageUrl - Product image URL from database
 * @returns Valid image URL or placeholder
 */
export function getProductImageUrl(imageUrl: string | undefined | null): string {
  if (!imageUrl) return PLACEHOLDER_FOOD_IMG;
  
  // Check if OpenFoodFacts image URL is valid format
  if (imageUrl.includes('openfoodfacts.org')) {
    return imageUrl;
  }
  
  // For other URLs, validate basic format
  try {
    new URL(imageUrl);
    return imageUrl;
  } catch {
    return PLACEHOLDER_FOOD_IMG;
  }
}

/**
 * Handle image load errors with fallback
 * Use this as onError handler for Image components
 * 
 * @param event - React synthetic event from image error
 * 
 * @example
 * ```tsx
 * <Image 
 *   src={imageUrl} 
 *   alt="Product" 
 *   onError={handleImageError}
 * />
 * ```
 */
export function handleImageError(
  event: React.SyntheticEvent<HTMLImageElement>
): void {
  const img = event.currentTarget;
  if (img.src !== PLACEHOLDER_FOOD_IMG) {
    img.src = PLACEHOLDER_FOOD_IMG;
  }
}

/**
 * Generate responsive srcset for different device sizes
 * Useful for hero images and banners
 * 
 * @param baseUrl - Base image URL
 * @param sizes - Array of widths to generate
 * @returns srcset string for responsive images
 */
export function generateSrcSet(
  baseUrl: string,
  sizes: number[] = [640, 750, 828, 1080, 1200, 1920]
): string {
  return sizes
    .map(size => `${baseUrl}?w=${size} ${size}w`)
    .join(', ');
}

/**
 * Preload critical images for better LCP
 * Call this in layout or page head for above-fold images
 * 
 * @param imageUrl - Image URL to preload
 * @param imageSrcSet - Optional srcset for responsive images
 * @returns Link element props for image preloading
 */
export function getImagePreloadProps(
  imageUrl: string,
  imageSrcSet?: string
): React.LinkHTMLAttributes<HTMLLinkElement> {
  return {
    rel: 'preload',
    as: 'image',
    href: imageUrl,
    ...(imageSrcSet && { imageSrcSet }),
  };
}
