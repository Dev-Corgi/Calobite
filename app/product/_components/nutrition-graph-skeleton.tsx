import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function NutritionGraphSkeleton() {
  return (
    <section className="mt-8 space-y-4">
      <h2 className="text-xl font-bold mb-4">탄단지 비율 (100g 기준)</h2>
      <Card>
        <CardContent className="flex flex-col items-center pt-6">
          <Skeleton className="w-[200px] h-[200px] rounded-full" />
          <div className="w-full mt-6 space-y-4">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    </section>
  );
}
