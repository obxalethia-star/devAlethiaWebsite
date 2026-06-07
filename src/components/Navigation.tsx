import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code2, Zap } from "lucide-react";

const navLinks = [
  { label: "Services",  href: "#services"  },
  { label: "Pricing",   href: "#pricing"   },
  { label: "Process",   href: "#process"   },
  { label: "Retainers", href: "#retainers" },
  { label: "Contact",   href: "#contact"   },
];

export const Navigation = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-background/90 border-b border-border/60 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-violet/20 rounded-lg group-hover:bg-violet/30 transition-colors" />
              <Code2 className="w-5 h-5 text-violet relative z-10" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight">
              Dev<span className="text-gradient">Alethia</span>
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="mailto:obxalethia@gmail.com"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              obxalethia@gmail.com
            </a>
            <Button
              id="nav-cta"
              size="sm"
              className="bg-violet hover:bg-violet/90 text-white font-medium rounded-lg px-5 glow-violet transition-all duration-200"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Get Started
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl">
          <div className="container mx-auto px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-3">
              <Button
                id="mobile-cta"
                className="w-full bg-violet hover:bg-violet/90 text-white font-medium"
                onClick={() => {
                  setMenuOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started Free
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
