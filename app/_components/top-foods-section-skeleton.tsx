import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const FoodListItemSkeleton = () => (
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

export function TopFoodsSectionSkeleton() {
  return (
    <section>
      <div>
        <CardHeader>
          <CardTitle className="text-2xl font-bold pb-6">
            Frequently Eaten <span className="text-primary">Top 10 Popular Foods</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <FoodListItemSkeleton key={index} />
            ))}
          </div>
        </CardContent>
      </div>
    </section>
  );
}
