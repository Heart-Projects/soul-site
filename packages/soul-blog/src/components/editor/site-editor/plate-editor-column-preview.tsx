"use client";

import { useEffect, useState } from "react";

import { Plate } from "@udecode/plate-common/react";
import { useCreateEditor } from "@/components/editor/site-editor/use-create-soul-editor";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import "@/styles/globals.css";
import { EditorColumnTocSideTocPreview } from "./editor-column-side-toc-preview";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { usePlateStore } from "@udecode/plate-common/react";
import { cn } from "@/lib/utils";
import { se } from "date-fns/locale";
type EditorProps = {
  placeholder?: string;
  initialValue?: [];
  className?: string;
  mode?: "edit" | "preview";
  enableToc?: boolean;
  onChange?: (value: any) => void;
};
export function SoulPlateEditorColumnPreview({
  initialValue,
  enableToc = true,
  className = "",
}: EditorProps) {
  const [isClient, setIsClient] = useState(false);
  const [toCFixed, setToCFixed] = useState(false);
  const editor = useCreateEditor({
    mode: "preview",
    value: initialValue,
  });

  const setReadOnly = usePlateStore().set.readOnly();
  setReadOnly(true);
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor} readOnly={true}>
        <div
          className={cn(
            "flex w-[calc(100%-1rem)] h-full relative overflow-y-scroll",
            className
          )}
        >
          <div
            className={cn(
              "flex-1 rounded-l-lg max-2xl:max-w-6xl ",
              toCFixed ? "w-[calc(100%-20rem)]" : "w-[calc(100%-10rem)]"
            )}
            data-registry="plate"
          >
            <EditorContainer className="w-full">
              <Editor variant="fullWidth" className="px-2" id="editor_1kkkk" />
            </EditorContainer>
          </div>
          <EditorColumnTocSideTocPreview
            className={toCFixed ? "w-[20rem] z-[100]" : "w-10"}
            fixed={toCFixed}
            onFixed={setToCFixed}
          />
        </div>
      </Plate>
    </DndProvider>
  );
}
