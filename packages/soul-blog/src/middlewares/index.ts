import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { TOKEN_KEY } from "@/lib/localstore";

type HandleResult = {
  release: boolean;
  result: NextResponse | Response | null;
};

interface HandleFunc {
  (request: NextRequest): Promise<HandleResult>;
}

const handles: HandleFunc[] = [];

// 不需要验证的路由
const publicRoutes = ['/login', '/register', '/api/auth', '/api/public', '/'];
// 需要验证的路由
const protectedRoutes = ['/dashboard', '/profile', '/settings', 'article/create'];

const isPublicRoute = (pathname: string) => {
  return publicRoutes.some(route => pathname.startsWith(route));
};

const isProtectedRoute = (pathname: string) => {
  return protectedRoutes.some(route => pathname.startsWith(route));
};

const JwtAuthCheck: HandleFunc = async (request) => {
  const serverCookies = await cookies();
  const auth = serverCookies.get(TOKEN_KEY)?.value || "";
  const pathname = request.nextUrl.pathname;
  console.log('JwtAuthCheck', auth, pathname)
  // 设置 Authorization header
  if (!request.headers.get('Authorization') && auth !== '') {
    request.headers.set('Authorization', `Bearer ${auth}`);
  }

  // 处理公开路由
  if (isPublicRoute(pathname)) {
    if (auth) {
      // 已登录用户访问公开路由，重定向到首页
      return {
        release: false,
        result: NextResponse.redirect(new URL("/", request.url))
      };
    }
    return { release: true, result: null };
  }

  // 处理需要验证的路由
  if (isProtectedRoute(pathname)) {
    if (!auth) {
      // 未登录用户访问受保护路由，重定向到登录页
      return {
        release: false,
        result: NextResponse.redirect(new URL("/login", request.url))
      };
    }
    return { release: true, result: null };
  }

  return { release: true, result: null };
};

const routerCheck: HandleFunc = async (request) => {
  return {
    release: true,
    result: null
  };
};

handles.push(JwtAuthCheck);
handles.push(routerCheck);

type MiddleResult = {
  release: boolean;
  result: NextResponse | Response | null;
}
export default async function MiddlewareHandlers(request: NextRequest): Promise<MiddleResult> {
  for (const handle of handles) {
    const res = await handle(request);
    if (!res.release) {
      return {
        release: false,
        result: res.result
      };
    }
  }
  return { release: true, result: NextResponse.next() } ;
}
