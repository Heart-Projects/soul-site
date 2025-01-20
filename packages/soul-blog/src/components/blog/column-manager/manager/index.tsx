"use client";
import ColumnCategoryIndex from "./category";
import { useCallback, useState } from "react";
import ColumnTable from "./column-table";
import { ArticleColumnCategory } from "@/api/column-category";

function ColumnPageIndex() {
  const [activeItem, setActiveItem] = useState<ArticleColumnCategory>();
  const onChangeActiveItem = useCallback((item?: ArticleColumnCategory) => {
    setActiveItem(item);
  }, []);
  return (
    <div className="flex bg-secondary gap-3 px-1 pt-1 h-[calc(100vh-3.5rem)]">
      <div className="flex-none w-52 rounded-lg h-full overflow-visible">
        <ColumnCategoryIndex onChangeActiveItem={onChangeActiveItem} />
      </div>
      <div className="flex-1 flex flex-col bg-background rounded-lg px-2 overflow-scroll">
        <ColumnTable activeItem={activeItem} />
      </div>
    </div>
  );
}

export default ColumnPageIndex;
