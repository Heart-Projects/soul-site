import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  EyeOff,
  Eye,
  ChevronsRight,
  ChevronsDown,
} from "lucide-react";
import { useState, useEffect, useRef, createContext, useContext } from "react";
interface HeadItem {
  id: string;
  depth: number;
  title: string;
  type: string;
  path: number[];
  index: number;
}
interface HeadItemEl extends HeadItem {
  children?: HeadItem[];
}

const onNavItem = ({ item }: { item: HeadItemEl }) => {
  console.log("on nav item", item);
  document
    .querySelector(`[data-block-id="${item.id}"]`)
    ?.scrollIntoView({ behavior: "smooth", block: "center" });
};
const LeafTocItem = ({
  parentOpen,
  item,
  isFirstLevel = false,
}: {
  parentOpen: boolean;
  item: HeadItemEl;
  isFirstLevel?: boolean;
}) => {
  return (
    <div
      onClick={() => onNavItem({ item })}
      className="truncate px-[2px] text-sm text-foreground/80 leading-6 cursor-pointer"
      data-block-id={item.id}
      data-title-index={item.index}
      style={{
        marginLeft: 5,
        paddingLeft: (item.depth - 1) * 10,
        display: isFirstLevel || parentOpen ? "block" : "none",
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      {item.title}
    </div>
  );
};
const FolderTocItem = ({
  parentOpen,
  item,
  isFirstLevel = false,
}: {
  parentOpen: boolean;
  item: HeadItemEl;
  isFirstLevel?: boolean;
}) => {
  const [open, setOpen] = useState(true);
  const rootOpen = useContext(TocFoldContext);
  useEffect(() => {
    setOpen(rootOpen);
  }, [rootOpen]);
  return (
    <div
      className="cursor-pointer"
      style={{
        paddingLeft: (item.depth - 1) * 15,
        display: isFirstLevel || parentOpen ? "block" : "none",
        transition: "opacity 0.2s ease-in-out",
      }}
    >
      <div className="flex overflow-hidden">
        <span onClick={() => setOpen(!open)}>
          {open ? <ChevronDown /> : <ChevronRight />}
        </span>
        <span
          data-block-id={item.id}
          data-title-index={item.index}
          className="truncate px-[2px] text-sm text-foreground/80 cursor-pointer"
          onClick={() => onNavItem({ item })}
        >
          {item.title}
        </span>
      </div>
      <div
        style={{
          display: open ? "block" : "none",
          transition: "opacity 0.2s ease-in-out",
        }}
      >
        {item.children?.map((child) => {
          return (
            <TocItemWrapper
              key={child.id}
              parentOpen={open}
              item={child}
              isFirstLevel={false}
            />
          );
        })}
      </div>
    </div>
  );
};
const TocItemWrapper = ({
  parentOpen,
  item,
  isFirstLevel = false,
}: {
  parentOpen: boolean;
  item: HeadItemEl;
  isFirstLevel?: boolean;
}) => {
  const hasChildren = item.children && item.children.length > 0;
  return hasChildren ? (
    <FolderTocItem
      parentOpen={parentOpen}
      item={item}
      isFirstLevel={isFirstLevel}
    />
  ) : (
    <LeafTocItem
      parentOpen={parentOpen}
      item={item}
      isFirstLevel={isFirstLevel}
    />
  );
};
const rootToItem = {
  id: "root",
  depth: 0,
  title: "目录",
  type: "root",
  path: [],
  children: [],
};

const arrayToTree = (data) => {
  const root = []; // 用于存储树的根节点
  const stack = []; // 用于管理当前的父节点关系

  data.forEach((item) => {
    const { depth, id } = item;
    const node = { id, children: [], ...item };

    // 清理 stack 中比当前 depth 深的节点
    while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
      stack.pop();
    }

    if (stack.length === 0) {
      // 当前节点是根节点
      root.push(node);
    } else {
      // 将当前节点添加到最近的父节点的 children 中
      const parent = stack[stack.length - 1].node;
      parent.children.push(node);
    }

    // 将当前节点推入 stack
    stack.push({ depth, node });
  });

  return root;
};

const H1Width = 30;
const SimpleTocContent = ({
  headList,
  className,
}: {
  headList: HeadItem[];
  className?: string;
}) => {
  return (
    <div className={cn("mt-4 flex flex-col items-end gap-4 h-full", className)}>
      {headList.map((item) => {
        return (
          <div
            key={item.id}
            data-block-id={item.id}
            className=" h-[3px] bg-gray-200 cursor-pointer"
            style={{ width: H1Width - 4 * item.depth }}
          ></div>
        );
      })}
    </div>
  );
};

const TocFoldContext = createContext(true);

const FullTocContent = ({
  headList,
  className,
  onFixed,
}: {
  headList: HeadItem[];
  className?: string;
  onFixed?: (v: boolean) => void;
}) => {
  const [rootOpen, setRootOpen] = useState(true);
  const [fixed, setFixed] = useState(false);
  const onChangeFixedStatus = (v: boolean) => {
    setFixed(v);
    onFixed && onFixed(v);
  };
  const tree = arrayToTree(headList);
  return (
    <div className={cn("border-l border-gray-100 p-2", className)}>
      <div className="flex gap-4">
        <span>大纲</span>
        <span
          className="cursor-pointer"
          onClick={() => onChangeFixedStatus(!fixed)}
        >
          {fixed ? <EyeOff /> : <Eye />}
        </span>
        <span onClick={() => setRootOpen(!rootOpen)}>
          {rootOpen ? <ChevronsDown /> : <ChevronsRight />}
        </span>
      </div>
      <div className="doc-toc mt-4">
        <TocFoldContext.Provider value={rootOpen}>
          {tree.map((item, index) => {
            return (
              <TocItemWrapper
                key={item.id}
                item={item}
                parentOpen={rootOpen}
                isFirstLevel={true}
              />
            );
          })}
        </TocFoldContext.Provider>
      </div>
    </div>
  );
};

export type { HeadItem, HeadItemEl };
export { SimpleTocContent, FullTocContent };
