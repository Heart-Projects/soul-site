import MainUserPageIndex from "@/site-pages/main/user-index";
import { requestUserSiteConfig } from "@/api/user";
import { redirect } from "next/navigation";
export default async function UserHomePage({
  params,
  searchParams,
}: {
  params: Promise<{ user: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { user } = (await params) || {};
  const { success, data } = await requestUserSiteConfig(user);
  if (!success) {
    return redirect("/error/no-user?u=" + user);
  }
  console.log(searchParams);
  console.log(params);
  const pageIndex = searchParams.p || 1;
  console.info("user main page");
  const category = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category || "";
  return (
    <main className="min-h-screen min-w-screen scollbar">
      <MainUserPageIndex
        userIdentify={user}
        pageIndex={Number(pageIndex)}
        category={category}
      />
    </main>
  );
}
