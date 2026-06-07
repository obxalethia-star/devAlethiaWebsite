export const ROUTES = {
  home: "/",
  services: "/services",
  pricing: "/pricing",
  process: "/process",
  retainers: "/retainers",
  contact: "/contact",
} as const;

export const navLinks = [
  { label: "Services", to: ROUTES.services },
  { label: "Pricing", to: ROUTES.pricing },
  { label: "Process", to: ROUTES.process },
  { label: "Retainers", to: ROUTES.retainers },
  { label: "Contact", to: ROUTES.contact },
] as const;
