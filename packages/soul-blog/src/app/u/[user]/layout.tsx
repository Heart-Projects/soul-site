import TopHeader from "@/components/blog/header/top-header";
import { requestUserSiteConfig } from "@/api/user";
import { redirect } from "next/navigation";
import { Suspense } from "react";
export default async function MainLayout({
  params,
  children,
}: {
  params: Promise<{ user: string }>;
  children: React.ReactNode;
}) {
  const { user } = (await params) || {};
  const { success, data } = await requestUserSiteConfig(user);
  if (!success) {
    return redirect("/error/no-user?u=" + user);
  }
  console.log(params);
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <TopHeader userIdentity={user} />
        {children}
      </Suspense>
    </main>
  );
}
