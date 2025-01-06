import { NextResponse } from "next/server";
// import { parse } from "cookie";
import { jwtVerify } from "jose";

export async function middleware(request) {
  // const cookies = parse(request.headers.get("cookie") || "");
  const token = request.cookies.get("jwtToken");
  // console.log("in here", token);
  if (request.nextUrl.pathname.startsWith("/login")) {
    if (token !== undefined) {
      try {
        const verify = await jwtVerify(
          token.value,
          new TextEncoder().encode(process.env.JWT_SECRET)
        );
        return NextResponse.redirect(new URL("/", request.url));
      } catch (e) {
        request.cookies.delete("jwtToken");
        return NextResponse.next();
      }
    }
    return NextResponse.next();
  } else {
    if (token === undefined) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const verify = await jwtVerify(
        token.value,
        new TextEncoder().encode(process.env.JWT_SECRET)
      );
      const res = NextResponse.next();
      res.headers.set("userId", verify.payload.userId);
      return res;
    } catch (e) {
      request.cookies.delete("jwtToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/((?!api/login|api/register|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
