"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import SideContent from "@/components/blog/column/create/side-content";
import RightContent from "@/components/blog/column/create/doc-content";
import ColumnHeaderIndex from "@/components/blog/column/create/column-header";
const ColumnCreatePage = () => {
  const [sideFold, setSideFold] = useState(false);
  return (
    <div className="h-screen">
      <div className="h-full">
        <ResizablePanelGroup direction="horizontal" className="h-full ">
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
                <ColumnHeaderIndex />
                <SideContent />
              </ResizablePanel>
              <ResizableHandle withHandle />
            </>
          )}

          <ResizablePanel defaultSize={80} minSize={70}>
            <div className="flex w-full">
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
              <RightContent className="w-[calc(100%-1rem)]" />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};

export default ColumnCreatePage;
