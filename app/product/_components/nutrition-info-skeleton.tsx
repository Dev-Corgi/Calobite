import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function NutritionInfoSkeleton() {
  const nutritionData = [
    { name: "Calories", sub: null },
    { name: "Carbohydrates", sub: { name: "Sugars" } },
    { name: "Protein", sub: null },
    { name: "Fat", sub: { name: "Saturated Fat" } },
    { name: "Sodium", sub: null },
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
                  <div className="font-semibold text-base p-4 bg-muted/40">
                  <Skeleton className="h-6 w-20 mr-auto" /></div>
                  <div className="font-bold text-base p-4 text-right border-l">
                    <Skeleton className="h-6 w-20 ml-auto" />
                  </div>
                </div>
                {item.sub && (
                  <div className="grid grid-cols-2 items-center border-b">
                    <div className="text-muted-foreground text-sm p-4 pl-8 bg-muted/40"><Skeleton className="h-6 w-20 mr-auto" /></div>
                    <div className="text-muted-foreground text-sm p-4 text-right border-l">
                      <Skeleton className="h-6 w-20 ml-auto" />
                    </div>
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
