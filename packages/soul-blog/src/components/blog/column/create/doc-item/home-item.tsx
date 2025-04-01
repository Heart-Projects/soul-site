import type { ColumnArticleTree } from "@/api/column-articles";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { DocProps } from "../doc-content";
import { Button } from "@/components/ui/button";
import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";

type TreeNodeProps = ColumnArticleTree;

const TableContentTree = ({
  treeData,
  columnIdentify = "",
}: {
  columnIdentify?: string;
  treeData: TreeNodeProps[];
}) => {
  return (
    <div>
      {treeData.map((item, index) => {
        return (
          <TableContentTreeNode
            key={item.id}
            item={item}
            columnIdentify={columnIdentify}
          />
        );
      })}
    </div>
  );
};
const onNavToItem = (item: TreeNodeProps, columnIdentify: string) => {
  window.history.pushState(
    {},
    "",
    `/column/create/${columnIdentify}/${item.identify}`
  );
};
const TableContentTreeNode = ({
  item,
  columnIdentify,
}: {
  item: TreeNodeProps;
  columnIdentify: string;
}) => {
  const [open, setOpen] = useState(true);
  const [childItems, setChildItems] = useState<TreeNodeProps[]>(
    item.children || []
  );
  const hasChildren = childItems.length > 0;

  return (
    <div>
      <div
        className={cn(
          "flex items-center justify-between text-sidebar-foreground hover:bg-card hover:rounded-md leading-loose px-1 cursor-pointer group"
        )}
        onClick={() => onNavToItem(item, columnIdentify)}
      >
        <div className=" flex-1 flex">
          <div className=" flex items-center">
            <span className=" flex-none w-4">
              {hasChildren &&
                (open ? (
                  <ChevronDown
                    size={14}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(false);
                    }}
                  />
                ) : (
                  <ChevronRight
                    size={14}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen(true);
                    }}
                  />
                ))}
            </span>
            <span className={cn("flex-1 truncate", hasChildren ? "" : "ml-2")}>
              {item.title}
            </span>
          </div>
          <div className=" flex-1 flex flex-col justify-center px-1">
            <div className=" h-[1px] border-dashed border-t border-border"></div>
          </div>
        </div>
        <div className=" flex-none w-16">{item.id}</div>
      </div>
      {open && hasChildren && (
        <div className="pl-2">
          {childItems?.map((item, index) => {
            return (
              <TableContentTreeNode
                key={item.id}
                item={item}
                columnIdentify={columnIdentify}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
const ActionButtons = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" asChild>
            <EllipsisVertical className=" inline-block" size={12} />
          </Button>
        </DropdownMenuTrigger>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            重命名
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            编辑首页
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const ColumnHomeContent = (props: DocProps) => {
  const { content } = props.data;
  return (
    <div className=" flex-1 p-2">
      <div className="pb-4">
        <div className=" flex justify-between px-1">
          <div>
            <span className=" text-2xl font-bold">JAVA 并发知识</span>
          </div>
          <div className=" flex gap-2">
            <Button>收藏</Button>
            <Button>分享</Button>
            <ActionButtons />
          </div>
        </div>
        <p className="  text-gray-500">共 52篇文章，10000字</p>
      </div>
      <div>
        <TableContentTree
          treeData={content as ColumnArticleTree[]}
          columnIdentify={props.columnIdentify}
        />
      </div>
    </div>
  );
};

export default ColumnHomeContent;
