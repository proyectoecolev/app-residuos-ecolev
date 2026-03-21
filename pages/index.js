import { useState } from "react";

export default function Home() {
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

      const data = await resp.json();

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
      <h1 style={{ marginBottom: "8px" }}>Alta al servicio Eco Lev 🌱</h1>
      <p style={{ color: "#555", marginTop: 0 }}>
        Completá tus datos para solicitar el servicio de recuperación de residuos orgánicos.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "14px", marginTop: "24px" }}>
        <div>
          <label>Nombre y apellido</label>
          <input
            type="text"
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label>Dirección</label>
          <input
            type="text"
            name="direccion"
            value={form.direccion}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label>Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div>
          <label>Zona</label>
          <select
            name="zona_ruta"
            value={form.zona_ruta}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Seleccionar</option>
            <option value="Norte">Norte</option>
            <option value="Sur">Sur</option>
          </select>
        </div>

        <div>
          <label>Observaciones</label>
          <textarea
            name="notas"
            value={form.notas}
            onChange={handleChange}
            rows="4"
            style={{ ...inputStyle, resize: "vertical" }}
            placeholder="Referencia del domicilio, horarios, tipo de balde, etc."
          />
        </div>

        <button
          type="submit"
          disabled={cargando}
          style={{
            padding: "12px 16px",
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          {cargando ? "Enviando..." : "Enviar solicitud"}
        </button>
      </form>

      {mensaje ? (
        <p style={{ marginTop: "18px", fontWeight: "bold", color: mensaje.startsWith("Error") ? "crimson" : "#166534" }}>
          {mensaje}
        </p>
      ) : null}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginTop: "6px",
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};
