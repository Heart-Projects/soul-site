import ArticleDetail from "@/components/blog/article/detail/index";
export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ user: string; id: string }>;
}) {
  const { user, id } = (await params) || {};
  return <ArticleDetail userId={Number(user)} articleId={Number(id)} />;
}
