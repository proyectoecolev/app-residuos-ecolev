export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { socio_id } = req.body;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const headers = {
    apikey: supabaseAnonKey,
    Authorization: `Bearer ${supabaseAnonKey}`,
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/socios?id=eq.${socio_id}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify({
          estado: "activo",
        }),
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(400).json({ error: text });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
