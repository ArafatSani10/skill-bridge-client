import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  const { data } = await userService.getSession();
  const user = data?.user;

  if (!user) {
    if (
      pathname.startsWith("/admin-dashboard") || 
      pathname.startsWith("/tutor-dashboard") || 
      pathname.startsWith("/student-dashboard")
    ) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  const userRole = user.role;

  if (userRole === Roles.admin) {
    if (pathname.startsWith("/tutor-dashboard") || pathname.startsWith("/student-dashboard")) {
      return NextResponse.redirect(new URL("/admin-dashboard", request.url));
    }
  }

  if (userRole === Roles.tutor) {
    if (pathname.startsWith("/admin-dashboard") || pathname.startsWith("/student-dashboard")) {
      return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
    }
  }

  if (userRole === Roles.student) {
    if (pathname.startsWith("/admin-dashboard") || pathname.startsWith("/tutor-dashboard")) {
      return NextResponse.redirect(new URL("/student-dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard/:path*",
    "/tutor-dashboard/:path*",
    "/student-dashboard/:path*",
    "/admin-dashboard",
    "/tutor-dashboard",
    "/student-dashboard",
  ],
};