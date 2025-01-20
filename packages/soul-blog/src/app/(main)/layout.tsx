import TopHeader from "@/components/blog/header/top-header";
import { CheckUserInfo } from "@/components/global/user";
import { Suspense } from "react";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        {/* <CheckUserInfo /> */}
        <TopHeader />
        {children}
      </Suspense>
    </main>
  );
}
