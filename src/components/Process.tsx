import { Card } from "@/components/ui/card";

const steps = [
  {
    number: "01",
    title: "Discovery & Brief",
    description:
      "We begin with a consultation call to understand your business, target audience, goals, and competitive landscape. You complete a brief questionnaire and supply existing brand assets.",
    color: "violet",
  },
  {
    number: "02",
    title: "Proposal & Agreement",
    description:
      "We present a tailored proposal confirming scope, timeline, and investment. On acceptance, a 50% deposit invoice is issued and work commences within three business days.",
    color: "cyan",
  },
  {
    number: "03",
    title: "Design & Development",
    description:
      "Our team designs your site wireframes and shares them for approval before development begins. You receive regular progress updates throughout the build phase.",
    color: "violet",
  },
  {
    number: "04",
    title: "Review & Revisions",
    description:
      "You review the completed site on a staging link and provide consolidated feedback. Two rounds of revisions are included in all packages.",
    color: "cyan",
  },
  {
    number: "05",
    title: "Launch & Handover",
    description:
      "On final approval and receipt of the remaining 50%, we deploy your site to your live domain, configure all integrations, and provide a brief walkthrough.",
    color: "emerald",
  },
  {
    number: "06",
    title: "Ongoing Partnership",
    description:
      "Clients on a retainer plan receive a monthly strategy call, performance report, and a priority support channel — we're invested in your ongoing success.",
    color: "amber",
  },
];

const colorMap: Record<string, { num: string; border: string; bg: string }> = {
  violet:  { num: "text-violet",  border: "border-violet/30",  bg: "bg-violet/10"  },
  cyan:    { num: "text-cyan",    border: "border-cyan/30",    bg: "bg-cyan/10"    },
  emerald: { num: "text-emerald", border: "border-emerald/30", bg: "bg-emerald/10" },
  amber:   { num: "text-amber",   border: "border-amber/30",   bg: "bg-amber/10"   },
};

export const Process = () => {
  return (
    <section id="process" className="py-28 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet/25 text-xs font-mono text-violet mb-5">
            ONBOARDING PROCESS
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            How We{" "}
            <span className="text-gradient">Bring Your Site to Life</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A structured, transparent process — from first conversation to live launch — so you always know what's happening.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step) => {
            const c = colorMap[step.color];
            return (
              <Card
                key={step.number}
                id={`step-${step.number}`}
                className={`p-7 glass border ${c.border} hover:border-opacity-70 hover:shadow-xl transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Large ghost number */}
                <div
                  className={`absolute -top-3 -right-2 font-display text-8xl font-bold ${c.num} opacity-5 select-none pointer-events-none`}
                >
                  {step.number}
                </div>

                {/* Number badge */}
                <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg ${c.bg} border ${c.border} mb-5`}>
                  <span className={`font-mono text-xs font-bold ${c.num}`}>{step.number}</span>
                </div>

                <h3 className="font-display text-lg font-bold mb-2 group-hover:text-foreground transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
