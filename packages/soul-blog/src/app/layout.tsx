import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./../styles/globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Soul Site",
  description: "Personal Soul Blog Site",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className} suppressHydrationWarning>
          <AntdRegistry>{children}</AntdRegistry>
          <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}
