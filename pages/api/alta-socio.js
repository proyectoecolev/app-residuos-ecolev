export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { nombre, direccion, telefono, zona_ruta, notas } = req.body || {};

    if (!nombre || !direccion || !telefono || !zona_ruta) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    const response = await fetch(`${supabaseUrl}/rest/v1/socios`, {
      method: "POST",
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        nombre,
        direccion,
        telefono,
        zona_ruta,
        notas: notas || null,
        estado: "pausado",
      }),
    });

    const text = await response.text();

    if (!response.ok) {
      return res.status(400).json({ error: text });
    }

    return res.status(200).json({ ok: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
