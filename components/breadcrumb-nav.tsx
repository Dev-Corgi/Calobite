/**
 * BreadcrumbNav Component
 * 
 * Displays breadcrumb navigation with SEO-optimized Schema.org markup
 * Automatically generates breadcrumbs based on current route
 * 
 * Features:
 * - Responsive design (mobile/desktop)
 * - Schema.org BreadcrumbList JSON-LD
 * - Accessibility (aria-label)
 * - Current page non-clickable
 * 
 * Usage:
 *   <BreadcrumbNav />
 *   <BreadcrumbNav customLabels={{ 'product': 'Products' }} />
 *   <BreadcrumbNav productName="Apple iPhone" />
 */

'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useBreadcrumbs, generateBreadcrumbSchemaFromItems } from '@/hooks/useBreadcrumbs';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/hooks/useBreadcrumbs';

interface BreadcrumbNavProps {
  /**
   * Custom labels for route segments
   */
  customLabels?: Record<string, string>;
  
  /**
   * Custom breadcrumb items (overrides automatic generation)
   */
  customBreadcrumbs?: BreadcrumbItemType[];
  
  /**
   * Show home icon instead of text
   * @default false
   */
  showHomeIcon?: boolean;
  
  /**
   * For product pages: display product name as last breadcrumb
   */
  productName?: string;
  
  /**
   * Additional className for container
   */
  className?: string;
}

export function BreadcrumbNav({
  customLabels,
  customBreadcrumbs,
  showHomeIcon = false,
  productName,
  className,
}: BreadcrumbNavProps) {
  const autoBreadcrumbs = useBreadcrumbs({
    customLabels,
    customBreadcrumbs,
  });
  
  // Replace last breadcrumb label if productName provided
  const breadcrumbs = productName && autoBreadcrumbs.length > 0
    ? [
        ...autoBreadcrumbs.slice(0, -1),
        {
          ...autoBreadcrumbs[autoBreadcrumbs.length - 1],
          label: productName,
        },
      ]
    : autoBreadcrumbs;
  
  // Don't render if no breadcrumbs
  if (breadcrumbs.length === 0) {
    return null;
  }
  
  // Generate Schema.org JSON-LD
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.calobite.com';
  const schema = generateBreadcrumbSchemaFromItems(breadcrumbs, baseUrl);
  
  return (
    <>
      {/* Schema.org BreadcrumbList for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      
      {/* Visual Breadcrumb Navigation */}
      <div className={className}>
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => {
              const isLast = crumb.isCurrent;
              const isHome = crumb.href === '/';
              
              return (
                <div key={crumb.href} className="flex items-center">
                  <BreadcrumbItem>
                    {isLast ? (
                      // Current page - not clickable
                      <BreadcrumbPage>
                        {isHome && showHomeIcon ? (
                          <Home className="h-4 w-4" />
                        ) : (
                          // Truncate long labels on mobile
                          <span className="max-w-[120px] sm:max-w-none truncate">
                            {crumb.label}
                          </span>
                        )}
                      </BreadcrumbPage>
                    ) : (
                      // Clickable link
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href}>
                          {isHome && showHomeIcon ? (
                            <Home className="h-4 w-4" />
                          ) : (
                            crumb.label
                          )}
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  
                  {/* Separator (not for last item) */}
                  {!isLast && (
                    <BreadcrumbSeparator>
                      <ChevronRight />
                    </BreadcrumbSeparator>
                  )}
                </div>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  );
}
