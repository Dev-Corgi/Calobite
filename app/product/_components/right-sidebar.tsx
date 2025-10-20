import { Card, CardContent } from "@/components/ui/card";

const recentFood = {
  name: "White",
  details: "Subway 71g(71g)",
  calories: "200kcal",
};

const bloodSugarResponse = [
  { name: "Subway Tuna", details: "Subway 238g", value: "140mg/dL" },
  { name: "Tuna", details: "Subway 238g", value: "138mg/dL" },
  { name: "Tuna Sandwich", details: "Subway 238g", value: "155mg/dL" },
];

export function RightSidebar() {
  return (
    <aside className="hidden lg:block w-72 space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          Recently viewed food
        </h2>
        <Card>
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{recentFood.name}</p>
                <p className="text-xs text-muted-foreground">
                  {recentFood.details}
                </p>
              </div>
              <span className="font-semibold text-sm">
                {recentFood.calories}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">
          How is the blood sugar response to Subway Tuna?
        </h2>
        <Card>
          <CardContent className="space-y-4">
            {bloodSugarResponse.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.details}
                  </p>
                </div>
                <span className="font-semibold text-sm">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
