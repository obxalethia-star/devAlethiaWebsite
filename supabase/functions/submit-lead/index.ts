import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const PACKAGE_LABELS: Record<string, string> = {
  starter: "Starter — R1,500 once-off",
  growth: "Growth — R5,000 once-off",
  enterprise: "Enterprise — R10,000 once-off",
  retainer: "Monthly Retainer",
  unsure: "Not sure yet",
};

type LeadPayload = {
  name?: string;
  email?: string;
  business?: string;
  package?: string;
  message?: string;
};

function buildSummary(payload: Required<LeadPayload>) {
  const packageLabel = PACKAGE_LABELS[payload.package] ?? payload.package || "Not specified";

  return [
    "New DevAlethia contact form submission",
    "",
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Business: ${payload.business || "Not provided"}`,
    `Package: ${packageLabel}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

function buildHtmlSummary(payload: Required<LeadPayload>) {
  const packageLabel = PACKAGE_LABELS[payload.package] ?? payload.package || "Not specified";

  return `
    <h2>New DevAlethia lead</h2>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Business:</strong> ${payload.business || "Not provided"}</p>
    <p><strong>Package:</strong> ${packageLabel}</p>
    <p><strong>Message:</strong></p>
    <p>${payload.message.replace(/\n/g, "<br />")}</p>
  `;
}

async function sendNotificationEmail(payload: Required<LeadPayload>, summary: string) {
  const resendApiKey = Deno.env.get("RESEND_API_KEY");
  const notifyTo = Deno.env.get("NOTIFY_TO_EMAIL") ?? "admin@obxalethia.art";
  const notifyFrom = Deno.env.get("NOTIFY_FROM_EMAIL") ?? "DevAlethia <onboarding@resend.dev>";

  if (!resendApiKey) {
    console.warn("RESEND_API_KEY is not set; skipping email notification.");
    return;
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: notifyFrom,
      to: [notifyTo],
      reply_to: payload.email,
      subject: `New lead: ${payload.name} (${payload.business || payload.email})`,
      text: summary,
      html: buildHtmlSummary(payload),
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Email provider error: ${errorBody}`);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = (await req.json()) as LeadPayload;
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const business = body.business?.trim() ?? "";
    const packageInterest = body.package?.trim() ?? "";
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Name, email, and message are required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const payload = { name, email, business, package: packageInterest, message };
    const summary = buildSummary(payload);

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: client, error: clientError } = await supabase
      .from("clients")
      .upsert(
        {
          email,
          full_name: name,
          business_name: business || null,
          status: "lead",
        },
        { onConflict: "email" },
      )
      .select("id")
      .single();

    if (clientError || !client) {
      throw new Error(clientError?.message ?? "Failed to upsert client.");
    }

    const { data: inquiry, error: inquiryError } = await supabase
      .from("inquiries")
      .insert({
        client_id: client.id,
        package_interest: packageInterest || null,
        message,
        summary,
        source: "contact_form",
        status: "new",
      })
      .select("id")
      .single();

    if (inquiryError || !inquiry) {
      throw new Error(inquiryError?.message ?? "Failed to create inquiry.");
    }

    await supabase.from("inquiry_activities").insert({
      inquiry_id: inquiry.id,
      activity_type: "note",
      description: "Lead captured from website contact form.",
    });

    await sendNotificationEmail(payload, summary);

    return new Response(
      JSON.stringify({ success: true, inquiryId: inquiry.id }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unexpected error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
