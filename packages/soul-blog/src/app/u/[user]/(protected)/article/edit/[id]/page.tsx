import ArticleEditor from "@/components/blog/article/edit";
import { requestArticleEditDetail } from "@/api/user-article";
import { getAuthHeader } from "@/lib/cookie-utils";
const ArticleEdit = async ({ params }: { params: { id: number } }) => {
  const authHeader = await getAuthHeader();

  const res = await requestArticleEditDetail(
    { articleId: params.id },
    authHeader
  );
  const { success, data, message } = res;

  return <ArticleEditor article={data} />;
};
export default ArticleEdit;
