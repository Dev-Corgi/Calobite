import { FoodListItem } from "@/components/food-list-item";
import type { Product } from "@/lib/types";

interface ResultListProps {
  searchResults: Product[];
}

export function ResultList({ searchResults }: ResultListProps) {
  if (searchResults.length === 0) {
    return (
      <div className="text-center text-muted-foreground text-sm py-4">
        <p>Oh, can&apos;t find the food you&apos;re looking for?</p>
        <p>Please leave your feedback at the email below!</p>
        <p className="font-semibold text-foreground">support@pillyze.com</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {searchResults.map((item) => (
          <FoodListItem
            key={item.code}
            code={item.code}
            name={item.product_name}
            brands={`${item.brands || ''} ${item.quantity || ''}`.trim()}
            calories={`${item.nutriments?.['energy-kcal_100g'] ? Math.round(item.nutriments['energy-kcal_100g']) : 'N/A'} Kcal`}
          />
        ))}
      </div>
      <div className="text-center text-muted-foreground text-sm py-4">
        <p>앗, 찾는 음식이 없으신가요?</p>
        <p>아래 메일로 의견을 남겨 주세요!</p>
        <p className="font-semibold text-foreground">support@pillyze.com</p>
      </div>
    </div>
  );
}