"use client";

import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Plate } from "@udecode/plate-common/react";

import { SettingsDialog } from "@/components/editor/settings";
import { useCreateEditor } from "@/components/editor/site-editor/use-create-soul-editor";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";
import EditorTocSideToc from "./editor-side-toc";
import "@/styles/globals.css";
type EditorProps = {
  placeholder?: string;
  initialValue?: [];
  mode?: "edit" | "preview";
  enableToc?: boolean;
  onChange?: (value: any) => void;
};
const SoulPlateEditor = forwardRef(function (
  {
    placeholder,
    onChange,
    initialValue,
    mode = "edit",
    enableToc = true,
  }: EditorProps,
  ref
) {
  const [isClient, setIsClient] = React.useState(false);
  const editor = useCreateEditor({
    mode,
    value: initialValue,
  });
  useImperativeHandle(ref, () => editor);
  useEffect(() => {
    setIsClient(true);
  });

  if (!isClient) {
    return null;
  }
  const onContentChange = ({ value }: { value: any }) => {
    onChange?.(value);
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editor={editor}
        onValueChange={onContentChange}
        readOnly={mode === "preview"}
      >
        <EditorContainer className=" flex-1">
          <div className="relative">
            <Editor
              variant="fullWidth"
              className="h-full pb-10"
              placeholder={placeholder}
            />
            {enableToc && (
              <EditorTocSideToc className="absolute top-5 right-0 h-full " />
            )}
          </div>
        </EditorContainer>
        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
});

SoulPlateEditor.displayName = "SoulPlateEditor";
export { SoulPlateEditor };
