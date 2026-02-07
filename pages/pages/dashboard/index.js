import Link from "next/link";

export default function Dashboard() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "24px" }}>
      <h1>Panel Eco Lev</h1>
      <p>En construcción 🚧</p>

      <Link href="/" style={{ display: "inline-block", marginTop: "16px" }}>
        ← Volver al inicio
      </Link>
    </div>
  );
}
