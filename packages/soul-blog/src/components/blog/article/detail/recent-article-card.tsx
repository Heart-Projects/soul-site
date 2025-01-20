import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const ArticleItem = ({ index, title }: { index: number; title: string }) => {
  return (
    <p className="inline-block truncate">
      <span className="inline-block pr-1">{index}.</span>
      {title}
    </p>
  );
};
export default function RecentArticleCard() {
  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>最新文章</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <ArticleItem index={1} title="Python 如何获取 HTTP 请求和响应的 body" />
        <ArticleItem index={2} title="Python 如何获取 HTTP 请求和响应的 body" />
        <ArticleItem index={3} title="Python 如何获取 HTTP 请求和响应的 body" />
      </CardContent>
    </Card>
  );
}
