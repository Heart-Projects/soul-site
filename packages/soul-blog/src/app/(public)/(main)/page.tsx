import MainPageIndex from "@/site-pages/main";
export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pageIndex = searchParams.p || 1;
  console.info("main page");
  const category = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category || "";
  return (
    <main className="min-h-screen min-w-screen scollbar">
      <MainPageIndex pageIndex={Number(pageIndex)} category={category} />
    </main>
  );
}
