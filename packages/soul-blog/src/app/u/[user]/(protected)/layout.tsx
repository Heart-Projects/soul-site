import { validSession } from "@/lib/cookie-utils";
import { redirect } from "next/navigation";

export default async function ProtectedPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 保护页统一校验用户是否登录，未登录则跳转到登录页
  const user = await validSession();
  if (!user || !user.hasLogin) {
    redirect("/login");
  }
  return { children };
}
