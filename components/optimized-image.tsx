import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Optimized Image Component
 * Wrapper around Next.js Image with SEO best practices
 * - Automatic lazy loading (unless priority)
 * - Proper alt text requirement
 * - Responsive sizes
 * - AVIF/WebP format optimization
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  priority = false,
  className,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}: OptimizedImageProps) {
  // Don't render if no src or alt
  if (!src || !alt) {
    console.warn('OptimizedImage: Missing src or alt attribute');
    return null;
  }

  const imageProps = {
    src,
    alt,
    priority,
    loading: priority ? undefined : ('lazy' as const),
    className,
    sizes
  };

  if (fill) {
    return <Image {...imageProps} fill alt={alt} />;
  }

  if (!width || !height) {
    console.warn('OptimizedImage: width and height required when fill is false');
    return null;
  }

  return <Image {...imageProps} width={width} height={height} alt={alt} />;
}
