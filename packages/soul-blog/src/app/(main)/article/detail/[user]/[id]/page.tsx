import ArticleDetail from "@/components/blog/article/detail/index";
export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ user: string; id: string }>;
}) {
  const { user, id } = (await params) || {};
  console.log(user, id);
  return <ArticleDetail userId={Number(user)} articleId={Number(id)} />;
}
