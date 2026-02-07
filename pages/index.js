export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      fontFamily: "Arial, sans-serif",
      backgroundColor: "#f4f7f5",
      textAlign: "center",
      padding: "20px"
    }}>
      <h1 style={{ color: "#2f6b4f", fontSize: "2.5rem" }}>
        Proyecto Eco Lev
      </h1>

      <p style={{ maxWidth: "500px", fontSize: "1.1rem", marginTop: "20px" }}>
        App interna para la gestión de socios y entregas de compost.
      </p>

    <a
  href="/dashboard"
  style={{
    display: "inline-block",
    marginTop: "30px",
    padding: "12px 24px",
    backgroundColor: "#2f6b4f",
    color: "white",
    textDecoration: "none",
    borderRadius: "8px",
    fontWeight: "bold",
  }}
>
  Ingresar
</a>


>
    </div>
  );
}
