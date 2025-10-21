import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
  { name: 'Dr. Evelyn Reed', role: 'Founder & Chief Nutritionist', image: '/images/team/evelyn.jpg', fallback: 'ER' },
  { name: 'Marcus Chen', role: 'Lead Software Engineer', image: '/images/team/marcus.jpg', fallback: 'MC' },
  { name: 'Isabella Rossi', role: 'Head of Product Design', image: '/images/team/isabella.jpg', fallback: 'IR' },
  { name: 'David Kim', role: 'Community & Support Lead', image: '/images/team/david.jpg', fallback: 'DK' },
];

export function TeamSection() {
  return (
    <section className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Meet the Team</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <article key={member.name}>
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={member.image} alt={member.name} />
                  <AvatarFallback>{member.fallback}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">{member.name}</h3>
                <p className="text-sm text-primary">{member.role}</p>
              </CardContent>
            </Card>
          </article>
        ))}
      </div>
    </section>
  );
}
