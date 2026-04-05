import { useState } from "react";

export default function AltaSocio() {
  const [form, setForm] = useState({
    nombre: "",
    direccion: "",
    telefono: "",
    zona_ruta: "",
    notas: "",
  });

  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
  e.preventDefault();
  setCargando(true);
  setMensaje("");

  try {
    const resp = await fetch("/api/alta-socio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const text = await resp.text();

    let data = {};
    try {
      data = JSON.parse(text);
    } catch {
      data = { error: text };
    }

    if (resp.ok) {
      setMensaje("Solicitud enviada correctamente. Eco Lev revisará tus datos.");
      setForm({
        nombre: "",
        direccion: "",
        telefono: "",
        zona_ruta: "",
        notas: "",
      });
    } else {
      setMensaje("Error: " + (data.error || "No se pudo guardar"));
    }
  } catch (error) {
    setMensaje("Error: " + error.message);
  } finally {
    setCargando(false);
  }
}

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "24px", maxWidth: "650px", margin: "0 auto" }}>
      <h1>Alta al servicio Eco Lev 🌱</h1>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px", marginTop: "24px" }}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} required />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required />

        <select name="zona_ruta" value={form.zona_ruta} onChange={handleChange} required>
          <option value="">Zona</option>
          <option value="Norte">Norte</option>
          <option value="Sur">Sur</option>
        </select>

        <textarea name="notas" placeholder="Observaciones" value={form.notas} onChange={handleChange} />

        <button type="submit" disabled={cargando}>
          {cargando ? "Enviando..." : "Enviar"}
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
