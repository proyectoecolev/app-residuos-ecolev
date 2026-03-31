import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const rutasProtegidas = [
    "/dashboard",
    "/retiros",
    "/pagos",
    "/aprobaciones",
    "/socios",
  ];

  const esPrivada = rutasProtegidas.some((ruta) =>
    pathname.startsWith(ruta)
  );

  if (!esPrivada) {
    return NextResponse.next();
  }

  const auth = request.headers.get("authorization");

  if (!auth) {
    return new Response("Auth required", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="EcoLev"',
      },
    });
  }

  const base64 = auth.split(" ")[1];
  const decoded = atob(base64);
  const [user, pass] = decoded.split(":");

  if (user === "eco" && pass === "lev2026") {
    return NextResponse.next();
  }

  return new Response("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="EcoLev"',
    },
  });
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/retiros/:path*",
    "/pagos/:path*",
    "/aprobaciones/:path*",
    "/socios/:path*",
  ],
};
