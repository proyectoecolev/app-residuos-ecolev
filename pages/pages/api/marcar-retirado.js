export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { socio_id, fecha } = req.body;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const headers = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    "Content-Type": "application/json",
    Prefer: "resolution=merge-duplicates",
  };

  try {
    const r = await fetch(`${supabaseUrl}/rest/v1/recolecciones`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        socio_id,
        fecha,
        estado: "retirado",
      }),
    });

    const text = await r.text();
    if (!r.ok) {
      return res.status(400).json({ error: text });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
