// Supabase client stub — wired but disabled until you add credentials.
//
// To activate:
//   1. Sign up free at https://supabase.com (no card needed)
//   2. Create a new project (any region, e.g. eu-west-1 for UAE latency)
//   3. From Project Settings → API, copy:
//      - Project URL  → VITE_SUPABASE_URL
//      - anon key     → VITE_SUPABASE_ANON_KEY
//   4. Add to Vercel: dashboard → Project → Settings → Environment Variables
//   5. Locally: create .env.local with these two vars
//   6. Run the SQL in scripts/supabase_schema.sql in Supabase SQL editor
//   7. Redeploy

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(URL && KEY);

let client = null;
async function getClient() {
  if (!isSupabaseConfigured) return null;
  if (client) return client;
  const { createClient } = await import("@supabase/supabase-js").catch(() => ({}));
  if (!createClient) return null; // package not installed yet
  client = createClient(URL, KEY);
  return client;
}

// ─── Order persistence ────────────────────────────────────────────────────
// Saves an order to Supabase. Falls back silently if not configured —
// the WhatsApp flow still works, this just adds a database record.
export async function saveOrder(order) {
  if (!isSupabaseConfigured) {
    console.info("[supabase] Not configured — order not saved to DB.");
    return { ok: false, reason: "not_configured" };
  }
  const sb = await getClient();
  if (!sb) return { ok: false, reason: "client_init_failed" };
  try {
    const { data, error } = await sb.from("orders").insert([order]).select();
    if (error) throw error;
    return { ok: true, data };
  } catch (e) {
    console.error("[supabase] saveOrder error:", e);
    return { ok: false, reason: e.message };
  }
}

// ─── Newsletter / notify-me ───────────────────────────────────────────────
export async function subscribeNotify(email, departmentKey) {
  if (!isSupabaseConfigured) return { ok: false, reason: "not_configured" };
  const sb = await getClient();
  if (!sb) return { ok: false };
  const { error } = await sb.from("notify_signups").insert([
    { email, department: departmentKey, created_at: new Date().toISOString() },
  ]);
  if (error) return { ok: false, reason: error.message };
  return { ok: true };
}
