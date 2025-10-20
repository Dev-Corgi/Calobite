'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodListItem } from "@/components/food-list-item";

// Define the type for a single food item from the API
interface TopFood {
  code: string;
  product_name: string;
  brands: string;
  nutriments: {
    'energy-kcal_100g'?: number;
    [key: string]: any;
  };
  // The fields below are not currently used, but are included in the API response.
  image_small_url: string;
  view_count: number;
}

interface TopFoodsSectionProps {
  topFoods: TopFood[];
}

const FoodList = ({ items }: { items: TopFood[] }) => (
  <div className="space-y-6">
    {items.map((item) => {
      // Extracts calorie information from nutriments.
      const calories = item.nutriments?.['energy-kcal_100g']
        ? `${Math.round(item.nutriments['energy-kcal_100g'])} Kcal`
        : 'N/A';

      return (
        <FoodListItem
          key={item.code}
          code={item.code}
          name={item.product_name}
          brands={item.brands || 'No brand information'}
          calories={calories}
        />
      );
    })}
  </div>
);

export function TopFoodsSection({ topFoods = [] }: TopFoodsSectionProps) {
  return (
    <section>
      <div>
          <h2 className="text-2xl font-bold pb-6">
            Frequently Eaten <span className="text-primary">Top 10 Popular Foods</span>
          </h2>
          {topFoods.length > 0 ? (
            <FoodList items={topFoods} />
          ) : (
            <p className="text-center text-muted-foreground">Failed to load popular food information.</p>
          )}
      </div>
    </section>
  );
}