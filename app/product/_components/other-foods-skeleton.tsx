import { Skeleton } from '@/components/ui/skeleton';
import { FoodListItem } from '@/components/food-list-item';

export function OtherFoodsSkeleton() {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4"><Skeleton className="h-7 w-48" /></h2>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          // @ts-ignore
          <FoodListItem key={index} loading />
        ))}
      </div>
    </section>
  );
}
