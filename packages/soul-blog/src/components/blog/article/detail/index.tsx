import RecentArticleCard from "./recent-article-card";
import UserInfoCard from "./user-info-card";
import { ReactNode } from "react";
import { requestArticleDetail } from "@/api/user-article";
import { getAuthHeader } from "@/lib/cookie-utils";
import { ArticleTag } from "@/components/blog/article/components";
import { SoulPlateEditorPreview } from "@/components/editor/site-editor/plate-editor-soul-preview";
import { Share, Star, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ActionButton = ({ label, icon }: { label: string; icon: ReactNode }) => {
  return (
    <div className="">
      <div className=" w-14 h-14 rounded-full border border-gray-200 flex justify-center items-center bg-background cursor-pointer">
        {icon}
      </div>
      <span className=" inline-block pl-2 mt-2">{label}</span>
    </div>
  );
};

const ArticleDetail = async ({
  userId,
  articleId,
}: {
  userId: number;
  articleId: number;
}) => {
  const authHeader = await getAuthHeader();
  const articleDetail = await requestArticleDetail(
    { userId, articleId },
    authHeader
  );
  const { success, message, data } = articleDetail;
  const { next, pre } = data;
  return (
    <div className="bg-second-background">
      <div className="flex px-5 gap-6 pt-6 w-full">
        <div className="flex-none w-20 relative ">
          <div className="flex flex-col items-center gap-8 pt-12 sticky top-8 left-8">
            <ActionButton label="点赞" icon={<ThumbsUp />} />
            <ActionButton label="分享" icon={<Share />} />
            <ActionButton label="收藏" icon={<Star />} />
          </div>
        </div>
        <div className="flex-1 flex relative justify-end">
          <div className="flex-1  min-h-80 rounded-lg">
            <div className="bg-background">
              <div className=" px-8">
                <h3 className=" text-2xl font-bold">{data.title}</h3>
                <div className="pl-1 px-2 pr-12 ">
                  <div className="border border-gray-100 p-2 bg-gray-100 rounded-lg">
                    <p>创建于： {data.updatedAt}</p>
                    <div className="flex gap-2 items-center">
                      <span className=" inline-block px-2 py-1">文章标签</span>
                      <div className="flex gap-2">
                        {data.labels.map((label, index) => (
                          <ArticleTag key={index}>{label.name}</ArticleTag>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <SoulPlateEditorPreview
                initialValue={JSON.parse(data.content)}
                className="justify-end"
              />
              <div className=" h-[1px] w-full bg-gray-100 mt-1"></div>
              <div className=" flex justify-center gap-20 mt-4 bg-background">
                <ActionButton label="点赞" icon={<ThumbsUp />} />
                <ActionButton label="分享" icon={<Share />} />
                <ActionButton label="收藏" icon={<Star />} />
              </div>
              <div className="flex justify-between gap-4 px-4 py-1 max-w">
                <div className="truncate max-w-64">
                  {pre && (
                    <>
                      上一篇:
                      <Link href={`/article/detail/${userId}/${pre.id}`}>
                        <span className="hover:text-blue-600 inline-block pl-1">
                          {pre.title}
                        </span>
                      </Link>
                    </>
                  )}
                </div>
                <div className=" truncate max-w-64">
                  {next && (
                    <>
                      下一篇:
                      <Link href={`/article/detail/${userId}/${next.id}`}>
                        <span className="hover:text-blue-600 inline-block pl-1">
                          {next.title}
                        </span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 bg-background">
              <div className="px-4 py-2 flex gap-1">
                <Input placeholder="发表评论" />
                <Button>发表</Button>
              </div>
            </div>

            <Card className=" mt-4 mb-2">
              <CardHeader>相关文章</CardHeader>
              <CardContent>skdkk</CardContent>
            </Card>
          </div>
          <div className=" flex-none w-96 ">
            <div className="sticky top-8 left-0 flex flex-col items-center gap-2 ">
              <UserInfoCard />
              <RecentArticleCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
