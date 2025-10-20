'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Product = {
  product_name: string;
  brands: string;
  serving_size: string;
  serving_quantity: number;
    nutriments: {
    'energy-kcal_100g'?: number;
  };
};

interface DetailHeroSectionProps {
  product: Product;
  displayMode: 'serving' | '100g';
  setDisplayMode: (mode: 'serving' | '100g') => void;
}

export function DetailHeroSection({ product, displayMode, setDisplayMode }: DetailHeroSectionProps) {
  const calories = product.nutriments['energy-kcal_100g'];
  return (
    <section>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/search">Food Search</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.product_name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mt-6 overflow-hidden p-0">
        <div className="p-6 pb-0">
          <div className="flex justify-between items-start pt-6">
            <div>
              <Link href={`/search?type=brand&query=${encodeURIComponent(product.brands)}&page=1`} className="text-sm text-primary font-semibold">{product.brands || 'No brand information'}</Link>
              <h1 className="text-3xl font-bold">{product.product_name}</h1>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary">{calories ? `${Math.round(calories)}` : '-'}</p>
              <p className="text-sm text-muted-foreground">Kcal</p>
            </div>
          </div>
        </div>
        <Tabs 
          value={displayMode}
          onValueChange={(value) => setDisplayMode(value as 'serving' | '100g')}
          className="w-full mt-6"
        >
          <TabsList className="grid w-full grid-cols-2 h-auto rounded-none bg-transparent border-t p-0">
            <TabsTrigger value="serving" className="py-4 rounded-none data-[state=active]:bg-muted data-[state=active]:shadow-none">
              {product.serving_quantity ? `Serving size : ${product.serving_quantity}g` : (product.serving_size || 'Serving size')}
            </TabsTrigger>
            <TabsTrigger value="100g" className="py-4 rounded-none data-[state=active]:bg-muted data-[state=active]:shadow-none">100g</TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>
    </section>
  );
}