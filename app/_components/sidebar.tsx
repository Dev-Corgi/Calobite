import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

// Define proper type for navigation items
interface NavItem {
  title: string;
  href: string;
}

const navItems: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "About Us", href: "/about" },
  { title: "Contact Us", href: "/contact" },
  { title: "FAQ", href: "/faq" },
  { title: "Privacy Policy", href: "/privacy-policy" },
  { title: "Terms of Service", href: "/terms-of-service" },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 p-4">
      <nav>
        {navItems.map((item) => (
          <div key={item.title}>
            <Button
              asChild
              variant="ghost"
              className="w-full justify-start text-lg font-semibold py-6 h-auto px-4"
            >
              <Link href={item.href}>
                {item.title}
              </Link>
            </Button>
            <Separator />
          </div>
        ))}
      </nav>
    </aside>
  );
}
