export const PACKAGE_OPTIONS = [
  { value: "", label: "Select a package..." },
  { value: "starter", label: "Starter — R1,500 once-off" },
  { value: "growth", label: "Growth — R5,000 once-off" },
  { value: "enterprise", label: "Enterprise — R10,000 once-off" },
  { value: "retainer", label: "Monthly Retainer" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const PACKAGE_LABELS = Object.fromEntries(
  PACKAGE_OPTIONS.filter((option) => option.value).map((option) => [option.value, option.label]),
) as Record<string, string>;
