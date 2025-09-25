import TopHeader from "@/components/blog/header/top-header";
import { Suspense } from "react";
export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <TopHeader />
        {children}
      </Suspense>
    </main>
  );
}
