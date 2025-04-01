import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  useState,
  useContext,
  useEffect,
  useCallback,
  useRef,
  memo,
  DragEvent,
} from "react";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  ColumnArticleRenameParams,
  ColumnArticleTree,
  requestColumnArticlesAdd,
  requestColumnArticlesTreeData,
  requestColumnArticlesRename,
  requestColumnArticlesRemove,
  requestColumnArticlesModifyOrder,
} from "@/api/column-articles";
import {
  findTreeItem,
  findRootById,
  findSingleTreeItem,
} from "@/lib/treeUtils";
import { ColumnSearch } from "@/components/blog/column/components/column-search";
import type { TreeNodeProps } from "@/components/blog/column/components/column-toc-tree";
import {
  TreeState,
  TreeToolBar,
} from "@/components/blog/column/components/column-toc-tree";
import HomeTreeNode from "@/components/blog/column/components/home-tree-node";
import {
  TreeGlobalAction,
  TreeItemAddAction,
  TreeItemEditAction,
} from "./tree-operator-action";
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
      `/column/create/${columnIdentify}/${activeItemIdentify}`
    );
  }, [activeItemIdentify, columnIdentify]);
  return (
    <TreeState.Provider
      value={{
        setActiveItemIdentify: setActiveItemIdentify,
        activeItemIdentify: activeItemIdentify,
        onSelectMenuItem: onResponseMenuAction,
        getCurrentColumnIdentify: () => columnIdentify,
        onChangeOrder: onChangeOrder,
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
    onSelectMenuItem,
    getCurrentColumnIdentify,
    onChangeOrder,
  } = useContext(TreeState);
  const columnIdentify = getCurrentColumnIdentify?.();
  const [open, setOpen] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [actionMenuOpen, setActionMenuOpen] = useState(false);
  const titleEditRef = useRef<HTMLInputElement>(null);
  const [childItems, setChildItems] = useState<TreeNodeProps[]>(
    item.children || []
  );
  useEffect(() => {
    if (editMode) {
      titleEditRef?.current?.focus();
    }
  }, [editMode]);
  useEffect(() => {
    setChildItems(item.children || []);
  }, [item]);
  const hasChildren = childItems.length > 0;

  const isActive = activeItemIdentify === item.identify;
  const onDragItemStart = (e: DragEvent) => {
    e.dataTransfer?.setData(
      "application/column-toc-item",
      JSON.stringify(item)
    );
    e.stopPropagation();
  };
  const onDragItemEnter = (e: DragEvent) => {
    e.dataTransfer.dropEffect = "move";
    e.preventDefault();
    e.stopPropagation();
  };
  const onDragItemOver = (e: DragEvent) => {
    e.currentTarget.classList.add("bg-green-200");
    e.dataTransfer.dropEffect = "move";
    e.preventDefault();
    e.stopPropagation();
  };
  const onDragItemLeave = (e: DragEvent) => {
    e.currentTarget.classList.remove("bg-green-200");
    e.stopPropagation();
  };
  const onDragItemDrop = (e: DragEvent) => {
    const data = e.dataTransfer?.getData("application/column-toc-item");
    const movedData = JSON.parse(data);
    e.currentTarget.classList.remove("bg-green-200");
    e.stopPropagation();
    onChangeOrder?.(movedData, item);
  };
  const onItemMenuSelect = (source: string, action: string) => {
    onSelectMenuItem?.(source, action, item);
    switch (source) {
      case "add":
        switch (action) {
          case "doc":
            const newNodeItem: TreeNodeProps = {
              title: "无标题文档",
              type: "doc",
              parentId: item?.id || 0,
              columnId: item?.columnId || 0,
            };
            onRequestAdd(newNodeItem, (data: TreeNodeProps) => {
              setChildItems([data, ...childItems]);
            });
            break;
          case "column":
            break;
        }
        break;
      case "edit":
        switch (action) {
          case "rename":
            setEditMode(true);
            break;
          case "copy":
            break;
          case "move":
            break;
          case "export":
            break;
          case "delete":
            break;
        }
        break;
    }
  };
  if (editMode) {
    titleEditRef.current?.focus();
  }
  return (
    <div
      className=" -moz-drag-over:bg-green-200  -webkit-drag-over:bg-green-200"
      draggable={item.identify !== ""}
      onDragStart={onDragItemStart}
      onDragLeave={onDragItemLeave}
      onDragOver={onDragItemOver}
      onDragEnter={onDragItemEnter}
      onDrop={onDragItemDrop}
    >
      <div
        className={cn(
          "flex items-center justify-between text-sidebar-foreground hover:bg-card hover:rounded-md leading-loose px-1 cursor-pointer group",
          actionMenuOpen ? "bg-card rounded-md" : ""
        )}
        onClick={() => setActiveItemIdentify?.(item.identify || "")}
      >
        {editMode ? (
          <Input
            ref={titleEditRef}
            className=" border-green-400 focus-visible:border-green-400 focus-visible:box-shadow-none focus-visible:ring-0"
            defaultValue={item.title}
            onBlur={(e) => {
              onRequestRename(
                {
                  id: item.id,
                  title: e.target.value,
                },
                () => {
                  setEditMode(false);
                  item.title = e.target.value;
                }
              );
            }}
          />
        ) : (
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
              onDoubleClick={() => setEditMode(true)}
              className={cn(
                "flex-1 truncate",
                hasChildren ? "" : "ml-2",
                isActive ? " text-blue-500" : ""
              )}
            >
              {item.title}
            </span>
          </>
        )}

        {!editMode && (
          <div
            className={cn(
              "flex-none w-1 opacity-0 group-hover:opacity-100 group-hover:w-8 inline-flex gap-[2px]",
              actionMenuOpen ? "w-8 opacity-100" : ""
            )}
          >
            <TreeItemEditAction
              onChildOpen={(open) => setActionMenuOpen(open)}
              onItemMenuSelect={onItemMenuSelect}
            />
            <TreeItemAddAction
              onChildOpen={(open) => setActionMenuOpen(open)}
              onItemMenuSelect={onItemMenuSelect}
            />
          </div>
        )}
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

const onRequestAdd = async (item: TreeNodeProps, callback: Function) => {
  const { success, data } = await requestColumnArticlesAdd(item);
  callback?.(data);
};

const onRequestRename = async (
  params: ColumnArticleRenameParams,
  callback: Function
) => {
  const { success, message } = await requestColumnArticlesRename(params);
  callback?.();
};

const onRequestRemove = async (id: number, callback: Function) => {
  const { success, message } = await requestColumnArticlesRemove(id);
  if (success) {
    callback?.();
  }
};

// 这里主要hick dialog 的bug
const fixDialogBug = () => {
  setTimeout(() => {
    console.log(document.body.style.pointerEvents);
  }, 100);
  document.body.style.pointerEvents = "initial";
};

const TreeNodeRemove = ({
  item,
  initialOpen,
  onOpenChange,
  onRemoveSuccess,
}: {
  item: TreeNodeProps;
  initialOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  onRemoveSuccess?: (item: TreeNodeProps) => void;
}) => {
  const onDoRemove = () => {
    onRequestRemove(item.id || 0, () => {
      onRemoveSuccess?.(item);
    });
  };
  return (
    <Dialog
      defaultOpen={initialOpen}
      onOpenChange={(open) => {
        onOpenChange?.(open);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{`确定删除 ${item.title} 吗`}</DialogTitle>
          <div className=" py-2 px-1">
            {item.children && item.children.length > 0 && (
              <DialogDescription>
                {`同时将删除 ${item.title} 下的所有文档`}
              </DialogDescription>
            )}
          </div>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="ghost"
            onClick={() => {
              onOpenChange?.(false);
            }}
          >
            取消
          </Button>
          <Button onClick={onDoRemove}>确认删除</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const menuOperatorItem = useRef<TreeNodeProps>(defaultIndexNodeItem);

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

  useEffect(() => {
    if (!showDeleteDialog) {
      fixDialogBug();
    }
  }, [showDeleteDialog]);
  const onRemoveSuccess = (item: TreeNodeProps) => {
    const index = treeData.findIndex((i) => i.id === item.id);
    const newTreeData = [...treeData];
    newTreeData.splice(index, 1);
    setTreeData(newTreeData);
    setShowDeleteDialog(false);
  };
  const onResponseMenuAction = (
    source: string,
    action: string,
    dataItem?: TreeNodeProps
  ) => {
    menuOperatorItem.current = dataItem || defaultIndexNodeItem;
    switch (source) {
      case "global":
        switch (action) {
          case "doc":
            const newNodeItem: TreeNodeProps = {
              title: "无标题文档",
              type: "doc",
              parentId: 0,
              columnIdentify: initialColumnIdentify,
            };
            onRequestAdd(newNodeItem, (data: TreeNodeProps) => {
              setTreeData([data, ...treeData]);
            });
            break;
          case "group":
            const newGroupItem: TreeNodeProps = {
              title: "新建分组",
              type: "group",
              parentId: 0,
              columnIdentify: initialColumnIdentify,
            };
            onRequestAdd(newGroupItem, (data: TreeNodeProps) => {
              setTreeData([data, ...treeData]);
            });
            break;
        }
        break;
      case "edit":
        switch (action) {
          case "delete":
            setShowDeleteDialog(true);
            break;
        }
        break;
    }
  };
  const onChangeOrder = async (
    source: TreeNodeProps,
    target: TreeNodeProps
  ) => {
    // 先将拖动的元素从从父元素中移除
    const currentTreeData = treeData;
    // 说明是一个顶层元素
    if (source.parentId < 1) {
      const sourceIndex = currentTreeData.findIndex(
        (item) => item.id === source.id
      );
      currentTreeData.splice(sourceIndex, 1);
    } else {
      // 说明是一个子元素
      const parentEl = findTreeItem(currentTreeData, source.parentId || 0);
      const currentAtParentIndex =
        parentEl?.children?.findIndex((item) => item.id === source.id) || 0;
      if (currentAtParentIndex > -1) {
        parentEl?.children?.splice(currentAtParentIndex, 1);
      }
    }
    source.parentId = target.parentId;
    // 说明拖动到顶层
    if (target.parentId < 1) {
      const targetIndex = currentTreeData.findIndex(
        (item) => item.id === target.id
      );
      currentTreeData.splice(targetIndex, 0, source);
    } else {
      // 说明拖动到子元素
      const targetParentEl = findTreeItem(
        currentTreeData,
        target.parentId || 0
      );
      const targetIndex = targetParentEl?.children?.findIndex(
        (item) => item.id === target.id
      );
      targetParentEl?.children?.splice(targetIndex || 0, 0, source);
    }
    setTreeData([...currentTreeData]);
    const { success, message } = await requestColumnArticlesModifyOrder({
      sourceItemId: source.id as number,
      targetItemId: target.id as number,
    });
  };
  return (
    <>
      <div className="px-1 pt-1 flex justify-between align-middle gap-4  ">
        <ColumnSearch className="flex-1 h-8 leading-6  border-gray-400  text-gray-400 " />
        <TreeGlobalAction onResponseMenuAction={onResponseMenuAction} />
      </div>
      <p className="h-[1px] bg-border mt-2"></p>
      <div className=" min-h-[calc(100vh-theme(spacing.4))] px-2">
        <Tree
          defaultActiveItem={defaultIndexNodeItem}
          columnIdentify={initialColumnIdentify}
          initialIdentify={initialIdentify}
          treeData={treeData}
          onResponseMenuAction={onResponseMenuAction}
          onChangeOrder={onChangeOrder}
        />
      </div>
      {showDeleteDialog && (
        <TreeNodeRemove
          item={menuOperatorItem.current}
          initialOpen={showDeleteDialog}
          onRemoveSuccess={onRemoveSuccess}
          onOpenChange={(open) => setShowDeleteDialog(open)}
        ></TreeNodeRemove>
      )}
    </>
  );
});
SideContentMemo.displayName = "SideContentMemo";

const SideContentIndex = () => {
  const params = useParams<{ columnIdentify: string; pageId?: string[] }>();
  const initialIdentify = params?.pageId?.[0] || "";
  return (
    <SideContentMemo
      initialColumnIdentify={params?.columnIdentify || ""}
      initialIdentify={initialIdentify}
    />
  );
};
export default SideContentIndex;
