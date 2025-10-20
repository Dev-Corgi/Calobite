"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

interface FoodSearchFormProps {
  defaultValue?: string;
  defaultMode?: string;
  placeholder?: string;
  showPopularSearches?: boolean;
}

const popularSearches = ["Mixed Grain Rice", "Apple", "Cabbage", "Brown Rice", "Kimchi"];

export function FoodSearchForm({
  defaultValue = "",
  defaultMode = "integrated",
  placeholder = "Search by food name, brand name",
  showPopularSearches = true,
}: FoodSearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);
  const [searchMode, setSearchMode] = useState(defaultMode);
  const [visibleBadgeCount, setVisibleBadgeCount] = useState(popularSearches.length);
  const containerRef = useRef<HTMLDivElement>(null);
  const popularSearchesRef = useRef<HTMLDivElement>(null);
  const badgeContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateVisibleBadges = () => {
      if (containerRef.current && popularSearchesRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const popularSearchesWidth = popularSearchesRef.current.offsetWidth;
        const availableWidth = containerWidth - popularSearchesWidth - 32; // 32 for gap
        const gap = 16; // gap-4
        let totalWidth = 0;
        let count = 0;

        // Use badgeContainerRef directly instead of nextSibling
        const badgeElements = Array.from(badgeContainerRef.current?.children || []);

        for (const badge of badgeElements) {
          const badgeWidth = (badge as HTMLElement).offsetWidth;
          if (totalWidth + badgeWidth + gap < availableWidth) {
            totalWidth += badgeWidth + gap;
            count++;
          } else {
            break;
          }
        }
        setVisibleBadgeCount(count);
      }
    };

    const observer = new ResizeObserver(() => {
      calculateVisibleBadges();
    });

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    calculateVisibleBadges();

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      const encodedQuery = encodeURIComponent(query.trim());
      if (searchMode === "brand") {
        router.push(`/search?type=brand&query=${encodedQuery}`);
      } else {
        router.push(`/search?query=${encodedQuery}`);
      }
    }
  };

  const handlePopularSearch = (term: string) => {
    setQuery(term);
    router.push(`/search?query=${encodeURIComponent(term)}`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 ">
          <Select value={searchMode} onValueChange={setSearchMode}>
            <SelectTrigger className="w-[120px] border-none bg-transparent focus:ring-0 text-muted-foreground shadow-none">
              <SelectValue placeholder="Search Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="integrated">Integrated Search</SelectItem>
              <SelectItem value="brand">Brand Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="h-16 w-full rounded-full pl-40 pr-20 text-center font-normal"
          style={{ fontSize: "1.25rem" }}
        />
        <Button
          type="submit"
          size="icon"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-primary">
          <Search className="h-6 w-6 text-primary-foreground" />
          <span className="sr-only">Search</span>
        </Button>
      </form>
      {showPopularSearches && (
        <div ref={containerRef} className="flex items-center justify-center flex-wrap gap-6 mt-6 text-base text-muted-foreground">
          <span ref={popularSearchesRef} className="font-semibold whitespace-nowrap">Popular Searches</span>
          <div ref={badgeContainerRef} className="flex items-center gap-4">
          {popularSearches.slice(0, visibleBadgeCount).map((term) => (
            <Badge
              key={term}
              variant="secondary"
              onClick={() => handlePopularSearch(term)}
              className="cursor-pointer hover:bg-muted rounded-full px-4 py-2 text-base font-normal">
              {term}
            </Badge>
          ))}
          </div>
          <span>(as of 10/16)</span>
        </div>
      )}
    </div>
  );
}
