import { FoodSearchForm } from "@/app/_components/food-search-form";

interface SearchSectionProps {
  query?: string;
  totalHits?: number;
  searchType?: string;
}

export function SearchSection({ query, totalHits, searchType }: SearchSectionProps) {
  return (
    <section className="w-full">
      <div className="w-full max-w-4xl mx-auto px-4 lg:px-0">
        <div className="space-y-2 pb-6">
          <p className="text-sm text-muted-foreground">{`${searchType !== 'brand' ? `Food Search` : `Brand Search`}`} &gt; {query || ''}</p>
          <h1 className="text-3xl font-bold">
            {`${searchType !== 'brand' ? `Food search` : `Brand search`} results for '${query || ''}'`}{" "}
            {totalHits !== undefined && (
              <span className="text-primary">{totalHits.toLocaleString()}</span>
            )}
            
          </h1>
        </div>
          <FoodSearchForm defaultValue={query} showPopularSearches={true} defaultMode={searchType !== "brand" ? "integrated" : "brand"}/>
      </div>
    </section>
  );
}
