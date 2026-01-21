export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 20, maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ marginBottom: 4 }}>App Residuos · Eco Lev</h1>
      <p style={{ marginTop: 0, color: "#555" }}>
        Gestión interna de socios y entregas de compost
      </p>

      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        <a href="/socios" style={cardStyle}>
          <strong>Socios</strong>
          <div style={{ color: "#666", marginTop: 6 }}>Ver / cargar socios</div>
        </a>

        <a href="/entregas" style={cardStyle}>
          <strong>Entregas</strong>
          <div style={{ color: "#666", marginTop: 6 }}>Cargar una entrega</div>
        </a>

        <a href="/tablero" style={cardStyle}>
          <strong>Tablero</strong>
          <div style={{ color: "#666", marginTop: 6 }}>Próximas entregas y alertas</div>
        </a>
      </div>

      <div style={{ marginTop: 30, fontSize: 12, color: "#777" }}>
        Primera pantalla (provisoria). Después la dejamos linda.
      </div>
    </div>
  );
}

const cardStyle = {
  display: "block",
  padding: 14,
  border: "1px solid #ddd",
  borderRadius: 10,
  textDecoration: "none",
  color: "#111",
  background: "#fafafa"
};
