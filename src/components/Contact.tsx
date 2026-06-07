import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Globe, MessageCircle, Send, CheckCircle2 } from "lucide-react";

const whyUs = [
  "We build for results, not just aesthetics",
  "Latest AI tools — previously enterprise-only",
  "South African team that knows the local market",
  "Transparent pricing — no hidden fees",
  "Scalable solutions that grow with your business",
  "Long-term retainer partnerships",
];

export const Contact = () => {
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]     = useState({ name: "", email: "", business: "", package: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async
    setTimeout(() => { setLoading(false); setSent(true); }, 1200);
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet/8 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-violet/25 text-xs font-mono text-violet mb-5">
            GET IN TOUCH
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform Your{" "}
            <span className="text-gradient">Digital Presence?</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We'd love to learn more about your business and show you exactly how DevAlethia can help you grow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">

          {/* Left panel — info */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Contact channels */}
            <Card className="p-6 glass border border-border space-y-5">
              <h3 className="font-display text-lg font-bold">Reach Us Directly</h3>
              {[
                { icon: Globe,          label: "Website",   value: "dev.obxalethia.art",     href: "https://dev.obxalethia.art" },
                { icon: Mail,           label: "Email",     value: "admin@obxalethia.art",   href: "mailto:admin@obxalethia.art" },
                { icon: MessageCircle,  label: "WhatsApp",  value: "Available via chatbot",  href: "#" },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded-lg bg-violet/10 border border-violet/25 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-violet" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                    <div className="text-sm font-medium group-hover:text-violet transition-colors">{value}</div>
                  </div>
                </a>
              ))}
            </Card>

            {/* Why us */}
            <Card className="p-6 glass border border-border">
              <h3 className="font-display text-lg font-bold mb-4">Why Choose DevAlethia</h3>
              <ul className="space-y-2.5">
                {whyUs.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Right panel — form */}
          <div className="lg:col-span-3">
            <Card className="p-8 glass border border-violet/20">
              {sent ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-emerald/15 border border-emerald/30 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-emerald" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm max-w-xs">
                    Thanks for reaching out. We'll be in touch within one business day.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-2 border-violet/30 hover:bg-violet/5 text-violet"
                    onClick={() => { setSent(false); setForm({ name: "", email: "", business: "", package: "", message: "" }); }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form id="contact-form" onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="font-display text-xl font-bold mb-2">Start the Conversation</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="contact-name" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border focus:border-violet/50 focus:outline-none focus:ring-2 focus:ring-violet/20 text-sm text-foreground placeholder:text-muted-foreground transition-all"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="contact-email" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="jane@example.co.za"
                        className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border focus:border-violet/50 focus:outline-none focus:ring-2 focus:ring-violet/20 text-sm text-foreground placeholder:text-muted-foreground transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-business" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Business Name
                    </label>
                    <input
                      id="contact-business"
                      name="business"
                      type="text"
                      value={form.business}
                      onChange={handleChange}
                      placeholder="Your business name"
                      className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border focus:border-violet/50 focus:outline-none focus:ring-2 focus:ring-violet/20 text-sm text-foreground placeholder:text-muted-foreground transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-package" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Package of Interest
                    </label>
                    <select
                      id="contact-package"
                      name="package"
                      value={form.package}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border focus:border-violet/50 focus:outline-none focus:ring-2 focus:ring-violet/20 text-sm text-foreground transition-all appearance-none"
                    >
                      <option value="">Select a package...</option>
                      <option value="starter">Starter — R1,500 once-off</option>
                      <option value="growth">Growth — R5,000 once-off</option>
                      <option value="enterprise">Enterprise — R10,000 once-off</option>
                      <option value="retainer">Monthly Retainer</option>
                      <option value="unsure">Not sure yet</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-message" className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Tell Us About Your Business *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      value={form.message}
                      onChange={handleChange}
                      placeholder="What does your business do, and what are your main digital goals?"
                      className="w-full px-4 py-2.5 rounded-xl bg-secondary/60 border border-border focus:border-violet/50 focus:outline-none focus:ring-2 focus:ring-violet/20 text-sm text-foreground placeholder:text-muted-foreground transition-all resize-none"
                    />
                  </div>

                  <Button
                    id="contact-submit"
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-violet hover:bg-violet/90 text-white font-semibold rounded-xl glow-violet transition-all duration-200"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send Message
                      </span>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    We respond within one business day. No spam — ever.
                  </p>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
