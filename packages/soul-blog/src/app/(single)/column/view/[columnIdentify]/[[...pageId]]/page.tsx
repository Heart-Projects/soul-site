"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import SideContentViewIndex from "@/components/blog/column/view/side-content-view";
import RightContentViewIndex from "@/components/blog/column/view/doc-content-view";
import ColumnHeaderViewIndex from "@/components/blog/column/view/column-header-view";
const ColumnViewPage = () => {
  const [sideFold, setSideFold] = useState(false);
  return (
    <div className="h-screen">
      <div className="h-full">
        <ResizablePanelGroup direction="horizontal" className=" h-screen ">
          {!sideFold && (
            <>
              <ResizablePanel
                defaultSize={20}
                collapsedSize={15}
                collapsible={true}
                minSize={10}
                maxSize={30}
                className="h-full bg-second-background"
              >
                <ColumnHeaderViewIndex />
                <SideContentViewIndex />
              </ResizablePanel>
              <ResizableHandle withHandle />
            </>
          )}

          <ResizablePanel
            defaultSize={80}
            minSize={70}
            className=" max-h-screen"
          >
            <div className="flex">
              <div className="inline-block bg-background flex-none w-4">
                {sideFold ? (
                  <PanelLeftOpen
                    className="cursor-pointer"
                    size={14}
                    onClick={() => setSideFold(false)}
                  />
                ) : (
                  <PanelLeftClose
                    className="cursor-pointer"
                    size={14}
                    onClick={() => setSideFold(true)}
                  />
                )}
              </div>
              <RightContentViewIndex />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ColumnViewPage;
