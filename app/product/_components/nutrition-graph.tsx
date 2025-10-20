"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Product = {
  product_name: string;
  serving_size: string;
  nutriments: {
    'energy-kcal_100g'?: number;
    carbohydrates_100g?: number;
    proteins_100g?: number;
    fat_100g?: number;
    sugars_100g?: number;
    'saturated-fat_100g'?: number;
    sodium_100g?: number;
  };
};

interface NutritionGraphProps {
  product: Product;
}

export function NutritionGraph({ product }: NutritionGraphProps) {
  const { nutriments, product_name, serving_size } = product;

  const carbs = nutriments.carbohydrates_100g || 0;
  const protein = nutriments.proteins_100g || 0;
  const fat = nutriments.fat_100g || 0;
  const total = carbs + protein + fat;

  const data = [
    {
      name: "Carbohydrates",
      value: total > 0 ? Math.round((carbs / total) * 100) : 0,
      grams: `${Math.round(carbs * 10) / 10} g`,
      color: "#8b5cf6",
    },
    {
      name: "Protein",
      value: total > 0 ? Math.round((protein / total) * 100) : 0,
      grams: `${Math.round(protein * 10) / 10} g`,
      color: "#60a5fa",
    },
    {
      name: "Fat",
      value: total > 0 ? Math.round((fat / total) * 100) : 0,
      grams: `${Math.round(fat * 10) / 10} g`,
      color: "#6ee7b7",
    },
  ];

  const totalCalories = Math.round(nutriments['energy-kcal_100g'] || 0);

  return (
    <section className="mt-8 space-y-4">
      <h2 className="text-xl font-bold mb-4">Macronutrient Ratio (per 100g)</h2>
      <Card>
        <CardContent className="flex flex-col items-center pt-6">
          <div style={{ width: "100%", height: 200 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                  paddingAngle={5}
                  cornerRadius={5}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <Label
                    value={totalCalories}
                    position="center"
                    className="text-3xl font-bold"
                    dy={-10}
                  />
                  <Label
                    value="kcal"
                    position="center"
                    className="text-muted-foreground"
                    dy={15}
                  />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full mt-6">
            {data.map((entry, index) => (
              <div key={entry.name}>
                <div className="grid grid-cols-3 gap-4 px-2 py-2 text-sm">
                  <div className="flex items-center">
                    <span
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: entry.color }}
                    />
                    <span>{entry.name}</span>
                  </div>
                  <div className="text-center font-medium">
                    {entry.grams}
                  </div>
                  <div className="text-right text-muted-foreground">
                    {entry.value}%
                  </div>
                </div>
                {index < data.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="flex-col items-stretch gap-4">
        <CardContent className="p-4">
          <p className="text-sm text-muted-foreground">
            The calories per {serving_size || '100g'} of {product_name} are {totalCalories}kcal. 
            {product_name} {serving_size || '100g'} contains {data[0].grams} of carbohydrates, {data[1].grams} of protein, and {data[2].grams} of fat. 
            It also contains {nutriments.sugars_100g?.toFixed(1) || 0}g of sugars, {nutriments['saturated-fat_100g']?.toFixed(1) || 0}g of saturated fat, and {nutriments.sodium_100g?.toFixed(1) ? nutriments.sodium_100g * 1000 : 0}mg of sodium.
          </p>
        </CardContent>
      </Card>
    </section>
  );
}