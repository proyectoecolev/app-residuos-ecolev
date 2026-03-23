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
      id: crypto.randomUUID(),
      socio_id,
      periodo: new Date().toISOString().slice(0, 7),
      fecha_pago: new Date().toISOString().slice(0, 10),
      monto,
      metodo,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    return res.status(400).json({ error: text });
  }

  return res.status(200).json({ ok: true });
}
