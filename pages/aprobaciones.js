export default function Aprobaciones({ socios }) {
  return (
    <div style={{ padding: 24, fontFamily: "Arial" }}>
      <h1>Solicitudes pendientes</h1>

      {socios.length === 0 ? (
        <p>No hay solicitudes</p>
      ) : (
        socios.map((socio) => (
          <div key={socio.id} style={{ border: "1px solid #ccc", padding: 12, marginTop: 10 }}>
            <p><strong>{socio.nombre}</strong></p>
            <p>{socio.direccion}</p>
            <p>{socio.telefono}</p>

            <button
              onClick={async () => {
                const resp = await fetch("/api/aprobar-socio", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ socio_id: socio.id }),
                });

                if (resp.ok) {
                  alert("Socio aprobado");
                  location.reload();
                } else {
                  alert("Error al aprobar");
                }
              }}
              style={{
                padding: "8px 12px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Aprobar
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const res = await fetch(
    `${supabaseUrl}/rest/v1/socios?estado=eq.pausado`,
    {
      headers: {
        apikey: supabaseAnonKey,
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
    }
  );

  const data = await res.json();

  return {
    props: {
      socios: data || [],
    },
  };
}
