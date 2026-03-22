import Link from "next/link";

export default function Dashboard() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "24px",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "8px" }}>Panel Eco Lev 🌱</h1>
      <p style={{ color: "#555", marginTop: 0 }}>
        Gestión del servicio de recuperación de residuos orgánicos
      </p>

      <div style={{ display: "grid", gap: "16px", marginTop: "24px" }}>
        <Link href="/retiros">
          <button style={btnVerde}>🚛 Retiros del día</button>
        </Link>

        <Link href="/entregas">
          <button style={btnVerde}>📦 Entregas</button>
        </Link>

        <Link href="/socios">
          <button style={btnVerde}>👥 Socios</button>
        </Link>

        <Link href="/aprobaciones">
          <button style={btnVerde}>✅ Aprobar solicitudes</button>
        </Link>

        <Link href="/alta">
          <button style={btnVerde}>➕ Alta manual</button>
        </Link>
      </div>

      <div style={{ marginTop: "40px" }}>
        <Link href="/">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}

const btnVerde = {
  padding: "14px",
  fontSize: "16px",
  background: "#16a34a",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
