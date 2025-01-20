import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReactNode } from "react";
import { PencilLine, BookText, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { UrlObject } from "url";
const ButtonItem = ({
  label,
  icon,
  href,
}: {
  label: string;
  icon: ReactNode;
  href: string | UrlObject;
}) => {
  return (
    <>
      <Link href={href}>
        <div className=" inline-flex flex-col gap-1 items-center cursor-pointer">
          <span>{icon}</span>
          <span>{label}</span>
        </div>
      </Link>
    </>
  );
};

export default function ArticleCenterCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>文章中心</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-6 justify-between">
        <ButtonItem
          label="写文章"
          icon={<PencilLine />}
          href="/article/create"
        />
        <ButtonItem
          label="文章管理"
          icon={<BookText />}
          href="/article/center/manager/list"
        />
        <ButtonItem
          label="博客搬家"
          icon={<Square />}
          href="/article/center/tools/sync"
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Link href="/article/center/index">进入创作中心</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
