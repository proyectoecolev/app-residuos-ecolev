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

    if (!supabaseUrl || !supabaseAnonKey) {
      return res.status(500).json({
        error: "Faltan variables de entorno de Supabase",
      });
    }

    const payload = {
      id: crypto.randomUUID(),
      nombre,
      direccion,
      telefono,
      zona_ruta,
      notas: notas || null,
      estado: "pausado",
    };

    let response;
    try {
      response = await fetch(`${supabaseUrl}/rest/v1/socios`, {
        method: "POST",
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(payload),
      });
    } catch (e) {
      return res.status(500).json({
        error: `No se pudo conectar con Supabase: ${e.message}`,
      });
    }

    const text = await response.text();

    if (!response.ok) {
      return res.status(400).json({
        error: `Supabase respondió con error: ${text}`,
      });
    }

    return res.status(200).json({ ok: true, data: text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
