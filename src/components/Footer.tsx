import { Link } from "react-router-dom";
import { Mail, Globe, ArrowUpRight } from "lucide-react";
import { ROUTES } from "@/lib/routes";

const footerLinks = {
  Services: [
    { label: "Website Design", to: ROUTES.services },
    { label: "SEO Strategy", to: ROUTES.services },
    { label: "AI Chatbots", to: ROUTES.services },
    { label: "Lead Generation", to: ROUTES.services },
  ],
  Company: [
    { label: "About Us", to: ROUTES.services },
    { label: "Pricing", to: ROUTES.pricing },
    { label: "Our Process", to: ROUTES.process },
    { label: "Retainer Plans", to: ROUTES.retainers },
  ],
  Contact: [
    { label: "Get in Touch", to: ROUTES.contact },
    { label: "obxalethia@gmail.com", href: "mailto:obxalethia@gmail.com" },
    { label: "dev.obxalethia.art", href: "https://dev.obxalethia.art" },
  ],
};

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-border/60 bg-background pt-20 pb-10">
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-violet/50 to-transparent" />

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

          {/* Brand column */}
          <div className="md:col-span-1 space-y-4">
            <Link to={ROUTES.home} className="flex items-center gap-1">
              <img
                src="/OBXAlethia-TestLogoA2-02.png"
                alt="DevAlethia logo"
                className="h-10 w-10 object-contain"
              />
              <span className="font-display font-bold text-xl tracking-tight">
                Dev<span className="text-violet">Alethia</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Smart Websites. Real Results. Empowering South African businesses through intelligent digital presence.
            </p>
            <p className="text-xs font-mono text-violet/70">
              "Your business deserves a digital presence as powerful as your ambition."
            </p>

            {/* Contact chips */}
            <div className="space-y-2 pt-2">
              <a href="mailto:obxalethia@gmail.com" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group">
                <Mail className="w-3.5 h-3.5 text-violet" />
                admin@obxalethia.art
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a href="https://dev.obxalethia.art" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors group">
                <Globe className="w-3.5 h-3.5 text-violet" />
                dev.obxalethia.art
                <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="space-y-4">
              <h4 className="text-sm font-semibold font-display text-foreground">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {"to" in link ? (
                      <Link
                        to={link.to}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="section-divider mb-8" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {year} DevAlethia. All rights reserved.</p>
          <p className="font-mono text-violet/60">Smart Websites · SEO Strategies · AI Chatbots · Lead Generation</p>
        </div>
      </div>
    </footer>
  );
};
