import ArticlePage from "./article-page";
import { ArticleTag } from "@/components/blog/article/components";
import type { UserArticleItem } from "@/api/user-article";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { TOKEN_KEY } from "@/lib/localstore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, Star, ThumbsUp, Activity } from "lucide-react";
import Image from "next/image";
import { requestArticleList, UserArticleListParams } from "@/api/user-article";
const ArticleStatisticsTag = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex gap-1 items-center text-slate-600", className)}>
      {children}
    </div>
  );
};

const ArticleItem = ({ item }: { item: UserArticleItem }) => {
  const hasThumbnail = !!item.thumbnail;
  return (
    <div className="mb-4 p-2 border-b flex ">
      <div className="flex-1 overflow-hidden">
        <h2 className="text-xl px-2 hover:text-blue-600">
          <Link
            href={`/u/${item.userIdentify}/article/${item.id}`}
            target="_blank"
          >
            {item.title}
          </Link>
        </h2>
        <div className="pt-4 text-base px-2 truncate text-slate-500">
          {item.summary}
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-4 pt-2 pl-1">
            {item.labels.map((label, index) => {
              return <ArticleTag key={index}>{label.name}</ArticleTag>;
            })}
          </div>
          <div className="flex gap-4 pt-3">
            <ArticleStatisticsTag>
              <Activity size={14} className="text-xs" />
              <span>100</span>
            </ArticleStatisticsTag>
            <ArticleStatisticsTag>
              <Star size={14} />
              <span>100</span>
            </ArticleStatisticsTag>
            <ArticleStatisticsTag>
              <ThumbsUp size={14} />
              <span>100</span>
            </ArticleStatisticsTag>
          </div>
        </div>
      </div>
      {hasThumbnail && (
        <div className="flex-none w-36 h-28 relative m-auto">
          <Link
            href={`/u/${item.userIdentify}/article/${item.id}`}
            target="_blank"
          >
            <Image
              src={item.thumbnail || ""}
              alt={item.title}
              fill // 关键属性，图片会填充父级容器
              style={{ objectFit: "cover" }} // 根据需要设置填充模式
              className="object-cover"
              unoptimized={true} // 关闭图片优化，目前上传的封面没有尺寸，自动优化会在url后面加上尺寸参数，导致请求图片失败
            />
          </Link>
        </div>
      )}
    </div>
  );
};
const ArticleItemList = ({
  articleList,
}: {
  articleList: UserArticleItem[];
}) => {
  return (
    <div>
      {articleList.map((item, index) => {
        return <ArticleItem key={item.id} item={item} />;
      })}
    </div>
  );
};

const ArticleList = async ({
  category,
  pageIndex,
  userIdentify,
}: {
  category?: string;
  pageIndex: number;
  userIdentify?: string;
}) => {
  const pagePrams: UserArticleListParams = {
    userIdentify: userIdentify || "",
    pageIndex: pageIndex || 1,
    pageSize: 10,
    category: category || "",
  };
  console.log("pagePrams", pagePrams);
  const { data, success } = await requestArticleList(pagePrams);
  const articleList = success ? data.list : [];
  const total = success ? data.total : 0;
  const totalPages = Math.ceil(total / pagePrams.pageSize);
  if (total === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <Alert className="max-w-96">
          <Bell className="h-4 w-4" />
          <AlertTitle className="py-2">暂无相关分类的文章</AlertTitle>
          <AlertDescription>
            <Link href="/article/create">去创建吧</Link>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  return (
    <>
      <ArticleItemList articleList={articleList} />
      <ArticlePage
        totalPage={totalPages}
        pageIndex={pageIndex || 1}
        category={category}
      />
    </>
  );
};

export default ArticleList;
