import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin } from 'lucide-react';

export function ContactInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-start gap-4">
          <Mail className="w-6 h-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Email</h3>
            <a href="mailto:hello@calobite.com" className="text-muted-foreground hover:text-primary">
              hello@calobite.com
            </a>
            <p className="text-xs text-muted-foreground mt-1">For general inquiries and support</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <Phone className="w-6 h-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Phone</h3>
            <a href="tel:+14155550199" className="text-muted-foreground hover:text-primary">
              (415) 555-0199
            </a>
            <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9am - 5pm PST</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <MapPin className="w-6 h-6 text-primary mt-1" />
          <div>
            <h3 className="font-semibold">Headquarters</h3>
            <p className="text-muted-foreground">1234 Health Way, San Francisco, CA 94105, USA</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
