import ArticleCenterCard from "./components/side/article-center";
import HotArticle from "./components/side/hot-article";
import AboutUs from "./components/side/about-us";
import ArticleList from "./components/article-item-list";
import { cn } from "@/lib/utils";
import Link from "next/link";
// import { useSearchParams, useParams } from "next/navigation";
import { NextRequest } from "next/server";
const TopTab = ({
  children,
  linkHref = "/",
  className,
}: {
  children: React.ReactNode;
  linkHref?: string;
  className?: string;
}) => {
  return (
    <Link href={linkHref}>
      <span className={cn("cursor-pointer inline-block px-2", className)}>
        {children}
      </span>
    </Link>
  );
};

const TopNavHeader = ({
  className,
  initialCategory = "",
}: {
  className?: string;
  initialCategory?: string;
}) => {
  const topNavList = [
    // {
    //   name: "",
    //   label: "首页",
    //   href: "/",
    // },
    {
      name: "news",
      label: "近期原创",
      href: "/article/news",
    },
    {
      name: "backend",
      label: "后端",
      href: "/article/backend",
    },
    {
      name: "frontend",
      label: "前端",
      href: "/article/frontend",
    },
  ];
  return (
    <div className={cn("bg-white px-20 py-2", className)}>
      {topNavList.map((item, index) => {
        return (
          <TopTab
            key={index}
            linkHref={item.href}
            className={initialCategory === item.name ? "  text-blue-600" : ""}
          >
            {item.label}
          </TopTab>
        );
      })}
    </div>
  );
};
const MainPageIndex = ({
  category,
  pageIndex = 1,
}: {
  category?: string;
  pageIndex?: number;
}) => {
  return (
    <>
      <div className=" min-h-screen bg-[#f7f8f9] ">
        <TopNavHeader
          className="bg-white px-20 py-2"
          initialCategory={category}
        />
        <div className="flex px-20 justify-center 2xl:gap-10 gap-6 mt-5">
          <div className="flex-auto w-96 bg-white 2xl:w-9/12">
            <ArticleList category={category} pageIndex={pageIndex} />
          </div>
          <aside className="flex-none w-[350px] relative">
            <div className="flex flex-col gap-12 sticky left-0 top-20  ">
              <ArticleCenterCard />
              <HotArticle />
              <AboutUs />
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default MainPageIndex;
