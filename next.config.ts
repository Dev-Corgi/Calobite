// project/next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'world.openfoodfacts.org',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['@radix-ui/react-*'],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  reactStrictMode: true,

  // Use 'standalone' for Docker/serverless, or remove for traditional deployment
  // For Vercel, you can remove this line or keep it
  output: 'standalone',
  
  // Optimize static generation
  // Increase timeout for generateStaticParams during build
  staticPageGenerationTimeout: 180, // 3 minutes per page (default is 60)
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: *.unsplash.com https:;
              connect-src 'self' https://world.openfoodfacts.org;
              font-src 'self' fonts.gstatic.com;
              object-src 'none';
              base-uri 'self';
              form-action 'self';
              frame-ancestors 'none';
            `.replace(/\s+/g, ' ').trim()
          }
        ],
      },
    ];
  },
  compress: true,
  generateEtags: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  trailingSlash: false,
};

export default nextConfig;