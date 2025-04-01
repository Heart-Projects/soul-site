"use client";
import { cn } from "@/lib/utils";
import { useTocElementState } from "@udecode/plate-heading/react";
import type { HeadItem } from "./editor-side-components";
import { SimpleTocContent, FullTocContent } from "./editor-side-components";
import { useState } from "react";
import { useTocNavigationState } from "./use-toc-hooks";

const EditorTocSideTocSimplePreview = ({
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
  const onMouseFloatSideToc = () => {};
  const onMouseLeaveFloatSideToc = () => {};
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
  "peer-hover:flex peer-hover:w-[28rem] hover:flex hover:w-[28rem]";
const TocFixedStyle = "flex w-[28rem]";
const EditorTocSideTocPreview = ({ className }: { className?: string }) => {
  const { editor, headingList, onContentScroll } = useTocElementState();
  useTocNavigationState();
  const [cls, setCls] = useState(TocFloatStyle);
  const headList = headingList as HeadItem[];
  // 增加一个索引编号后续用于导航
  headList.forEach((item, index) => {
    item.index = index;
  });
  const onFixed = (v: boolean) => {
    v ? setCls(TocFixedStyle) : setCls(TocFloatStyle);
  };
  if (headList.length === 0) {
    return null;
  }
  return (
    <>
      <div className="peer pr-2 pt-24 w-10 flex-none sticky top-28 left-0 ">
        <EditorTocSideTocSimplePreview
          className="simple-toc max-h-fit  w-10"
          headList={headList}
        />
      </div>
      <div
        className={cn(
          "hidden  bg-second-background absolute top-0 right-0 transition duration-500 ease-in-out z-[2] h-full justify-center opacity-95",
          className,
          cls
        )}
      >
        <div className="h-full relative bg-background w-[23rem]">
          <FullTocContent
            headList={headList}
            onFixed={onFixed}
            className=" h-fit sticky top-16 left-0"
          />
        </div>
      </div>
    </>
  );
};

export { EditorTocSideTocPreview, EditorTocSideTocSimplePreview };
