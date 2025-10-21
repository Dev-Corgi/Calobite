import Link from "next/link";
import { cn } from "@/lib/utils";

const nutrients = [
  'Carbohydrates', 'Protein', 'Fat', 'Sugars', 'Saturated Fat',
  'Trans Fat', 'Omega-3', 'Cholesterol', 'Dietary Fiber', 'Alcohol',
  'Caffeine', 'Sodium', 'Potassium', 'Calcium', 'Magnesium',
  'Iron', 'Zinc', 'Copper', 'Manganese', 'Iodine'
];

export function NutritionGridSection() {
  return (
    <section className="py-12">
      <h2 className="text-2xl font-bold mb-6">Foods by Nutrient</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {nutrients.map((nutrient) => (
          <Link
            key={nutrient}
            href={`/search?query=${encodeURIComponent(nutrient)}`}
            className={cn(
              "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-3xl text-lg font-semibold",
              "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
              "h-40 transition-colors"
            )}
          >
            {nutrient}
          </Link>
        ))}
      </div>
    </section>
  );
}