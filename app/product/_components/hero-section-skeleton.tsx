import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function HeroSectionSkeleton() {
  return (
    <section>
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Card className="mt-6 overflow-hidden p-0">
        <div className="p-6 pb-0">
          <div className="flex justify-between items-start pt-6">
            <div>
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-9 w-48" />
            </div>
            <div className="text-right">
              <Skeleton className="h-10 w-20 mb-1" />
              <Skeleton className="h-4 w-12 ml-auto" />
            </div>
          </div>
        </div>
        <Tabs value="serving" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-2 h-auto rounded-none bg-transparent border-t p-0">
            <TabsTrigger value="serving" className="py-4 rounded-none">
              <Skeleton className="h-6 w-32" />
            </TabsTrigger>
            <TabsTrigger value="100g" className="py-4 rounded-none">
              <Skeleton className="h-6 w-16" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>
    </section>
  );
}
