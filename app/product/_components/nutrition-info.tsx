// nutrition-info.tsx
'use client';

import { Card, CardContent } from "@/components/ui/card";
import { NutritionInfoSkeleton } from "./nutrition-info-skeleton";

type Product = {
  nutriments: {
    'energy-kcal_100g'?: number;
    carbohydrates_100g?: number;
    sugars_100g?: number;
    proteins_100g?: number;
    fat_100g?: number;
    'saturated-fat_100g'?: number;
    sodium_100g?: number;
  };
};

interface NutritionInfoProps {
  product?: Product;
  loading?: boolean;
}

const formatValue = (value: number | undefined, unit: string) => {
  if (value === undefined || value === null) return 'N/A';
  return `${Math.round(value * 10) / 10} ${unit}`;
};

export function NutritionInfo({ product, loading = false }: NutritionInfoProps) {
  if (loading || !product) {
    return <NutritionInfoSkeleton />;
  }

  const { nutriments } = product;

  const nutritionData = [
    { name: "Calories", value: formatValue(nutriments['energy-kcal_100g'], 'kcal') },
    {
      name: "Carbohydrates",
      value: formatValue(nutriments.carbohydrates_100g, 'g'),
      sub: { name: "Sugars", value: formatValue(nutriments.sugars_100g, 'g') },
    },
    { name: "Protein", value: formatValue(nutriments.proteins_100g, 'g') },
    {
      name: "Fat",
      value: formatValue(nutriments.fat_100g, 'g'),
      sub: { name: "Saturated Fat", value: formatValue(nutriments['saturated-fat_100g'], 'g') },
    },
    { name: "Sodium", value: formatValue(nutriments.sodium_100g ? nutriments.sodium_100g * 1000 : undefined, 'mg') },
  ];

  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Nutrition Information</h2>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-0">
          <div className="grid grid-cols-1">
            {nutritionData.map((item) => (
              <div key={item.name}>
                <div className="grid grid-cols-2 items-center border-b">
                  <p className="font-semibold text-base p-4 bg-muted/40">{item.name}</p>
                  <p className="font-bold text-base p-4 text-right border-l">{item.value}</p>
                </div>
                {item.sub && (
                  <div className="grid grid-cols-2 items-center border-b">
                    <p className="text-muted-foreground text-sm p-4 pl-8 bg-muted/40">↳ {item.sub.name}</p>
                    <p className="text-muted-foreground text-sm p-4 text-right border-l">{item.sub.value}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 text-xs text-muted-foreground bg-muted/40 p-3 rounded-md">
        <p>
          ⓘ The nutritional information of food may vary depending on the variety, development, and growing environment of the crop, and may also vary depending on the cooking method. The calculated calorie and ingredient information are average values and should be used for reference only, and some information may be incorrect or missing.
        </p>
      </div>
    </section>
  );
}