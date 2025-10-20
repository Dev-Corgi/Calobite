import Link from "next/link";

const footerLinks = [
  { href: "#", text: "About Us" },
  { href: "#", text: "Careers" },
  { href: "#", text: "Contact" },
  { href: "#", text: "Terms of Service" },
  { href: "#", text: "Privacy Policy" },
  { href: "#", text: "Cookie Policy" },
];

const companyInfo = [
  "Calobite Inc.",
  "Headquarters: 1234 Health Way, San Francisco, CA 94105, USA",
  "Phone: (415) 555-0199 | Email: hello@calobite.com",
  "Registered in Delaware, USA | EIN: 12-3456789",
  "© 2023 Calobite Inc. All rights reserved.",
];

const legalInfo = [
  "The information provided by Calobite is for general informational purposes only and is not intended as a substitute for professional medical advice.",
  "Product names, logos, brands, and other trademarks featured or referred to within Calobite are the property of their respective trademark holders.",
  "All content and materials available on Calobite, including but not limited to text, graphics, and logos, are the property of Calobite Inc. and are protected by applicable copyright and trademark law.",
];

export function Footer() {
  return (
    <footer className="bg-sidebar-accent text-sidebar-accent-foreground text-sm">
      <div className="container py-12 space-y-6 mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="space-y-4">
            <Link href="/" className="text-lg font-bold text-foreground">Calobite</Link>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {footerLinks.map((link) => (
                <Link key={link.text} href={link.href} className="hover:text-foreground">
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-2 text-xs">
          {companyInfo.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        <div className="space-y-2 text-xs">
          {legalInfo.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </footer>
  );
}
