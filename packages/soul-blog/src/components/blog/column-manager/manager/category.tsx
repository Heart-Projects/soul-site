"use client";
import { Plus, EllipsisVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  requestColumnCategoryAdd,
  requestColumnCategoryRemove,
  requestColumnCategoryRename,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { requestColumnCategoryTreeData } from "@/api/column-category";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { SoulButton } from "@/components/common/buttons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { findTreeItem } from "@/lib/treeUtils";
import { useRemoteRequest } from "@/hooks/use-remote-request";
const DeleteCategoryConfirm = ({
  actionItem,
  onChangeOpen,
  onSuccess,
}: {
  actionItem: ActionItem;
  onChangeOpen?: (open: boolean) => void;
  onSuccess?: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const onSave = async () => {
    setLoading(true);
    const res = await requestColumnCategoryRemove(actionItem.item?.id || 0);
    setLoading(false);
    const { success, message } = res;
    if (success) {
      onSuccess?.();
      onChangeOpen?.(false);
    }
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>删除分类</DialogTitle>
      </DialogHeader>
      <div className="text-center py-2">
        <p className=" text-sm text-red-600">
          你确定要删除这个分类吗?删除后不可恢复
        </p>
      </div>
      <DialogFooter>
        <Button onClick={() => onChangeOpen?.(false)} variant="ghost">
          取消
        </Button>
        <SoulButton type="submit" loading={loading} onClick={onSave}>
          确认删除
        </SoulButton>
      </DialogFooter>
    </>
  );
};
const AddCategory = ({
  defaultOpen,
  onChangeOpen,
  actionItem,
  onSuccess,
}: {
  defaultOpen?: boolean;
  actionItem: ActionItem;
  onChangeOpen?: (open: boolean) => void;
  onSuccess?: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const onSave = async () => {
    setLoading(true);
    const requestParam =
      actionItem.action === "add"
        ? {
            name: nameRef.current?.value || "",
            parentId: actionItem.source === "global" ? 0 : actionItem.item?.id,
          }
        : {
            id: actionItem.item?.id || 0,
            name: nameRef.current?.value || "",
            parentId: actionItem.item?.parentId || 0,
          };
    const requestMethod =
      actionItem.action === "add"
        ? requestColumnCategoryAdd
        : requestColumnCategoryRename;
    const res = await requestMethod(requestParam);
    const { success, message, data } = res;
    setLoading(false);
    if (success) {
      onSuccess?.();
      onChangeOpen?.(false);
    }
  };
  return (
    <Dialog defaultOpen={defaultOpen} onOpenChange={onChangeOpen}>
      <DialogContent className="sm:max-w-[425px]">
        {actionItem.action === "delete" && (
          <DeleteCategoryConfirm
            actionItem={actionItem}
            onChangeOpen={onChangeOpen}
            onSuccess={onSuccess}
          />
        )}
        {(actionItem.action === "rename" || actionItem.action === "add") && (
          <>
            <DialogHeader>
              <DialogTitle>
                {actionItem.action === "add" ? "添加分类" : "编辑分类"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-1 py-1 pt-4">
              <div className="flex gap-4 items-center">
                <Label htmlFor="name" className="text-right flex-none w-10">
                  名称
                </Label>
                <Input
                  ref={nameRef}
                  id="name"
                  placeholder="请输入分类名称"
                  className="flex-1"
                  defaultValue={
                    actionItem.action === "add" ? "" : actionItem.item?.name
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => onChangeOpen?.(false)} variant="ghost">
                取消
              </Button>
              <SoulButton type="submit" loading={loading} onClick={onSave}>
                保存
              </SoulButton>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
const CategoryGroupActions = ({
  initialOpen,
  onChildOpen,
  onItemMenuSelect,
}: {
  initialOpen?: boolean;
  onChildOpen?: (open: boolean) => void;
  onItemMenuSelect?: (source: string, action: string) => void;
}) => {
  const [open, setOpen] = useState(initialOpen);
  const onMenuAction = (source: string, action: string) => {
    setOpen(false);
    onItemMenuSelect?.(source, action);
  };
  return (
    <DropdownMenu open={open} onOpenChange={(open) => onChildOpen?.(open)}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className=" hover:border-none hover:bg-transparent"
        >
          <EllipsisVertical
            className=" inline-block text-sm"
            size={12}
            onClick={() => setOpen(true)}
            style={{ height: "1.5rem", width: "1.5rem" }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onSelect={() => onMenuAction("group", "add")}>
          新建子类
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onMenuAction("group", "rename")}>
          重命名
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onMenuAction("group", "delete")}>
          删除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const GroupItemActions = ({
  onChildOpen,
  onItemMenuSelect,
}: {
  onChildOpen?: (open: boolean) => void;
  onItemMenuSelect?: (source: string, action: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const onMenuAction = (source: string, action: string) => {
    setOpen(false);
    onItemMenuSelect?.(source, action);
  };
  return (
    <DropdownMenu open={open} onOpenChange={onChildOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="hover:border-none hover:bg-transparent"
        >
          <EllipsisVertical
            size={12}
            style={{ height: "1.25rem", width: "1.25rem" }}
            onClick={() => setOpen(true)}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          textValue="excel"
          onSelect={() => onMenuAction("groupItem", "rename")}
        >
          重命名
        </DropdownMenuItem>
        <DropdownMenuItem
          textValue="album"
          onSelect={() => onMenuAction("groupItem", "delete")}
        >
          删除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const CategoryItem = ({ item }: { item: ArticleColumnCategory }) => {
  const { activeItem, setActiveItem, onMenuAction } = useContext(
    ColumnCategoryContext
  );
  const [menuOpen, setMenuOpen] = useState(false);
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
      <div
        className={cn(
          "flex-none w-1 opacity-0 group-hover:opacity-100 group-hover:w-6",
          menuOpen ? "w-6 opacity-100" : ""
        )}
      >
        <GroupItemActions
          onChildOpen={(open) => setMenuOpen(open)}
          onItemMenuSelect={(source, action) => {
            onMenuAction?.(source, action, item);
            setMenuOpen(false);
          }}
        />
      </div>
    </div>
  );
};

const CategoryGroup = memo(function CategoryGroupC({
  item,
  menuHandler,
}: {
  item: ArticleColumnCategoryTree;
  menuHandler?: MenuHandlerFunc;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
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
        <div
          className={cn(
            "flex-none opacity-0 w-0 group-hover:opacity-100 group-hover:w-4",
            menuOpen ? "w-6 opacity-100" : ""
          )}
        >
          <CategoryGroupActions
            onChildOpen={(open) => {
              setMenuOpen(open);
            }}
            onItemMenuSelect={(source, action) => {
              menuHandler?.(source, action, item);
              setMenuOpen(false);
            }}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 pl-6">
        {item.children?.map((item, index) => {
          return <CategoryItem key={item.name} item={item} />;
        })}
      </div>
    </div>
  );
});

interface ActionItem {
  source: string;
  action: string;
  item?: ArticleColumnCategory;
}
type MenuHandlerFunc = (
  source: string,
  action: string,
  item?: ArticleColumnCategory
) => void;

const ColumnCategoryContext = createContext<{
  activeItem?: ArticleColumnCategory;
  setActiveItem?: (item: ArticleColumnCategory) => void;
  onMenuAction?: MenuHandlerFunc;
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
  const [actionModelOpen, setActionModelOpen] = useState(false);
  const actionItem = useRef<ActionItem>({
    source: "",
    action: "",
    item: undefined,
  });

  const onChangeDataSuccess = useCallback(() => {
    onRefreshTreeData();
  }, []);
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

  const onResponseMenuAction = useCallback(
    (source: string, action: string, item?: ArticleColumnCategory) => {
      actionItem.current = { source, action, item };
      setActionModelOpen(true);
    },
    []
  );
  if (loading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <Input
          placeholder="输入名称按回车搜索"
          className=" flex-1 h-8"
          onKeyDown={onSearch}
        />
        <div>
          <Plus
            className=" cursor-pointer text-green-500"
            onClick={() => {
              onResponseMenuAction("global", "add", undefined);
            }}
          />
        </div>{" "}
      </div>
      <div className="flex flex-col mt-1 px-1">
        <ColumnCategoryContext.Provider
          value={{
            activeItem,
            setActiveItem,
            onMenuAction: onResponseMenuAction,
          }}
        >
          {categoryData.length > 0 &&
            categoryData.map((item, index) => {
              return (
                <CategoryGroup
                  key={item.name}
                  item={item}
                  menuHandler={onResponseMenuAction}
                />
              );
            })}
        </ColumnCategoryContext.Provider>
        {actionModelOpen && (
          <AddCategory
            actionItem={actionItem.current}
            defaultOpen={actionModelOpen}
            onChangeOpen={(open) => setActionModelOpen(open)}
            onSuccess={onChangeDataSuccess}
          />
        )}
      </div>
    </>
  );
});
ColumnCategoryIndex.displayName = "ColumnCategory";
export default ColumnCategoryIndex;
