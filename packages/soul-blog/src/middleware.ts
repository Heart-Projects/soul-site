import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

import MiddlewareHandlers from "./middlewares/index";

export async function middleware(request: NextRequest) {
    // return NextResponse.redirect(new URL('/login', request.url))
  const {release, result} =await MiddlewareHandlers(request)
  if (!release) {
    return result
  }
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|.*.jpg).*)',
}

