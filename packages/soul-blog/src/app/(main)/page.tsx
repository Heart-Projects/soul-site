import MainPageIndex from "@/site-pages/main";
export default function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const pageIndex = searchParams.p || 1;
  console.log(searchParams);
  return (
    <main className="min-h-screen min-w-screen scollbar">
      <MainPageIndex pageIndex={Number(pageIndex)} />
    </main>
  );
}
