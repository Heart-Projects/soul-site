import ArticlePage from "./article-page";
import { ArticleTag } from "@/components/blog/article/components";
import type { UserArticleItem } from "@/api/user-article";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { cookies } from "next/headers";
import { TOKEN_KEY } from "@/lib/localstore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, Star, ThumbsUp, Activity } from "lucide-react";
import {
  requestUserArticleList,
  UserArticleListParams,
} from "@/api/user-article";
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
  return (
    <div className="mb-4 p-2 border-b">
      <h2 className="text-xl px-2 hover:text-blue-600">
        <Link
          href={`/article/detail/${item.userId}/${item.id}`}
          target="_blank"
        >
          {item.title}
        </Link>
      </h2>
      <div className="pt-4 text-base px-2 truncate text-slate-500">
        {item.summary}
      </div>
      <div className="flex">
        <div className="flex-1">
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
        <div className="flex-none max-w-32 max-h-20"></div>
      </div>
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
}: {
  category?: string;
  pageIndex: number;
}) => {
  const pagePrams: UserArticleListParams = {
    pageIndex: pageIndex || 1,
    pageSize: 10,
    category: category || "",
  };
  const cookieList = await cookies();
  const token = cookieList.get(TOKEN_KEY)?.value || "";
  const response = await requestUserArticleList(pagePrams, {
    Authorization: token,
  });
  const { data, success } = response;
  const articleList = success ? data.list : [];
  const total = success ? data.total : 0;
  const totalPages = Math.ceil(total / pagePrams.pageSize);
  if (total === 0) {
    return (
      <Alert>
        <Bell className="h-4 w-4" />
        <AlertTitle>暂无相关分类的文章</AlertTitle>
        <AlertDescription>
          <Link href="/article/create">去创建吧</Link>
        </AlertDescription>
      </Alert>
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
