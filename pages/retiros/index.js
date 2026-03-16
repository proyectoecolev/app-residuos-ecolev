import Link from "next/link";

export default function Retiros({ resumen, recorrido, error }) {
  if (error) {
    return (
      <div style={{ fontFamily: "Arial, sans-serif", padding: "24px" }}>
        <h1>Retiros</h1>
        <p style={{ color: "crimson" }}>Error: {error}</p>
        <Link href="/dashboard">← Volver al panel</Link>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "8px" }}>Retiros de hoy</h1>
      <p style={{ color: "#555", marginTop: 0 }}>Recorrido generado desde confirmaciones y socios activos.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "12px",
          marginTop: "20px",
          marginBottom: "24px",
        }}
      >
        <StatCard title="Confirmaron sí" value={resumen?.confirmaron_si ?? 0} />
        <StatCard title="Confirmaron no" value={resumen?.confirmaron_no ?? 0} />
        <StatCard title="Sin respuesta" value={resumen?.sin_respuesta ?? 0} />
        <StatCard title="Baldes 10L" value={resumen?.total_baldes_10l ?? 0} />
        <StatCard title="Baldes 20L" value={resumen?.total_baldes_20l ?? 0} />
        <StatCard title="Kg estimados" value={resumen?.kilos_estimados_hoy ?? 0} />
      </div>

      <div style={{ marginBottom: "18px" }}>
        <Link href="/dashboard">← Volver al panel</Link>
      </div>

      {recorrido.length === 0 ? (
        <p>No hay retiros para mostrar hoy.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {recorrido.map((item) => (
            <div
              key={item.socio_id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "16px",
                background: "#fafafa",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                <div>
                  <h3 style={{ margin: "0 0 6px 0" }}>{item.nombre}</h3>
                  <p style={{ margin: "0 0 4px 0", color: "#555" }}>{item.direccion || "Sin dirección"}</p>
                  <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>
                    {item.telefono ? `Tel: ${item.telefono}` : "Sin teléfono"}{" "}
                    {item.zona_ruta ? `· Zona: ${item.zona_ruta}` : ""}
                  </p>
                </div>

                <div>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "6px 10px",
                      borderRadius: "999px",
                      fontSize: "13px",
                      fontWeight: "bold",
                      background:
                        item.estado_confirmacion === "confirmo_si"
                          ? "#d1fae5"
                          : item.estado_confirmacion === "sin_respuesta"
                          ? "#fef3c7"
                          : "#fee2e2",
                      color:
                        item.estado_confirmacion === "confirmo_si"
                          ? "#065f46"
                          : item.estado_confirmacion === "sin_respuesta"
                          ? "#92400e"
                          : "#991b1b",
                    }}
                  >
                    {labelEstado(item.estado_confirmacion)}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "10px",
                  marginTop: "14px",
                }}
              >
                <MiniBox label="Baldes 10L" value={item.baldes_10l ?? 0} />
                <MiniBox label="Baldes 20L" value={item.baldes_20l ?? 0} />
                <MiniBox label="Kg estimados" value={item.kilos_estimados ?? 0} />
              </div>
<button
  style={{
    marginTop: "10px",
    padding: "8px 12px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  }}
  onClick={async () => {
    const resp = await fetch("/api/marcar-retirado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        socio_id: item.socio_id,
        fecha: new Date().toISOString().slice(0, 10),
      }),
    });

    if (resp.ok) {
      alert("Marcado como retirado");
      location.reload();
    } else {
      const t = await resp.text();
      alert("Error: " + t);
    }
  }}
>
  ✔ Retirado
</button>
              {item.observacion ? (
                <p style={{ marginTop: "12px", color: "#444" }}>
                  <strong>Observación:</strong> {item.observacion}
                </p>
              ) : null}
<button
  style={{
    marginTop: "12px",
    padding: "10px 14px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
  onClick={async () => {
    const resp = await fetch("/api/marcar-retirado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        socio_id: item.socio_id,
        fecha: new Date().toISOString().slice(0, 10),
      }),
    });

    if (resp.ok) {
      alert("Marcado como retirado");
      location.reload();
    } else {
      const txt = await resp.text();
      alert("Error: " + txt);
    }
  }}
>
  ✔ Retirado
</button>            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "14px",
        background: "#fff",
      }}
    >
      <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{title}</p>
      <h2 style={{ margin: "8px 0 0 0" }}>{value}</h2>
    </div>
  );
}

function MiniBox({ label, value }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "10px",
        background: "#fff",
      }}
    >
      <p style={{ margin: 0, fontSize: "13px", color: "#666" }}>{label}</p>
      <p style={{ margin: "6px 0 0 0", fontWeight: "bold", fontSize: "18px" }}>{value}</p>
    </div>
  );
}

function labelEstado(estado) {
  if (estado === "confirmo_si") return "Confirmó sí";
  if (estado === "confirmo_no") return "Confirmó no";
  if (estado === "sin_respuesta") return "Sin respuesta";
  return estado || "Sin dato";
}

export async function getServerSideProps() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return {
        props: {
          resumen: null,
          recorrido: [],
          error: "Faltan las variables NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY",
        },
      };
    }

    const headers = {
      apikey: supabaseAnonKey,
      Authorization: `Bearer ${supabaseAnonKey}`,
    };

    const [resumenRes, recorridoRes] = await Promise.all([
      fetch(`${supabaseUrl}/rest/v1/v_resumen_hoy?select=*`, { headers }),
      fetch(`${supabaseUrl}/rest/v1/v_recorrido_hoy?select=*&order=zona_ruta.asc,direccion.asc`, { headers })
    ]);

    if (!resumenRes.ok || !recorridoRes.ok) {
      const resumenText = await resumenRes.text();
      const recorridoText = await recorridoRes.text();
      return {
        props: {
          resumen: null,
          recorrido: [],
          error: `Supabase respondió con error. Resumen: ${resumenText} | Recorrido: ${recorridoText}`,
        },
      };
    }

    const resumenData = await resumenRes.json();
    const recorridoData = await recorridoRes.json();

    return {
      props: {
        resumen: resumenData?.[0] || null,
        recorrido: recorridoData || [],
        error: null,
      },
    };
  } catch (err) {
    return {
      props: {
        resumen: null,
        recorrido: [],
        error: err.message || "Error desconocido",
      },
    };
  }
}
