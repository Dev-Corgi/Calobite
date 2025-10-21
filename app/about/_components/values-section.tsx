import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from 'lucide-react';

const values = [
  { title: 'Accuracy', description: 'We are committed to providing the most precise and up-to-date nutritional information.' },
  { title: 'Simplicity', description: 'We design intuitive tools that make complex data easy to understand.' },
  { title: 'Transparency', description: 'We believe in open access to information about what you eat.' },
  { title: 'User-Centric', description: 'Our users are at the heart of every decision we make.' },
];

export function ValuesSection() {
  return (
    <section className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value) => (
          <article key={value.title}>
            <Card className="text-center h-full">
              <CardHeader>
                <div className="mx-auto bg-primary/10 text-primary rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardDescription className="p-6 pt-0">
                {value.description}
              </CardDescription>
            </Card>
          </article>
        ))}
      </div>
    </section>
  );
}
