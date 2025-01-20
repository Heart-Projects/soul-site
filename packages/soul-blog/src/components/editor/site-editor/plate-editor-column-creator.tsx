"use client";

import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Plate } from "@udecode/plate-common/react";
import { useCreateEditor } from "@/components/editor/site-editor/use-create-soul-editor";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import { SettingsDialog } from "@/components/editor/settings";

import "@/styles/globals.css";
import { EditorColumnTocSideTocPreview } from "./editor-column-side-toc-preview";

import { cn } from "@/lib/utils";
type EditorProps = {
  placeholder?: string;
  initialValue?: [];
  className?: string;
  mode?: "edit" | "preview";
  enableToc?: boolean;
  onChange?: (value: any) => void;
};
export function SoulColumnPlateEditor({
  initialValue,
  className = "",
  onChange,
}: EditorProps) {
  const [isClient, setIsClient] = useState(false);
  const [toCFixed, setToCFixed] = useState(false);
  const editor = useCreateEditor({
    mode: "edit",
    value: initialValue,
  });
  const onContentChange = ({ value }: { value: any }) => {
    onChange?.(value);
  };
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor} readOnly={false} onValueChange={onContentChange}>
        <div
          className={cn(
            "flex w-[calc(100%-1rem)] h-screen relative overflow-y-scroll",
            className
          )}
        >
          <div
            className={cn(
              "flex-1 rounded-l-lg max-2xl:max-w-6xl ",
              toCFixed ? "w-[calc(100%-20rem)]" : "w-[calc(100%-10rem)]"
            )}
          >
            <EditorContainer className="w-full">
              <Editor
                variant="fullWidth"
                className="px-2 overflow-y-scroll"
                id="editor_1kkkk"
              />
            </EditorContainer>
          </div>
          <EditorColumnTocSideTocPreview
            className={
              toCFixed
                ? "w-[20rem] mt-10 sticky"
                : "w-10 pt-10 sticky top-10 z-50"
            }
            fixed={toCFixed}
            onFixed={setToCFixed}
          />
        </div>
        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
