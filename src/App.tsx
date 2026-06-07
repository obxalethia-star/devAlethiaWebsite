import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ROUTES } from "@/lib/routes";
import Index from "./pages/Index";
import ServicesPage from "./pages/ServicesPage";
import PricingPage from "./pages/PricingPage";
import ProcessPage from "./pages/ProcessPage";
import RetainersPage from "./pages/RetainersPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.home} element={<Index />} />
            <Route path={ROUTES.services} element={<ServicesPage />} />
            <Route path={ROUTES.pricing} element={<PricingPage />} />
            <Route path={ROUTES.process} element={<ProcessPage />} />
            <Route path={ROUTES.retainers} element={<RetainersPage />} />
            <Route path={ROUTES.contact} element={<ContactPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
