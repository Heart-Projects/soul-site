import { createContext } from "react";
import type { ColumnArticleTree } from "@/api/column-articles";
import { Locate, ListCollapse, TableOfContents } from "lucide-react";
export type TreeNodeProps = ColumnArticleTree;
export type TreeContextType = {
  // 设置当前选中的对象的唯一标识
  setActiveItemIdentify?: (identify: string) => void;
  // 当前选中的对象的唯一标识
  activeItemIdentify?: string;
  // 响应菜单操作
  onSelectMenuItem?: (
    source: string,
    action: string,
    item: TreeNodeProps
  ) => void;
  onChangeOrder?: (source: TreeNodeProps, target: TreeNodeProps) => void;
  getCurrentColumnIdentify?: () => string;
};
export const TreeState = createContext<TreeContextType>({});

// 树工具栏
export const TreeToolBar = () => {
  return (
    <div className="flex justify-between leading-loose px-1 items-center">
      <div className="flex gap-1 items-center">
        <TableOfContents size={16} />
        <span>目录</span>
      </div>
      <div className="flex gap-1">
        <Locate size={"1rem"} className="cursor-pointer" />
        <ListCollapse size={"1rem"} className="cursor-pointer" />
      </div>
    </div>
  );
};
