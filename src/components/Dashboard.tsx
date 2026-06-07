import { Card } from "@/components/ui/card";
import { Globe, Search, Bot, TrendingUp, ArrowRight } from "lucide-react";

const services = [
  {
    id: "web-design",
    icon: Globe,
    color: "violet",
    title: "Smart Website Design",
    tagline: "The foundation of your digital presence",
    bullets: [
      "Visually clean, professionally branded",
      "Mobile-first & fully responsive",
      "Fast-loading with optimised images & lean code",
      "Clear calls-to-action that convert visitors",
    ],
  },
  {
    id: "seo",
    icon: Search,
    color: "cyan",
    title: "Digital Marketing & SEO Strategy",
    tagline: "Being found online is never an accident",
    bullets: [
      "Technical SEO, sitemaps & schema markup",
      "Keyword research aligned to your market",
      "Local SEO & Google Business Profile",
      "Competitor gap analysis & ongoing monitoring",
    ],
  },
  {
    id: "ai-chatbots",
    icon: Bot,
    color: "emerald",
    title: "AI Chatbots & Automation",
    tagline: "Always-on customer engagement",
    bullets: [
      "Greet visitors & guide them through services",
      "Capture leads 24/7 without human standby",
      "Auto-escalate complex queries via WhatsApp",
      "CRM sync via automated workflows",
    ],
  },
  {
    id: "lead-gen",
    icon: TrendingUp,
    color: "amber",
    title: "Lead Generation & CRO",
    tagline: "Traffic without conversion is just vanity",
    bullets: [
      "Strategic forms, landing pages & lead magnets",
      "A/B-tested CTAs to maximise conversions",
      "Exit-intent popups & chatbot triggers",
      "Email sequences that nurture leads to sales",
    ],
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  violet:  { bg: "bg-violet/10",  border: "border-violet/30",  text: "text-violet",  glow: "group-hover:shadow-violet/15" },
  cyan:    { bg: "bg-cyan/10",    border: "border-cyan/30",    text: "text-cyan",    glow: "group-hover:shadow-cyan/15"   },
  emerald: { bg: "bg-emerald/10", border: "border-emerald/30", text: "text-emerald", glow: "group-hover:shadow-emerald/15" },
  amber:   { bg: "bg-amber/10",   border: "border-amber/30",   text: "text-amber",   glow: "group-hover:shadow-amber/15"  },
};

export const Dashboard = () => {
  return (
    <section id="services" className="py-28 relative">
      {/* Subtle section divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet/25 text-xs font-mono text-violet mb-5">
            OUR SERVICE APPROACH
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Four Pillars of Your{" "}
            <span className="text-gradient">Digital Growth</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Every DevAlethia engagement is built on strategy, technology, and a relentless focus on measurable results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((svc) => {
            const c = colorMap[svc.color];
            const Icon = svc.icon;
            return (
              <Card
                key={svc.id}
                id={svc.id}
                className={`p-8 glass border ${c.border} group hover:border-opacity-60 hover:shadow-xl ${c.glow} transition-all duration-300 cursor-default`}
              >
                <div className="flex flex-col h-full gap-5">
                  {/* Icon + title */}
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl ${c.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${c.text}`} />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold mb-0.5 group-hover:text-foreground transition-colors">
                        {svc.title}
                      </h3>
                      <p className={`text-sm font-medium ${c.text}`}>{svc.tagline}</p>
                    </div>
                  </div>

                  {/* Bullet list */}
                  <ul className="space-y-2.5 flex-1">
                    {svc.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${c.bg} border ${c.border} flex-shrink-0`} />
                        {b}
                      </li>
                    ))}
                  </ul>

                  {/* Footer link */}
                  <div
                    className={`flex items-center gap-1.5 text-sm font-medium ${c.text} opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200`}
                  >
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
