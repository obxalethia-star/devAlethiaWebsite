import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const envPath = join(root, ".env.local");

if (!existsSync(envPath)) {
  console.error("Missing .env.local");
  process.exit(1);
}

const env = Object.fromEntries(
  readFileSync(envPath, "utf8")
    .split(/\r?\n/)
    .filter((line) => line && !line.startsWith("#") && line.includes("="))
    .map((line) => {
      const index = line.indexOf("=");
      return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
    }),
);

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

const payload = {
  p_name: "CRM Test Lead",
  p_email: `test+${Date.now()}@example.com`,
  p_business: "DevAlethia QA",
  p_package: "starter",
  p_message: "Automated lead submission test from scripts/test-lead-submission.mjs",
};

const { data, error } = await supabase.rpc("submit_lead_request", payload);

if (error) {
  console.error("Lead submission failed:", error.message);
  process.exit(1);
}

console.log("Lead saved:", data);

const { data: edgeData, error: edgeError } = await supabase.functions.invoke("notify-new-lead", {
  body: { inquiryId: data.inquiryId },
});

if (edgeError) {
  console.warn("Email notification function not available:", edgeError.message);
  process.exit(0);
}

console.log("Email notification result:", edgeData);
