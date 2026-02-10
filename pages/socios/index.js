import { useEffect, useState } from "react";
import Link from "next/link";

export default function Socios() {
  const [socios, setSocios] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    estado: "activo", // activo | pausado
      pausa_desde: "", // YYYY-MM-DD
  pausa_hasta: "", // YYYY-MM-DD
  pausa_motivo: "",
  notas: "",

  });

  // Cargar desde localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("ecolev_socios_v1");
      if (saved) setSocios(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Guardar en localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ecolev_socios_v1", JSON.stringify(socios));
    } catch (e) {
      console.error(e);
    }
  }, [socios]);

  function onChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function agregarSocio(e) {
    e.preventDefault();

    const nombre = form.nombre.trim();
    if (!nombre) return;

    const nuevo = {
      id: makeId(),
      nombre,
      direccion: form.direccion.trim(),
      telefono: form.telefono.trim(),
      estado: form.estado,
        pausa_desde: form.pausa_desde,
  pausa_hasta: form.pausa_hasta,
  pausa_motivo: form.pausa_motivo.trim(),

      notas: form.notas.trim(),
      creado: new Date().toISOString(),
    };

    setSocios((prev) => [nuevo, ...prev]);
    setForm({
  nombre: "",
  direccion: "",
  telefono: "",
  estado: "activo",
  pausa_desde: "",
  pausa_hasta: "",
  pausa_motivo: "",
  notas: "",
});

  }

  function eliminarSocio(id) {
    setSocios((prev) => prev.filter((s) => s.id !== id));
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 24, maxWidth: 980 }}>
      <h1 style={{ marginBottom: 6 }}>Socios</h1>
      <p style={{ marginTop: 0, color: "#444" }}>
        Versión 1: alta y listado (guardado en este dispositivo).
      </p>

      <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginTop: 16 }}>
        {/* FORM */}
        <form onSubmit={agregarSocio} style={card}>
          <h2 style={{ marginTop: 0, fontSize: 18 }}>Agregar socio</h2>

          <label style={label}>Nombre *</label>
          <input
            value={form.nombre}
            onChange={(e) => onChange("nombre", e.target.value)}
            placeholder="Ej: Susana Pérez"
            style={input}
          />

          <label style={label}>Dirección</label>
          <input
            value={form.direccion}
            onChange={(e) => onChange("direccion", e.target.value)}
            placeholder="Ej: Sarmiento 123"
            style={input}
          />

          <label style={label}>Teléfono</label>
          <input
            value={form.telefono}
            onChange={(e) => onChange("telefono", e.target.value)}
            placeholder="Ej: 3385..."
            style={input}
          />

          <label style={label}>Estado</label>
          <select value={form.estado} onChange={(e) => onChange("estado", e.target.value)} style={input}>
            <option value="activo">Activo</option>
            <option value="pausado">Pausado</option>
          </select>
{form.estado === "pausado" && (
  <>
    <label style={label}>Pausa desde</label>
    <input
      type="date"
      value={form.pausa_desde}
      onChange={(e) => onChange("pausa_desde", e.target.value)}
      style={input}
    />

    <label style={label}>Pausa hasta</label>
    <input
      type="date"
      value={form.pausa_hasta}
      onChange={(e) => onChange("pausa_hasta", e.target.value)}
      style={input}
    />

    <label style={label}>Motivo de la pausa</label>
    <input
      value={form.pausa_motivo}
      onChange={(e) => onChange("pausa_motivo", e.target.value)}
      placeholder="Ej: vacaciones / sin balde / se mudó"
      style={input}
    />
  </>
)}

          <label style={label}>Notas</label>
          <textarea
            value={form.notas}
            onChange={(e) => onChange("notas", e.target.value)}
            placeholder="Ej: pausa hasta marzo / no juntó esta semana..."
            style={{ ...input, height: 90, resize: "vertical" }}
          />

          <button type="submit" style={btn}>
            + Agregar
          </button>

          <p style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
            Se guarda en este navegador. Más adelante lo pasamos a Supabase para que lo carguen los socios.
          </p>
        </form>

        {/* LISTA */}
        <div style={{ ...card, flex: 1, minWidth: 320 }}>
          <h2 style={{ marginTop: 0, fontSize: 18 }}>Lista ({socios.length})</h2>

          {socios.length === 0 ? (
            <p style={{ color: "#555" }}>Todavía no hay socios cargados.</p>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {socios.map((s) => (
                <div key={s.id} style={item}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
                    <div>
                      <strong>{s.nombre}</strong>{" "}
                      <span style={{ fontSize: 12, color: s.estado === "activo" ? "#1f7a1f" : "#a15c00" }}>
                        • {s.estado}
                      </span>
                    </div>

                    <button type="button" onClick={() => eliminarSocio(s.id)} style={btnDanger}>
                      Eliminar
                    </button>
                  </div>

                  <div style={{ marginTop: 6, fontSize: 14, color: "#333" }}>
                    {s.direccion && <div>📍 {s.direccion}</div>}
                    {s.telefono && <div>📞 {s.telefono}</div>}
                    {s.notas && <div>📝 {s.notas}</div>}
                  </div>

                  <div style={{ marginTop: 8, fontSize: 12, color: "#777" }}>
                    Cargado: {new Date(s.creado).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 16 }}>
            <button
              type="button"
              onClick={() => {
                if (confirm("¿Borrar TODOS los socios guardados en este dispositivo?")) setSocios([]);
              }}
              style={btnGhost}
            >
              Borrar todo (este dispositivo)
            </button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 18 }}>
        <Link href="/dashboard">← Volver al panel</Link>
      </div>
    </div>
  );
}

function makeId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return String(Date.now()) + "_" + Math.random().toString(16).slice(2);
}

const card = {
  border: "1px solid #ddd",
  borderRadius: 12,
  padding: 16,
  background: "#fff",
  boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
};

const label = { fontSize: 13, marginTop: 10, marginBottom: 4, color: "#333" };

const input = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ccc",
  outline: "none",
  fontSize: 14,
};

const btn = {
  marginTop: 12,
  padding: "10px 12px",
  borderRadius: 10,
  border: "none",
  background: "#2f6b4f",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const btnDanger = {
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid #e2b8b8",
  background: "#fff5f5",
  color: "#9b1c1c",
  cursor: "pointer",
};

const btnGhost = {
  padding: "10px 12px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: "#fafafa",
  cursor: "pointer",
};

const item = {
  border: "1px solid #eee",
  borderRadius: 12,
  padding: 12,
  background: "#fafafa",
};
