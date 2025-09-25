"use client";

import { useSearchParams } from "next/navigation";

import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

function ERROR_404_PAGE({ message }: { message: string }) {
  const searchParams = useSearchParams();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>用户 {searchParams.get("u")} 不存在</AlertTitle>
        <AlertDescription>
          当前用户不存在，无法跳转到用户的主页
        </AlertDescription>
        <Link className="mt-4 text-primary" href="/">
          返回首页
        </Link>
      </Alert>
    </div>
  );
}

export default ERROR_404_PAGE;
