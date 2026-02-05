"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = (path: string) => {
    const isActive = pathname === path;

    if (isScrolled) {
      return isActive
        ? "text-[#004B85] font-semibold"
        : "text-muted-foreground hover:text-foreground";
    }

    return isActive
      ? "text-white font-semibold"
      : "text-white/80 hover:text-white";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <BookOpen
              className={`w-7 h-7 ${
                isScrolled ? "text-[#004B85]" : "text-white"
              }`}
            />
            <div
              className={`font-semibold text-lg ${
                isScrolled ? "text-[#004B85]" : "text-white"
              }`}
            >
              SciViz Hub{" "}
              <span className="hidden sm:inline text-sm font-normal opacity-80">
                | PUCE Esmeraldas
              </span>
            </div>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm transition-colors ${linkClasses("/")}`}
            >
              Inicio
            </Link>

            <Link
              href="/sobre-nosotros"
              className={`text-sm transition-colors ${linkClasses(
                "/sobre-nosotros"
              )}`}
            >
              Sobre Nosotros
            </Link>

            <Link
              href="/contacto"
              className={`text-sm transition-colors ${linkClasses("/contacto")}`}
            >
              Contacto
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <Button
            variant="ghost"
            size="icon"
            className={`md:hidden ${
              isScrolled ? "text-foreground" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-white/20">
            <div className="flex flex-col gap-2 pt-4">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 text-sm ${linkClasses("/")}`}
              >
                Inicio
              </Link>

              <Link
                href="/sobre-nosotros"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 text-sm ${linkClasses("/sobre-nosotros")}`}
              >
                Sobre Nosotros
              </Link>

              <Link
                href="/contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`py-2 text-sm ${linkClasses("/contacto")}`}
              >
                Contacto
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
