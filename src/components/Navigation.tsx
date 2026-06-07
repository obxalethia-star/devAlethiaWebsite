import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { navLinks, ROUTES } from "@/lib/routes";

export const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
          <Link to={ROUTES.home} className="flex items-center gap-1 group">
            <img
              src="/OBXAlethia-TestLogoA2-02.png"
              alt="DevAlethia logo"
              className="h-10 w-10 object-contain"
            />
            <span className="font-display font-bold text-xl tracking-tight">
              Dev<span className="text-violet">Alethia</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-white/5 transition-all duration-200"
                activeClassName="text-foreground bg-white/5"
              >
                {link.label}
              </NavLink>
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
              onClick={() => navigate(ROUTES.contact)}
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
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all"
                activeClassName="text-foreground bg-white/5"
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3">
              <Button
                id="mobile-cta"
                className="w-full bg-violet hover:bg-violet/90 text-white font-medium"
                onClick={() => {
                  setMenuOpen(false);
                  navigate(ROUTES.contact);
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
