import MainPageIndex from "@/site-pages/main";
function ArticleCategory({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = params.category || "";
  const pageIndex = searchParams.p || 1;
  console.log(params, searchParams);
  return (
    <>
      <MainPageIndex category={category} pageIndex={Number(pageIndex)} />
    </>
  );
}

export default ArticleCategory;
