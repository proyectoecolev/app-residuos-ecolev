export default async function handler(req, res) {
  const { socio_id, monto, metodo } = req.body;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const response = await fetch(`${supabaseUrl}/rest/v1/pagos`, {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      socio_id,
      fecha: new Date().toISOString().slice(0, 10),
      monto,
      metodo,
    }),
  });

  if (!response.ok) {
    return res.status(400).json({ error: "Error al guardar" });
  }

  return res.status(200).json({ ok: true });
}
