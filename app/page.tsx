import { Suspense } from 'react';
import { HeroSection } from "./_components/hero-section";
import { TopFoodsSection } from "./_components/top-foods-section";
import { TopFoodsSectionSkeleton } from './_components/top-foods-section-skeleton';
import { NutritionGridSection } from "./_components/nutrition-grid-section";
import { Sidebar } from "./_components/sidebar";

async function getTopFoods() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`;
  const res = await fetch(`${baseUrl}/api/v2/top-10`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!res.ok) {
    // Log error for debugging (removed in production by Next.js config)
    console.error('Failed to fetch top foods');
    return [];
  }
  return res.json();
}

const TopFoodsData = async () => {
  const topFoods = await getTopFoods();
  return <TopFoodsSection topFoods={topFoods} />;
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="bg-muted">
        <div className="container mx-auto flex flex-col lg:flex-row gap-12 px-4 py-8 mt-8">
          <Sidebar />
          <div className="flex-1 lg:max-w-5xl">
            <main className="space-y-12">
              <Suspense fallback={<TopFoodsSectionSkeleton />}>
                <TopFoodsData />
              </Suspense>
              <NutritionGridSection />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

