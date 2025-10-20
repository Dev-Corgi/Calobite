import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const navItems = [
  { title: "Home" },
  { title: "About Us" },
  { title: "Contact Us" },
  { title: "FAQ" },
  { title: "Privacy Policy" },
  { title: "Terms of Service" },
];

export function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 p-4">
      <nav>
        <Accordion type="multiple" className="w-full">
          {navItems.map((item) => (
            <div key={item.title}>
              {item.content ? (
                <AccordionItem value={item.title} className="border-none">
                  <AccordionTrigger className="text-lg font-semibold py-6 hover:no-underline px-4">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent className="pt-2">
                    <div className="flex flex-col items-start pl-11 space-y-1">
                      {item.content.map((subItem) => (
                        <Button
                          variant="ghost"
                          key={subItem}
                          className="h-8 text-muted-foreground justify-start w-full">
                          {subItem}
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ) : (
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-lg font-semibold py-6 h-auto px-4${
                    item.highlighted ? "text-primary" : ""
                  }`}>
                  {item.title}
                </Button>
              )}
              <Separator />
            </div>
          ))}
        </Accordion>
      </nav>
    </aside>
  );
}