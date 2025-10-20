import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ExerciseInfoSkeleton() {
  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-7 w-1/2" />
        <Skeleton className="h-7 w-32" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col items-center justify-center text-center p-4 h-32">
              <Skeleton className="h-8 w-8 mb-2 rounded-full" />
              <Skeleton className="h-5 w-16 mb-1" />
              <Skeleton className="h-4 w-12" />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
