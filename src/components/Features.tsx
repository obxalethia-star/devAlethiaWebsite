import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Zap, Rocket, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const packages = [
  {
    id: "starter",
    icon: Zap,
    name: "Starter",
    price: "R1,500",
    billing: "once-off",
    badge: null,
    tagline: "Start-ups & small businesses",
    description: "A credible online presence without a large upfront investment.",
    color: "violet",
    features: [
      "3 fully designed & developed pages",
      "Mobile-responsive professional design",
      "Basic AI chatbot (10 FAQs, lead capture)",
      "Product / service inventory layout",
      "Basic on-page SEO setup",
      "Google Business Profile submission",
      "Contact form + email notification",
      "SSL certificate & basic security",
      "30-day post-launch support",
    ],
    cta: "Get Started",
  },
  {
    id: "growth",
    icon: Rocket,
    name: "Growth",
    price: "R5,000",
    billing: "once-off",
    badge: "Most Popular",
    tagline: "E-commerce & growing brands",
    description: "Transforms your website into a revenue-generating machine.",
    color: "cyan",
    features: [
      "5+ fully designed & developed pages",
      "Full e-commerce store (PayFast / Yoco / Stripe)",
      "Advanced AI chatbot + CRM sync",
      "Lead landing pages & exit-intent popups",
      "Full SEO strategy & competitor gap analysis",
      "Workflow automations (leads, orders, CRM)",
      "Google Analytics 4 + conversion tracking",
      "Social media integration",
      "30-day post-launch support",
    ],
    cta: "Start Growing",
  },
  {
    id: "enterprise",
    icon: Building2,
    name: "Enterprise",
    price: "R10,000",
    billing: "once-off",
    badge: "Best Value",
    tagline: "Established & scaling businesses",
    description: "A complete digital ecosystem with priority support from day one.",
    color: "emerald",
    features: [
      "10+ fully designed & developed pages",
      "All Growth Package features included",
      "FREE first retainer month (R2,000+ value)",
      "Uber Eats / Mr D / OrderIn store setup",
      "Custom multi-step workflow automations",
      "Stock alerts, invoicing & lead routing",
      "Priority support + dedicated account manager",
      "Quarterly SEO strategy review",
      "30-day post-launch support",
    ],
    cta: "Scale Now",
  },
];

const colorMap: Record<string, {
  iconBg: string; iconText: string; border: string;
  badgeBg: string; badgeText: string; btnBg: string; glow: string;
}> = {
  violet:  {
    iconBg: "bg-violet/15", iconText: "text-violet",
    border: "border-violet/30", badgeBg: "bg-violet/15", badgeText: "text-violet",
    btnBg: "bg-violet hover:bg-violet/90 text-white glow-violet", glow: "hover:border-violet/60",
  },
  cyan:    {
    iconBg: "bg-cyan/15", iconText: "text-cyan",
    border: "border-cyan/40", badgeBg: "bg-cyan/15", badgeText: "text-cyan",
    btnBg: "bg-cyan hover:bg-cyan/90 text-background glow-cyan", glow: "hover:border-cyan/60",
  },
  emerald: {
    iconBg: "bg-emerald/15", iconText: "text-emerald",
    border: "border-emerald/30", badgeBg: "bg-emerald/15", badgeText: "text-emerald",
    btnBg: "bg-emerald hover:bg-emerald/90 text-background", glow: "hover:border-emerald/60",
  },
};

export const Features = () => {
  return (
    <section id="pricing" className="py-28 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Radial glow behind section */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-violet/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet/25 text-xs font-mono text-violet mb-5">
            PACKAGES & PRICING
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Transparent Pricing.{" "}
            <span className="text-gradient">No Hidden Fees.</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Three once-off packages designed to meet businesses at their current stage of growth.
            All include secure hosting setup, SSL, and a 30-day support window.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {packages.map((pkg) => {
            const c = colorMap[pkg.color];
            const Icon = pkg.icon;
            const isPopular = pkg.badge === "Most Popular";
            return (
              <Card
                key={pkg.id}
                id={`package-${pkg.id}`}
                className={`relative flex flex-col p-8 glass border ${c.border} ${c.glow} transition-all duration-300 ${
                  isPopular ? "md:-mt-4 md:shadow-2xl shadow-violet/10" : ""
                }`}
              >
                {/* Badge */}
                {pkg.badge && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold font-mono ${c.badgeBg} ${c.badgeText} border ${c.border}`}>
                    {pkg.badge}
                  </div>
                )}

                {/* Icon + name */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${c.iconText}`} />
                  </div>
                  <div>
                    <div className="font-display text-lg font-bold">{pkg.name}</div>
                    <div className="text-xs text-muted-foreground">{pkg.tagline}</div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-2">
                  <span className={`font-display text-4xl font-bold ${c.iconText}`}>{pkg.price}</span>
                  <span className="text-muted-foreground text-sm ml-2">{pkg.billing}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{pkg.description}</p>

                {/* Divider */}
                <div className="section-divider mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${c.iconText}`} />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  id={`pkg-cta-${pkg.id}`}
                  className={`w-full h-11 font-semibold rounded-xl ${c.btnBg} transition-all duration-200`}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {pkg.cta}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Footnote */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          All packages include a <span className="text-foreground font-medium">50% deposit</span> to start,{" "}
          with the balance due on final approval before launch.
        </p>
      </div>
    </section>
  );
};
