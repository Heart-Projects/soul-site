import { clearSaveCookie } from "./localstore";

export const LoginOut = () => {
  // 检测是否是在 浏览器 中
  if (typeof window !== "undefined") {
    clearSaveCookie();
    window.location.href = "/login";
  }
};
