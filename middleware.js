import { NextResponse } from "next/server";

export function middleware(req) {
  const protegidas = [
    "/dashboard",
    "/retiros",
    "/pagos",
    "/aprobaciones",
    "/socios",
  ];

  const pathname = req.nextUrl.pathname;
  const esProtegida = protegidas.some((ruta) => pathname.startsWith(ruta));

  if (!esProtegida) {
    return NextResponse.next();
  }

  const auth = req.headers.get("authorization");

  const usuario = "eco";
  const clave = "lev2026";
  const basicAuth = "Basic " + Buffer.from(`${usuario}:${clave}`).toString("base64");

  if (auth !== basicAuth) {
    return new Response("Acceso restringido", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Eco Lev"',
      },
    });
  }

  return NextResponse.next();
}
