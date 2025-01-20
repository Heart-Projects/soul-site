"use client";
import { UserRoundPen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  type ArticleColumnCategory,
  type ArticleColumnCategoryTree,
} from "@/api/column-category";
import {
  createContext,
  ReactElement,
  useState,
  useContext,
  useRef,
  useMemo,
  memo,
  useCallback,
  useEffect,
  KeyboardEvent,
} from "react";
import { requestColumnCategoryTreeData } from "@/api/column-category";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { findTreeItem } from "@/lib/treeUtils";
import { useRemoteRequest } from "@/hooks/use-remote-request";
import Link from "next/link";

const CategoryItem = ({ item }: { item: ArticleColumnCategory }) => {
  const { activeItem, setActiveItem } = useContext(ColumnCategoryContext);
  const isActive = activeItem?.name === item.name;
  return (
    <div className="group flex justify-between text-sidebar-foreground hover:bg-card hover:rounded-md leading-loose px-1 truncate cursor-pointer ">
      <div
        className="flex gap-2 flex-1 cursor-pointer"
        onClick={() => setActiveItem?.(item)}
      >
        {/* {item.icon && <item.icon />} */}
        <span className={isActive ? "text-blue-600" : ""}>{item.name}</span>
      </div>
      <div className="flex-none w-1 opacity-0 group-hover:opacity-100 group-hover:w-6"></div>
    </div>
  );
};

const CategoryGroup = memo(function CategoryGroupC({
  item,
}: {
  item: ArticleColumnCategoryTree;
}) {
  const { activeItem, setActiveItem } = useContext(ColumnCategoryContext);
  const { children } = item;
  children.sort((a, b) => a.name.localeCompare(b.name));
  const isActive = activeItem?.id === item.id;
  return (
    <div>
      <div className="group flex justify-between pt-1 hover:bg-card hover:rounded-md pr-2">
        <div
          className="flex-grow flex gap-1 cursor-pointer"
          onClick={() => setActiveItem?.(item)}
        >
          <span className=" inline-block text-sm">
            {/* {item.icon && item.icon} */}
          </span>
          <span className={isActive ? "text-blue-600" : ""}>{item.name}</span>
        </div>
        <div className="flex-none opacity-0 w-0 group-hover:opacity-100 group-hover:w-4"></div>
      </div>
      <div className="flex flex-col gap-1 pl-6">
        {item.children?.map((item, index) => {
          return <CategoryItem key={item.name} item={item} />;
        })}
      </div>
    </div>
  );
});

const ColumnCategoryContext = createContext<{
  activeItem?: ArticleColumnCategory;
  setActiveItem?: (item: ArticleColumnCategory) => void;
}>({});

const ColumnCategoryIndex = memo(function ColumnCategoryC({
  onChangeActiveItem,
}: {
  onChangeActiveItem?: (item?: ArticleColumnCategory) => void;
}) {
  console.log("render ColumnCategoryIndex");
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const initialActiveId = searchParams.get("id");
  const [search, setSearch] = useState("");
  const [activeItem, setActiveItem] = useState<ArticleColumnCategory>();
  const [categoryData, setCategoryData] = useState<ArticleColumnCategoryTree[]>(
    []
  );
  const { doRemoteRequest: onRefreshTreeData, loading } = useRemoteRequest(
    requestColumnCategoryTreeData,
    {
      successCallback: (serverData) => {
        const data = serverData as ArticleColumnCategoryTree[];
        if (data.length === 0) {
          return;
        }
        const defaultActiveItem = findTreeItem(data, Number(initialActiveId));
        setActiveItem((defaultActiveItem as ArticleColumnCategory) ?? data[0]);
        // 按名称排序
        data.sort((a, b) => a.name.localeCompare(b.name));
        setCategoryData(data);
      },
    }
  );

  const onSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearch(e.currentTarget?.value);
      console.log(search);
    }
  };
  useEffect(() => {
    onRefreshTreeData();
  }, []);

  useEffect(() => {
    if (!activeItem) {
      return;
    }
    onChangeActiveItem?.(activeItem);
    router.push(`${pathName}?id=${activeItem?.id}`);
  }, [activeItem, onChangeActiveItem]);
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <div className="flex justify-between items-center gap-1">
        <Input
          placeholder="输入名称按回车搜索"
          className=" flex-1 h-8"
          onKeyDown={onSearch}
        />
        <div>
          <Button variant="link">
            <Link href={"/column-manager" + `?id=${activeItem?.id}`}>
              <UserRoundPen />
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-col mt-1 px-1">
        <ColumnCategoryContext.Provider
          value={{
            activeItem,
            setActiveItem,
          }}
        >
          {categoryData.length > 0 &&
            categoryData.map((item, index) => {
              return <CategoryGroup key={item.name} item={item} />;
            })}
        </ColumnCategoryContext.Provider>
      </div>
    </>
  );
});
ColumnCategoryIndex.displayName = "ColumnCategory";
export default ColumnCategoryIndex;
