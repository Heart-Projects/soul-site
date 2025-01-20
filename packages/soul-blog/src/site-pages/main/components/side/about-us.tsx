import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function AboutUs() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>关于作者</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p>作者简介: 会点前端的JAVA 工程师 </p>
        <p>兴趣爱好：没啥特别的</p>
        <p>github: https://github.com/shenjin</p>
        <p>人生理想：期望自己的亲人一切安好</p>
      </CardContent>
    </Card>
  );
}
