import { Sidebar } from "../../_components/sidebar";
import { HeroSectionSkeleton } from "./hero-section-skeleton";
import { NutritionInfoSkeleton } from "./nutrition-info-skeleton";
import { NutritionGraphSkeleton } from "./nutrition-graph-skeleton";
import { ExerciseInfoSkeleton } from "./exercise-info-skeleton";
import { OtherFoodsSkeleton } from "./other-foods-skeleton";


export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row gap-12 px-4 py-8">
      <Sidebar />
      <div className="flex-1 space-y-8">
        <HeroSectionSkeleton />
        <NutritionInfoSkeleton />
        <NutritionGraphSkeleton />
        <ExerciseInfoSkeleton />
        <OtherFoodsSkeleton />
      </div>
      {/* <RightSidebar /> */}
    </div>
  );
}
