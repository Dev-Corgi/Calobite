import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export function MissionSection() {
  return (
    <section className="container mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardDescription className="p-6 pt-0">
            To empower individuals to make informed dietary choices by providing clear, accurate, and personalized nutritional data. We aim to demystify food labels and help our users build a healthy, sustainable relationship with food.
          </CardDescription>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Our Vision</CardTitle>
          </CardHeader>
          <CardDescription className="p-6 pt-0">
            To be the most trusted and user-friendly digital nutrition platform in the world, creating a future where everyone has the knowledge and tools to achieve their wellness goals.
          </CardDescription>
        </Card>
      </div>
    </section>
  );
}
