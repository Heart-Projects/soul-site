import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { TOKEN_KEY } from "@/lib/localstore";
type HandleResult = {
  // 是否放行到下一个中间件
  release: boolean
  // 结果
  result: NextResponse | Response | null
}
interface HandleFunc {
  (request: NextRequest): Promise<HandleResult>
}
const handles: HandleFunc[] = []

const JwtAuthCheck: HandleFunc = async (request) => {
  const serverCookies = await cookies()
  // const serverHeaders = await headers()
  // console.log('serverHeaders=' + serverHeaders.get('authorization'))
  const auth = serverCookies.get(TOKEN_KEY)?.value || ""
  if (!request.headers.get('Authorization') && auth !== '') {
    // console.log('set header')
    request.headers.set('Authorization', auth)
  }
  if (!auth && request.nextUrl.pathname !== "/login") {
    return {
      release: false,
      result: NextResponse.redirect(new URL("/login", request.url))
    }
  }
  if (auth && request.nextUrl.pathname === "/login") {
    const homeUrl = new URL("/",request.nextUrl.origin)
    return {
      release: false,
      result: NextResponse.redirect(homeUrl)
    }
  }
  return {
    release: true,
    result: null
  }
}
const task:Promise<boolean> = new Promise((resolve) => {
  setTimeout(() => {
    resolve(true)
  },10000)
})
const routerCheck: HandleFunc = async (request) => {
  return {
    release: true,
    result: null
  }
}
handles.push(JwtAuthCheck)
handles.push(routerCheck)

export default async function MiddlewareHandlers(request: NextRequest ) {
    for (const handle of handles) {
      const res = await handle(request)
      if (!res.release) {
        return res
      } else {
        continue
      }
    }
    return {
      release: true,
      result: null
    }
}
