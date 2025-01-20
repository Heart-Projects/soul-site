import { House } from "lucide-react";
import { useContext } from "react";
import { cn } from "@/lib/utils";
import type { TreeNodeProps } from "./column-toc-tree";
import { TreeState } from "./column-toc-tree";
const HomeTreeNode = ({ item }: { item: TreeNodeProps }) => {
  const { setActiveItemIdentify, activeItemIdentify } = useContext(TreeState);
  const isActive = activeItemIdentify === item.identify;
  return (
    <div
      className="flex items-center justify-between text-sidebar-foreground hover:bg-card hover:rounded-md leading-loose px-1 cursor-pointer"
      onClick={() => setActiveItemIdentify?.(item.identify || "")}
    >
      <House size={16} className="mr-1" />
      <span className={cn("flex-1 truncate", isActive ? " text-blue-500" : "")}>
        {item.title}
      </span>
    </div>
  );
};

export default HomeTreeNode;
