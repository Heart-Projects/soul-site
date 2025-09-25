import ArticlePublishSuccess from "@/components/blog/article/create/article-publish-success";
import NormalHeader from "@/components/blog/header/normal-header";
export default function ArticlePublishSuccessPage(params: {
  params: { id: string };
}) {
  const { id } = params.params;
  return (
    <>
      <NormalHeader />
      <ArticlePublishSuccess id={Number(id)} />
    </>
  );
}
