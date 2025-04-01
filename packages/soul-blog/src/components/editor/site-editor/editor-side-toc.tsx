import { cn } from "@/lib/utils";
import { useTocElementState } from "@udecode/plate-heading/react";
import type { HeadItem } from "./editor-side-components";
import { SimpleTocContent, FullTocContent } from "./editor-side-components";
import { useState } from "react";
import { useTocNavigationState } from "./use-toc-hooks";
const TocFloatStyle =
  "hidden absolute top-0 right-0  bg-background h-full peer-hover:block peer-hover:w-72 hover:block hover:w-72  border-l border-second-background";
const TocFixedStyle =
  "block absolute top-0 right-0  bg-background h-full w-72 border-l border-second-background";

const EditorTocSideToc = ({ className }: { className?: string }) => {
  const { editor, headingList, onContentScroll } = useTocElementState();
  useTocNavigationState();
  const [cls, setCls] = useState(TocFloatStyle);
  const headList = headingList as HeadItem[];
  if (headList.length === 0) {
    return null;
  }
  const onFixed = (v: boolean) => {
    v ? setCls(TocFixedStyle) : setCls(TocFloatStyle);
  };
  return (
    <div className={cn("w-20 flex-none mt-6", className)}>
      <div className="peer h-full simple-toc">
        <SimpleTocContent
          headList={headList}
          className="sticky top-28 left-0 max-h-fit "
        />
      </div>
      <div className={cls}>
        <FullTocContent
          headList={headList}
          onFixed={onFixed}
          className="h-fit sticky top-16 left-0 border-none"
        />
      </div>
    </div>
  );
};

export default EditorTocSideToc;
