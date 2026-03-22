import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "40px 20px",
        maxWidth: "700px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1 style={{ marginBottom: "10px" }}>Eco Lev 🌱</h1>

      <p style={{ color: "#555", marginBottom: "30px" }}>
        Servicio de recuperación de residuos orgánicos en General Levalle
      </p>

      <div style={{ display: "grid", gap: "16px" }}>
        <Link href="/alta">
          <button style={btnVerde}>
            🌱 Sumarme al servicio
          </button>
        </Link>

        <Link href="/dashboard">
          <button style={btnNegro}>
            🔐 Ingresar al panel
          </button>
        </Link>
      </div>

      <p style={{ marginTop: "40px", fontSize: "14px", color: "#777" }}>
        Proyecto Eco Lev – Economía circular con identidad territorial
      </p>
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

const btnNegro = {
  padding: "14px",
  fontSize: "16px",
  background: "#111",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
