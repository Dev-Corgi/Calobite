import { Button } from "@/components/ui/button";

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
          <Button key={nutrient} variant="outline" className="rounded-3xl h-40 text-lg font-semibold">
            {nutrient}
          </Button>
        ))}
      </div>
    </section>
  );
}