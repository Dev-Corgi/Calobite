import type { Product } from '@/lib/types';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footprints, Bike, Waves, Wind} from "lucide-react";

interface ExerciseInfoProps {
  product: Product;
}

const exerciseMETs = {
  걷기: 3.0, // Brisk walking
  달리기: 9.8, // Running at 8 km/h
  줄넘기: 11.0, // Jumping rope, moderate effort
  사이클: 7.5, // Cycling, 15-20 km/h, leisure
  수영: 5.8, // Swimming, freestyle, moderate
};

const exercises = [
  { icon: Footprints, name: "걷기" },
  { icon: Wind, name: "달리기" },
  { icon: Bike, name: "사이클" },
  { icon: Waves, name: "수영" },
];

const calculateDuration = (
  calories: number,
  met: number,
  weightKg: number = 60
): string => {
  if (calories <= 0 || met <= 0) return "0 min";
  const durationMinutes = (calories / (met * weightKg)) * 60;
  return `${Math.round(durationMinutes)} min`;
};

export function ExerciseInfo({ product }: ExerciseInfoProps) {
  const calories = product.nutriments?.["energy-kcal_100g"] || 0;

  return (
    <section className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Exercise Equivalent to {product.product_name} Calories
        </h2>
        <Button variant="link" className="text-muted-foreground">
          See more exercise information &gt;
        </Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {exercises.map((exercise) => {
          const met = exerciseMETs[exercise.name as keyof typeof exerciseMETs];
          const duration = calculateDuration(calories, met);
          return (
            <Card key={exercise.name} className="hover:border-primary">
              <CardContent className="flex flex-col items-center justify-center text-center p-4 h-32">
                <exercise.icon className="h-7 w-7 text-muted-foreground mb-2" />
                <p className="font-semibold text-sm">{exercise.name}</p>
                <p className="text-xs text-muted-foreground">{duration}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
