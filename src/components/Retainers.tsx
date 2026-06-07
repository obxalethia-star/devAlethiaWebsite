import { Card } from "@/components/ui/card";
import { Check } from "lucide-react";

const tiers = [
  {
    id: "essential",
    name: "Essential",
    range: "R500 – R1,000",
    period: "/ month",
    color: "violet",
    services: [
      "Website content updates",
      "Social media scheduling",
      "Basic SEO monitoring",
      "Chatbot response tuning",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    range: "R1,000 – R2,000",
    period: "/ month",
    color: "cyan",
    services: [
      "Everything in Essential",
      "Blog & article writing",
      "Google Analytics reporting",
      "Ad campaign management",
      "Email marketing",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    range: "R2,000 – R3,500",
    period: "/ month",
    color: "emerald",
    services: [
      "Everything in Standard",
      "Full SEO strategy",
      "Conversion rate optimisation",
      "Workflow automation management",
      "Lead nurturing sequences",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    range: "R3,500 – R5,000",
    period: "/ month",
    color: "amber",
    services: [
      "Everything in Professional",
      "Dedicated account manager",
      "AI chatbot training",
      "Multi-platform store management",
      "Custom integrations",
    ],
  },
];

const colorMap: Record<string, { border: string; text: string; bg: string; check: string }> = {
  violet:  { border: "border-violet/30",  text: "text-violet",  bg: "bg-violet/10",  check: "text-violet"  },
  cyan:    { border: "border-cyan/30",    text: "text-cyan",    bg: "bg-cyan/10",    check: "text-cyan"    },
  emerald: { border: "border-emerald/30", text: "text-emerald", bg: "bg-emerald/10", check: "text-emerald" },
  amber:   { border: "border-amber/30",   text: "text-amber",   bg: "bg-amber/10",   check: "text-amber"   },
};

export const Retainers = () => {
  return (
    <section id="retainers" className="py-28 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet/25 text-xs font-mono text-violet mb-5">
            MONTHLY RETAINERS
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Keep Your{" "}
            <span className="text-gradient">Digital Edge Sharp</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A website is a living asset. Our retainer packages ensure your digital presence keeps pace with your
            business growth — and the evolving digital landscape.
          </p>
        </div>

        {/* Tier cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {tiers.map((tier) => {
            const c = colorMap[tier.color];
            return (
              <Card
                key={tier.id}
                id={`retainer-${tier.id}`}
                className={`p-6 glass border ${c.border} hover:border-opacity-70 hover:shadow-xl transition-all duration-300 group flex flex-col`}
              >
                <div className={`inline-flex items-center px-2.5 py-1 rounded-md ${c.bg} border ${c.border} mb-5 self-start`}>
                  <span className={`text-xs font-semibold font-mono ${c.text}`}>{tier.name}</span>
                </div>

                <div className="mb-5">
                  <span className={`font-display text-2xl font-bold ${c.text}`}>{tier.range}</span>
                  <span className="text-muted-foreground text-xs ml-1">{tier.period}</span>
                </div>

                <div className="section-divider mb-5" />

                <ul className="space-y-2.5 flex-1">
                  {tier.services.map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${c.check}`} />
                      {s}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>

        {/* Note */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            Enterprise package clients receive their{" "}
            <span className="text-foreground font-medium">first retainer month free</span> — a R2,000+ value.
          </p>
        </div>
      </div>
    </section>
  );
};
