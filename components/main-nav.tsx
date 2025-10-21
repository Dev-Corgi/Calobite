"use client";

import Link from "next/link";
import { ChevronRight, LogOut, Menu, Search, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define proper type for navigation links
interface NavLink {
  href: string;
  text: string;
  isNew?: boolean;
}

const navLinks: NavLink[] = [
  { href: "/", text: "Home" },
  { href: "/about", text: "About Us" },
  { href: "/contact", text: "Contact" },
  { href: "/faq", text: "FAQ" },
  { href: "/privacy-policy", text: "Privacy" },
  { href: "/terms-of-service", text: "Terms" },
];

export function MainNav() {
  const router = useRouter();
  const [searchMode, setSearchMode] = useState("integrated");
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = useState("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = (e: React.KeyboardEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const encodedQuery = encodeURIComponent(inputValue.trim());
      if (searchMode === "brand") {
        router.push(`/search?type=brand&query=${encodedQuery}`);
      } else {
        router.push(`/search?query=${encodedQuery}`);
      }
      setInputValue("");
      setOpen(false);
    }
  };

  const handleSelect = (value: string) => {
    setOpen(false);
    router.push(`/search?query=${encodeURIComponent(value)}`);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-sm p-0">
              <SheetHeader className="p-4">
                <div className="flex items-center justify-between">
                  <Link href="/" className="font-bold text-2xl">
                    Calobite
                  </Link>
                  <div className="flex items-center gap-2">
                    <Link href="#">
                      <LogOut className="h-5 w-5" />
                    </Link>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetTrigger>
                  </div>
                </div>
              </SheetHeader>
              <div className="p-4">
                <Link
                  href="#"
                  className="flex items-center gap-4 p-4 rounded-lg bg-muted">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">User</p>
                    <div className="text-sm text-muted-foreground flex gap-2">
                      <span>Order History</span>
                      <span>|</span>
                      <span>Coupons</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              </div>
              <Separator />
              <nav className="flex flex-col p-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.text}
                    href={link.href}
                    className={`px-4 py-2 rounded-md font-medium ${
                      link.isNew ? "text-purple-600" : "text-foreground"
                    }`}>
                    {link.text}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link
            href="/"
            className="font-bold text-2xl items-center space-x-2 flex">
            <span>Calobite</span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <div className="w-full max-w-md lg:max-w-lg hidden md:flex">
             <Button variant="outline" className="w-full justify-start text-muted-foreground" onClick={() => setOpen(true)}>
              <Search className="h-4 w-4 mr-2" />
              Search...
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(true)}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </header>
    <CommandDialog open={open} onOpenChange={setOpen}>
      <div className="flex items-center border-b px-3">
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <CommandInput
          value={inputValue}
          onValueChange={setInputValue}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e);
            }
          }}
          placeholder="Search for food or brand..."
          className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus:ring-0"
        />
        <div className="ml-2">
            <Select value={searchMode} onValueChange={setSearchMode}>
              <SelectTrigger className="w-[120px] border-none bg-transparent focus:ring-0 text-muted-foreground shadow-none">
                <SelectValue placeholder="Search Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="integrated">Integrated</SelectItem>
                <SelectItem value="brand">Brand</SelectItem>
              </SelectContent>
            </Select>
        </div>
      </div>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => handleSelect("Apple")}>Apple</CommandItem>
          <CommandItem onSelect={() => handleSelect("Banana")}>Banana</CommandItem>
          <CommandItem onSelect={() => handleSelect("Nestle")}>Nestle</CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
    </>
  );
}
