import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  memo,
} from "react";
import { useParams } from "next/navigation";
import { ChevronDown, ChevronRight, Locate, ListCollapse } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ColumnArticleTree,
  requestColumnArticlesTreeData,
} from "@/api/column-articles";
import { ColumnSearch } from "@/components/blog/column/components/column-search";
import type {
  TreeNodeProps,
  TreeContextType,
} from "@/components/blog/column/components/column-toc-tree";
import {
  TreeState,
  TreeToolBar,
} from "@/components/blog/column/components/column-toc-tree";
import HomeTreeNode from "@/components/blog/column/components/home-tree-node";
const Tree = ({
  columnIdentify,
  treeData,
  defaultActiveItem,
  onResponseMenuAction,
  initialIdentify,
  onChangeOrder,
}: {
  columnIdentify: string;
  initialIdentify: string;
  treeData: TreeNodeProps[];
  defaultActiveItem?: TreeNodeProps;
  onChangeOrder?: (source: TreeNodeProps, target: TreeNodeProps) => void;
  onResponseMenuAction?: (
    source: string,
    action: string,
    dataItem?: TreeNodeProps
  ) => void;
}) => {
  const [activeItemIdentify, setActiveItemIdentify] = useState(initialIdentify);
  useEffect(() => {
    window.history.pushState(
      {},
      "",
      `/column/view/${columnIdentify}/${activeItemIdentify}`
    );
  }, [activeItemIdentify, columnIdentify]);
  return (
    <TreeState.Provider
      value={{
        setActiveItemIdentify: setActiveItemIdentify,
        activeItemIdentify: activeItemIdentify,
        getCurrentColumnIdentify: () => columnIdentify,
      }}
    >
      <div className=" relative">
        <HomeTreeNode item={defaultIndexNodeItem} />
        <TreeToolBar />
        <div className="max-h-[calc(100vh-10rem)] overflow-y-auto">
          {treeData.map((item, index) => {
            return <TreeNode key={item.id} item={item} />;
          })}
        </div>
      </div>
    </TreeState.Provider>
  );
};

const TreeNode = ({ item }: { item: TreeNodeProps }) => {
  const {
    setActiveItemIdentify,
    activeItemIdentify,
    getCurrentColumnIdentify,
  } = useContext(TreeState);
  const columnIdentify = getCurrentColumnIdentify?.();
  const [open, setOpen] = useState(true);
  const [childItems, setChildItems] = useState<TreeNodeProps[]>(
    item.children || []
  );
  useEffect(() => {
    setChildItems(item.children || []);
  }, [item]);
  const hasChildren = childItems.length > 0;

  const isActive = activeItemIdentify === item.identify;
  return (
    <div className=" -moz-drag-over:bg-green-200  -webkit-drag-over:bg-green-200">
      <div
        className={cn(
          "flex items-center justify-between text-sidebar-foreground hover:bg-card hover:rounded-md leading-loose px-1 cursor-pointer group",
          ""
        )}
        onClick={() => setActiveItemIdentify?.(item.identify || "")}
      >
        <>
          <span className=" flex-none w-4">
            {hasChildren &&
              (open ? (
                <ChevronDown size={14} onClick={() => setOpen(false)} />
              ) : (
                <ChevronRight size={14} onClick={() => setOpen(true)} />
              ))}
          </span>
          <span
            className={cn(
              "flex-1 truncate",
              hasChildren ? "" : "ml-2",
              isActive ? " text-blue-500" : ""
            )}
          >
            {item.title}
          </span>
        </>
        <div
          className={cn(
            "flex-none w-1 opacity-0 group-hover:opacity-100 group-hover:w-8 inline-flex gap-[2px]",
            ""
          )}
        ></div>
      </div>
      {open && hasChildren && (
        <div className="pl-2">
          {childItems?.map((item, index) => {
            return <TreeNode key={item.id} item={item} />;
          })}
        </div>
      )}
    </div>
  );
};

const defaultIndexNodeItem: TreeNodeProps = {
  id: 0,
  title: "首页",
  type: "index",
  parentId: 0,
  columnIdentify: "",
  identify: "",
  children: [],
};
const SideContentMemo = memo(function SideContent({
  initialColumnIdentify,
  initialIdentify,
}: {
  initialColumnIdentify: string;
  initialIdentify: string;
}) {
  defaultIndexNodeItem.columnIdentify = initialColumnIdentify;
  const [treeData, setTreeData] = useState<ColumnArticleTree[]>(
    [] as ColumnArticleTree[]
  );
  const requestDataList = useCallback(async () => {
    const { success, data } = await requestColumnArticlesTreeData(
      initialColumnIdentify
    );
    defaultIndexNodeItem.columnIdentify = initialColumnIdentify;
    if (success) {
      setTreeData(data || []);
    }
  }, [initialColumnIdentify]);
  useEffect(() => {
    requestDataList();
  }, [initialColumnIdentify, requestDataList]);
  return (
    <>
      <div className="px-1 pt-1 flex justify-between align-middle gap-4  ">
        <ColumnSearch className="flex-1 h-8 leading-6  border-gray-400  text-gray-400 " />
      </div>
      <p className="h-[1px] bg-border mt-2"></p>
      <div className=" min-h-[calc(100vh-theme(spacing.4))] px-2">
        <Tree
          defaultActiveItem={defaultIndexNodeItem}
          columnIdentify={initialColumnIdentify}
          initialIdentify={initialIdentify}
          treeData={treeData}
        />
      </div>
    </>
  );
});
SideContentMemo.displayName = "SideContentMemo";

const SideContentViewIndex = () => {
  const params = useParams<{ columnIdentify: string; pageId?: string[] }>();
  const initialIdentify = params?.pageId?.[0] || "";
  return (
    <SideContentMemo
      initialColumnIdentify={params?.columnIdentify || ""}
      initialIdentify={initialIdentify}
    />
  );
};
export default SideContentViewIndex;
