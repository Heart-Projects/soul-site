import { CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import Card from "antd/es/card/Card";
import Link from "next/link";
import { CircleCheckBig } from "lucide-react";
export default function ArticlePublishSuccess({ id }: { id: number }) {
  return (
    <div className="flex justify-center items-center min-h-lvh">
      <Card className="w-1/3">
        <CardTitle>
          <div className="flex py-1 px-2 leading-6">
            <CircleCheckBig className=" text-green-500 text-base" />
            <div className="ml-2 text-xl">文章发布成功</div>
          </div>
        </CardTitle>
        <CardFooter>
          <div className="p-4 flex gap-3">
            <Link href="/article/create">继续创作</Link>
            <Link href="/article/center/manager/list">文章管理</Link>
            <Link href={`/article/edit/${id}`}>重新编辑</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
