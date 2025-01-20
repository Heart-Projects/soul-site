import { SoulPlateEditorColumnPreview } from "@/components/editor/site-editor/plate-editor-column-preview";
import { forwardRef } from "react";
import type { DocProps } from "../doc-content-view";
const DocContentViewIndex = forwardRef((props: DocProps, ref) => {
  const { data } = props;
  let initialValue = [];
  if (data.content && data.content !== "") {
    initialValue = JSON.parse(data.content);
  }

  return (
    <div className="flex-1 max-h-screen w-full">
      <SoulPlateEditorColumnPreview
        initialValue={initialValue}
        placeholder="写点什么吧..."
      />
    </div>
  );
});
DocContentViewIndex.displayName = "DocContentViewIndex";

export default DocContentViewIndex;
