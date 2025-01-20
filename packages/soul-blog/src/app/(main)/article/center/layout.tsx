import SideMenu from "../../../../components/blog/article/side-menu/side-menu";
export default function ArticleCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex bg-secondary h-screen pt-4 gap-3 px-1">
        <SideMenu className="flex-none w-64 rounded-lg" />
        <div className="flex-1 px-4 bg-background rounded-lg">{children}</div>
      </div>
    </>
  );
}
