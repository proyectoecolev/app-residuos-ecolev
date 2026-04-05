export default async function handler(req, res) {
  const { nombre, direccion, telefono, zona_ruta, notas } = req.body;

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
      nombre,
      direccion,
      telefono,
      zona_ruta,
      notas,
      estado: "pausado",
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return res.status(400).json({ error: text });
  }

  return res.status(200).json({ ok: true });
}
