"use client";

import Link from "next/link";
import { useState } from "react";
import { Scale, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/simplifier", label: "AI Simplifier" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary font-headline">
            <Scale />
            <span>LexPro</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/#contact">Contact Us</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Button onClick={() => setIsMenuOpen(!isMenuOpen)} variant="ghost" size="icon">
              {isMenuOpen ? <X /> : <Menu />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t">
          <nav className="flex flex-col items-center px-4 py-4 space-y-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>
                {item.label}
              </Link>
            ))}
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setIsMenuOpen(false)}>
              <Link href="/#contact">Contact Us</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
