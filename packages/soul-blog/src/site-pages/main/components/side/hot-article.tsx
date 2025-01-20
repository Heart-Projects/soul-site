import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ArticleItem = ({ index, title }: { index: number; title: string }) => {
  return (
    <p className="inline-block truncate">
      <span className="inline-block pr-1">{index}.</span>
      {title}
    </p>
  );
};
export default function HotArticle() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>热门文章</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <ArticleItem index={1} title="java 设计模式" />
        <ArticleItem index={2} title="工厂模式" />
        <ArticleItem index={3} title="工厂模式" />
      </CardContent>
    </Card>
  );
}
