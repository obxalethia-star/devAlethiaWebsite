import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export type LeadFormData = {
  name: string;
  email: string;
  business: string;
  package: string;
  message: string;
};

type LeadResponse = { success: true; inquiryId: string };

async function notifyNewLead(inquiryId: string) {
  if (!supabase) return;

  await supabase.functions.invoke("notify-new-lead", {
    body: { inquiryId },
  });
}

async function submitLeadViaRpc(form: LeadFormData): Promise<LeadResponse> {
  if (!supabase) {
    throw new Error("Supabase client is not configured.");
  }

  const { data, error } = await supabase.rpc("submit_lead_request", {
    p_name: form.name.trim(),
    p_email: form.email.trim(),
    p_business: form.business.trim() || null,
    p_package: form.package || null,
    p_message: form.message.trim(),
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data?.success || !data?.inquiryId) {
    throw new Error("Lead was not saved. Please try again.");
  }

  return data as LeadResponse;
}

async function submitLeadViaEdgeFunction(form: LeadFormData): Promise<LeadResponse> {
  if (!supabase) {
    throw new Error("Supabase client is not configured.");
  }

  const { data, error } = await supabase.functions.invoke("submit-lead", {
    body: {
      name: form.name.trim(),
      email: form.email.trim(),
      business: form.business.trim(),
      package: form.package,
      message: form.message.trim(),
    },
  });

  if (error) {
    throw error;
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data as LeadResponse;
}

export async function submitLead(form: LeadFormData) {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.",
    );
  }

  try {
    return await submitLeadViaEdgeFunction(form);
  } catch (edgeError) {
    try {
      const result = await submitLeadViaRpc(form);
      await notifyNewLead(result.inquiryId);
      return result;
    } catch (rpcError) {
      const edgeMessage = edgeError instanceof Error ? edgeError.message : "Edge function failed";
      const rpcMessage = rpcError instanceof Error ? rpcError.message : "Database RPC failed";
      throw new Error(`${rpcMessage} (${edgeMessage})`);
    }
  }
}
