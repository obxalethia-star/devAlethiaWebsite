import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Bot, TrendingUp, Search } from "lucide-react";
import { ROUTES } from "@/lib/routes";

const pills = [
  { icon: Globe, label: "Smart Websites" },
  { icon: Search, label: "SEO Strategies" },
  { icon: Bot, label: "AI Chatbots" },
  { icon: TrendingUp, label: "Lead Generation" },
];

const stats = [
  { value: "R1,500", label: "Starter from", sub: "once-off" },
  { value: "100%", label: "Mobile-first", sub: "every build" },
  { value: "30-day", label: "Post-launch support", sub: "included" },
];

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-16 overflow-hidden">

      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-[hsl(220,20%,7%)]" />

      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-60" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 -left-32 w-[600px] h-[600px] bg-violet/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[500px] h-[500px] bg-cyan/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet/25 text-sm font-medium text-violet mb-8 animate-slide-up">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            Development Solutions Division of OBX Alethia Est.2026
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-6 animate-slide-up delay-100">
            Your Website
            <br />
            <span className="text-gradient">Should Work</span>
            <br />
            As Hard As You Do.
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10 animate-slide-up delay-200">
            DevAlethia builds smart, high-performing websites and digital ecosystems that help
            South African businesses compete in the modern economy — powered by AI, SEO, and conversion-focused design.
          </p>

          {/* Service pills */}
          <div className="flex flex-wrap gap-2.5 mb-12 animate-slide-up delay-300">
            {pills.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3.5 py-2 rounded-full glass border border-border hover:border-violet/40 transition-all duration-200 text-sm font-medium text-muted-foreground hover:text-foreground cursor-default group"
              >
                <Icon className="w-3.5 h-3.5 text-violet group-hover:text-cyan transition-colors" />
                {label}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-20 animate-slide-up delay-400">
            <Button
              id="hero-cta-primary"
              size="lg"
              className="bg-violet hover:bg-violet/90 text-white font-semibold px-8 h-12 rounded-xl glow-violet group transition-all duration-200"
              onClick={() => navigate(ROUTES.pricing)}
            >
              View Packages & Pricing
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              id="hero-cta-secondary"
              size="lg"
              variant="outline"
              className="border-border hover:border-violet/40 hover:bg-violet/5 font-semibold px-8 h-12 rounded-xl transition-all duration-200"
              onClick={() => navigate(ROUTES.contact)}
            >
              Book a Free Consultation
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-xl border-t border-border/60 pt-10 animate-slide-up delay-500">
            {stats.map(({ value, label, sub }) => (
              <div key={label} className="space-y-0.5">
                <div className="font-display text-2xl md:text-3xl font-bold text-gradient">{value}</div>
                <div className="text-sm font-medium text-foreground">{label}</div>
                <div className="text-xs text-muted-foreground">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
};
