import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

interface FoodListItemProps {
  code?: string;
  name?: string;
  brands?: string;
  calories?: string;
  highlightName?: boolean;
  loading?: boolean;
}

export function FoodListItem({
  code,
  name,
  brands,
  calories,
  highlightName,
  loading,
}: FoodListItemProps) {
  if (loading) {
    return (
      <Card className="p-6 rounded-3xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <Skeleton className="h-5 w-32 md:w-48" />
              <Skeleton className="h-4 w-24 md:w-32 mt-2" />
            </div>
          </div>
          <Skeleton className="h-7 w-20" />
        </div>
      </Card>
    );
  }

  if (!code || !name || !brands || !calories) {
    return null; // or some fallback UI
  }

  return (
    <Card className="p-6 rounded-3xl hover:border-primary transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="flex-1">
            <Link href={`/product/${code}`} className="block">
              <p
                className={
                  highlightName ? "font-bold" : "font-semibold text-lg"
                }>
                {name}
              </p>
            </Link>
            <Link
              href={`/search?type=brand&query=${encodeURIComponent(brands)}`}
              className="text-sm text-muted-foreground hover:text-primary transition-colors inline-block"
            >
              {brands}
            </Link>
          </div>
        </div>
        <Link href={`/product/${code}`} className="font-bold text-lg whitespace-nowrap">
          {calories}
        </Link>
      </div>
    </Card>
  );
}
