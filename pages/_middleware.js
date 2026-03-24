import { NextResponse } from "next/server";

export function middleware(req) {
  const url = req.nextUrl.clone();

  // rutas que queremos proteger
  const protegidas = [
    "/dashboard",
    "/retiros",
    "/pagos",
    "/aprobaciones",
    "/socios"
  ];

  const esProtegida = protegidas.some((ruta) =>
    url.pathname.startsWith(ruta)
  );

  if (esProtegida) {
    const auth = req.headers.get("authorization");

    const usuario = "eco";
    const clave = "lev2026";

    const basicAuth = "Basic " + btoa(`${usuario}:${clave}`);

    if (auth !== basicAuth) {
      return new Response("Acceso restringido", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Eco Lev"',
        },
      });
    }
  }

  return NextResponse.next();
}
