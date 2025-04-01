"use client";

import { Plate } from "@udecode/plate-common/react";
import { useCreateEditor } from "@/components/editor/site-editor/use-create-soul-editor";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import "@/styles/globals.css";
import { EditorTocSideTocPreview } from "./editor-side-toc-preview";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { cn } from "@/lib/utils";
type EditorProps = {
  placeholder?: string;
  initialValue?: [];
  className?: string;
  mode?: "edit" | "preview";
  enableToc?: boolean;
  onChange?: (value: any) => void;
};
export function SoulPlateEditorPreview({
  initialValue,
  enableToc = true,
  className = "",
}: EditorProps) {
  const editor = useCreateEditor({
    mode: "preview",
    value: initialValue,
  });
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor} readOnly={true}>
        <div className={cn("flex", className)}>
          <div
            className="flex-1 rounded-l-lg max-2xl:max-w-6xl"
            style={{ maxWidth: "calc(100vw - 35.5rem)" }}
            data-registry="plate"
          >
            <EditorContainer>
              <Editor variant="fullWidth" className="px-2" id="editor_12345" />
            </EditorContainer>
          </div>
          <div className="flex-none w-10 mr-8">
            <EditorTocSideTocPreview />
          </div>
        </div>
      </Plate>
    </DndProvider>
  );
}
