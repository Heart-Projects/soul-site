import UserMainPageIndex from "@/site-pages/main/user-index";
function UserArticleCategory({
  params,
  searchParams,
}: {
  params: { category: string; user: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = params.category || "";
  const userIdentify = params.user || "";
  const pageIndex = searchParams.p || 1;
  return (
    <>
      <UserMainPageIndex
        userIdentify={userIdentify}
        category={category}
        pageIndex={Number(pageIndex)}
      />
    </>
  );
}

export default UserArticleCategory;
