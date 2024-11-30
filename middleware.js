import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(request) {
  const cookies = parse(request.headers.get("cookie") || "");
  const token = cookies.jwtToken;
  console.log(token);
  if (request.nextUrl.pathname.startsWith("/login")) {
    if (token !== undefined) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  } else {
    if (token === undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/login", "/"],
};
