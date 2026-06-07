import { Navigation } from "@/components/Navigation";
import { Hero }       from "@/components/Hero";
import { Dashboard }  from "@/components/Dashboard";   // Services
import { Features }   from "@/components/Features";    // Pricing
import { Process }    from "@/components/Process";
import { Retainers }  from "@/components/Retainers";
import { Contact }    from "@/components/Contact";
import { Footer }     from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Dashboard />
      <Features />
      <Process />
      <Retainers />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
