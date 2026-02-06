import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { data } = await userService.getSession();
  const user = data?.user as { role: string } | undefined;

  if (!user) {
    if (
      pathname.startsWith("/admin-dashboard") ||
      pathname.startsWith("/tutor-dashboard") ||
      pathname.startsWith("/dashboard")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  const userRole = user.role;

  if (userRole === Roles.admin) {
    if (pathname.startsWith("/tutor-dashboard") || pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  if (userRole === Roles.tutor) {
    if (pathname.startsWith("/admin-dashboard") || pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    }
  }

  if (userRole === Roles.student) {
    if (pathname.startsWith("/admin-dashboard") || pathname.startsWith("/tutor-dashboard")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/tutor-dashboard/:path*",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/tutor-dashboard",
    "/dashboard",
  ],
};