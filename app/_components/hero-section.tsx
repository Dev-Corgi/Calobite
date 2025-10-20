'use client';

import { FoodSearchForm } from "@/app/_components/food-search-form";

export function HeroSection() {
  return (
    <section className="flex justify-center w-full py-20 md:py-28 lg:py-32 bg-background">
      <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-5xl mb-8">
          What <span className="text-primary">food</span> are you looking for?
        </h1>
        <FoodSearchForm />
      </div>
    </section>
  );
}
