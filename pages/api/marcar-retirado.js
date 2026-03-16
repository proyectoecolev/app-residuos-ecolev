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
  };

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/recolecciones`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        id: crypto.randomUUID(),
        socio_id,
        fecha,
        estado: "recolectado",
        baldes_10l: 0,
        medios_10l: 0,
        baldes_20l: 0,
        kilos: 0,
        observaciones: null,
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(400).json({ error: text });
    }

    return res.status(200).json({ ok: true, data: text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
