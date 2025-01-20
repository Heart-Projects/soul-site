import { clearSaveCookie } from "./localstore";
import { NextResponse } from "next/server";
export const LoginOut = () => {
  const a = window;
  if (a) {
    clearSaveCookie();
    window.location.href = "/login";
  } else {
    NextResponse.redirect(new URL("/login", window.location.origin));
  }
};
