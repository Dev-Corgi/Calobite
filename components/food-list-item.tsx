import { Card } from "@/components/ui/card";
import Link from "next/link";

interface FoodListItemProps {
  code: string;
  name: string;
  brands: string;
  calories: string;
  highlightName?: boolean;
}

export function FoodListItem({
  code,
  name,
  brands,
  calories,
  highlightName,
}: FoodListItemProps) {
  return (
    <Card className="p-6 rounded-3xl hover:border-primary transition-colors">
      <Link href={`/product/${code}`} className="block">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p
                className={
                  highlightName ? "font-bold" : "font-semibold text-lg"
                }>
                {name}
              </p>
              <Link
                href={`/search?type=brand&query=${encodeURIComponent(brands)}&page=1`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                {brands}
              </Link>
            </div>
          </div>
          <span className="font-bold text-lg whitespace-nowrap">
            {calories}
          </span>
        </div>
      </Link>
    </Card>
  );
}
