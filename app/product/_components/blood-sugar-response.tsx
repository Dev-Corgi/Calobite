import { FoodListItem } from "@/components/food-list-item";
import { Card, CardContent } from "@/components/ui/card";

const bloodSugarData = [
  { name: 'Subway Tuna', details: 'Subway 238g', value: '140mg/dL' },
  { name: 'Tuna', details: 'Subway 238g', value: '136mg/dL' },
  { name: 'Tuna Sandwich', details: 'Subway 238g', value: '155mg/dL' },
];

export function BloodSugarResponse() {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-bold mb-4">Let's check the blood sugar response to Subway Tuna</h2>
      <div className="space-y-4">
        {bloodSugarData.map((item) => (
          <div key={item.name} className="hover:border-primary">
            <div className="p-0">
                <FoodListItem 
                    name={item.name} 
                    brands={`${item.details} | ${item.value}`} 
                    calories="" 
                />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}