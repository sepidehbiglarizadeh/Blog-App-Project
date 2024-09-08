import { NextResponse } from "next/server";
import { middlewareAuth } from "./utils/middlewareAuth";

export async function middleware(req) {
  const pathname = req.nextUrl.pathname;

  if (pathname.startsWith("/signin") || pathname.startsWith("/signup")) {
    const user = await middlewareAuth(req);
    if (user) {
      const homeUrl = new URL(`/`, req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  if (pathname.startsWith("/profile")) {
    const user = await middlewareAuth(req);

    if (!user) {
      const signinUrl = new URL(`/signin?redirect=${pathname}`, req.url);
      return NextResponse.redirect(signinUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/signin", "/signup"],
};
