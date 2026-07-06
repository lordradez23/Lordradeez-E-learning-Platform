import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("jwtToken")?.value
  let payload = null;

  try {
    if (token) {
      const secretKey = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
      const verified = (await jwtVerify(token, secretKey)) as { payload: JwtPayload };
      payload = verified.payload;
    }
  } catch (error) {
    console.error("Invalid JWT:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // protected routes - if there's no token redirect to login
  if (!token && path.startsWith("/account")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // protected course videos - if there's no token redirect to login
  const isCourseVideos = /^\/all-courses\/[^/]+\/videos(\/.*)?$/.test(path);

  if (!token && isCourseVideos) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // protect admin routes
  if (path.startsWith("/admin")) {
    if (!token || !payload || payload?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // protect instructor routes
  if (path.startsWith("/instructor-dashboard")) {
    if (!token || !payload || !["ADMIN", "INSTRUCTOR"].includes(payload.role)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // if there's token redirect to user homepage
  if (token && path === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // if there's no token redirect to visitor homepage
  if (!token && path === "/home") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && (path === "/login" || path === "/register")) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // access to the pathname inside server component
  const url = new URL(request.url);
  const response = NextResponse.next();
  response.headers.set("x-pathname", url.pathname);
  return response;
}

export const config = {
  matcher: [
    "/account/:path*",
    "/admin/:path*",
    "/login",
    "/register",
    "/home",
    "/",
    "/instructor-dashboard/:path*",
    "/all-courses/:slug/videos/:path*",
    "/courses-category/:path*",
  ],
};
