import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Plus } from "lucide-react";
import type { TreeNodeProps } from "@/components/blog/column/components/column-toc-tree";

export const TreeGlobalAction = ({
  onResponseMenuAction,
}: {
  onResponseMenuAction?: (
    source: string,
    action: string,
    dataItem?: TreeNodeProps
  ) => void;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className=" bg-green-400 hover:bg-green-400 w-8 h-8"
        >
          <Plus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          textValue="doc"
          onSelect={() => onResponseMenuAction?.("global", "doc")}
        >
          文档
        </DropdownMenuItem>
        <DropdownMenuItem
          textValue="excel"
          onSelect={() => onResponseMenuAction?.("global", "excel")}
        >
          表格
        </DropdownMenuItem>
        <DropdownMenuItem
          textValue="album"
          onSelect={() => onResponseMenuAction?.("global", "album")}
        >
          画册
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          textValue="group"
          onSelect={() => onResponseMenuAction?.("global", "group")}
        >
          新建分组
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const TreeItemAddAction = ({
  onChildOpen,
  onItemMenuSelect,
}: {
  onChildOpen?: (open: boolean) => void;
  onItemMenuSelect?: (source: string, action: string) => void;
}) => {
  return (
    <DropdownMenu onOpenChange={onChildOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className=" hover:border-none hover:bg-transparent"
        >
          <Plus className=" inline-block" size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          textValue="doc"
          onSelect={() => onItemMenuSelect?.("add", "doc")}
        >
          文档
        </DropdownMenuItem>
        <DropdownMenuItem
          textValue="excel"
          onSelect={() => onItemMenuSelect?.("add", "excel")}
        >
          表格
        </DropdownMenuItem>
        <DropdownMenuItem
          textValue="album"
          onSelect={() => onItemMenuSelect?.("add", "album")}
        >
          画册
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          textValue="group"
          onSelect={() => onItemMenuSelect?.("add", "group")}
        >
          新建分组
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export const TreeItemEditAction = ({
  onChildOpen,
  onItemMenuSelect,
}: {
  onChildOpen?: (open: boolean) => void;
  onItemMenuSelect?: (source: string, action: string) => void;
}) => {
  return (
    <DropdownMenu onOpenChange={onChildOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className=" hover:border-none hover:bg-transparent"
        >
          <EllipsisVertical className=" inline-block" size={14} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          textValue="rename"
          onSelect={() => onItemMenuSelect?.("edit", "rename")}
        >
          重命名
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          textValue="copy"
          onSelect={() => onItemMenuSelect?.("edit", "copy")}
        >
          复制
        </DropdownMenuItem>
        <DropdownMenuItem
          textValue="move"
          onSelect={() => onItemMenuSelect?.("edit", "move")}
        >
          移动
        </DropdownMenuItem>
        <DropdownMenuItem
          textValue="export"
          onSelect={() => onItemMenuSelect?.("edit", "export")}
        >
          导出
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          textValue="delete"
          onSelect={() => onItemMenuSelect?.("edit", "delete")}
        >
          删除
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
