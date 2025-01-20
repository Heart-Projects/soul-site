"use client";
import { cn } from "@/lib/utils";
import { useTocElementState } from "@udecode/plate-heading/react";
import type { HeadItem } from "./editor-side-components";
import { SimpleTocContent, FullTocContent } from "./editor-side-components";
import { useState } from "react";
import { useTocNavigationState } from "./use-toc-hooks";

const EditorColumnTocSideTocSimplePreview = ({
  className,
  headList,
}: {
  className?: string;
  headList: HeadItem[];
}) => {
  if (headList.length === 0) {
    return null;
  }
  // 增加一个索引编号后续用于导航
  headList.forEach((item, index) => {
    item.index = index;
  });
  const onMouseFloatSideToc = () => {
    console.log("onMouseFloatSideToc");
  };
  const onMouseLeaveFloatSideToc = () => {
    console.log("onMouseLeaveFloatSideToc");
  };
  return (
    <div
      className={cn("w-20 mt-6", className)}
      onMouseEnter={onMouseFloatSideToc}
      onMouseLeave={onMouseLeaveFloatSideToc}
      data-block-id=""
    >
      <SimpleTocContent headList={headList} className="peer h-full " />
    </div>
  );
};

const TocFloatStyle =
  "peer-hover:flex peer-hover:w-[20rem] hover:flex hover:w-[20rem]";
const TocFixedStyle = "flex w-[20rem]";
const EditorColumnTocSideTocPreview = ({
  fixed,
  className,
  onFixed,
}: {
  fixed?: boolean;
  className?: string;
  onFixed?: (v: boolean) => void;
}) => {
  const { editor, headingList, onContentScroll } = useTocElementState();
  useTocNavigationState();
  const headList = headingList as HeadItem[];
  // 增加一个索引编号后续用于导航
  headList.forEach((item, index) => {
    item.index = index;
  });
  if (headList.length === 0) {
    return null;
  }
  return (
    <div className={cn("sticky top-0 right-0 h-full", className)}>
      {!fixed && (
        <div className="peer pr-2 pt-12 w-10 sticky top-28 left-0 ">
          <EditorColumnTocSideTocSimplePreview
            className="simple-toc max-h-fit  w-10"
            headList={headList}
          />
        </div>
      )}

      <div
        className={cn(
          "hidden  bg-second-background absolute top-0 right-0 transition duration-500 ease-in-out h-full pl-1 opacity-95",
          fixed ? TocFixedStyle : TocFloatStyle
        )}
      >
        <div className=" size-full relative bg-background">
          <FullTocContent
            headList={headList}
            onFixed={onFixed}
            className="h-full sticky top-4 left-0"
          />
        </div>
      </div>
    </div>
  );
};

export { EditorColumnTocSideTocPreview, EditorColumnTocSideTocSimplePreview };
