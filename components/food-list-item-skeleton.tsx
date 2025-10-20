import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function FoodListItemSkeleton() {
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
