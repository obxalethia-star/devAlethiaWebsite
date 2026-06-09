import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
    const { inquiryId } = await req.json();

    if (!inquiryId) {
      return new Response(JSON.stringify({ error: "inquiryId is required." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: inquiry, error: inquiryError } = await supabase
      .from("inquiries")
      .select("id, summary, message, package_interest, clients(full_name, email, business_name)")
      .eq("id", inquiryId)
      .single();

    if (inquiryError || !inquiry) {
      throw new Error(inquiryError?.message ?? "Inquiry not found.");
    }

    const client = inquiry.clients as {
      full_name: string;
      email: string;
      business_name: string | null;
    };

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const notifyTo = Deno.env.get("NOTIFY_TO_EMAIL") ?? "admin@obxalethia.art";
    const notifyFrom = Deno.env.get("NOTIFY_FROM_EMAIL") ?? "DevAlethia <onboarding@resend.dev>";

    if (!resendApiKey) {
      return new Response(JSON.stringify({ success: true, emailed: false }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
        reply_to: client.email,
        subject: `New lead: ${client.full_name} (${client.business_name || client.email})`,
        text: inquiry.summary ?? inquiry.message,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Email provider error: ${errorBody}`);
    }

    await supabase.from("inquiry_activities").insert({
      inquiry_id: inquiry.id,
      activity_type: "email",
      description: `Notification email sent to ${notifyTo}.`,
    });

    return new Response(JSON.stringify({ success: true, emailed: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : "Unexpected error";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
