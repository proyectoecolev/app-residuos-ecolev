import Link from "next/link";

export default function Dashboard() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "24px" }}>
      <h1 style={{ marginBottom: "8px" }}>Panel Eco Lev</h1>
      <p style={{ marginTop: 0, color: "#444" }}>
        Elegí una sección para empezar (versión 1).
      </p>

      <div
        style={{
          display: "grid",
          gap: "12px",
          maxWidth: "420px",
          marginTop: "20px",
        }}
      >
        <Link href="/socios" style={cardStyle}>
          👥 Socios
        </Link>

        <Link href="/retiros" style={cardStyle}>
          🪣 Retiros
        </Link>

        <Link href="/entregas" style={cardStyle}>
          🌱 Entregas de compost
        </Link>

        <Link href="/" style={{ marginTop: "10px", display: "inline-block" }}>
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}

const cardStyle = {
  display: "block",
  padding: "14px 16px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  textDecoration: "none",
  color: "#111",
  background: "#fafafa",
};
