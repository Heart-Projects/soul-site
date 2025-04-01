import { SoulColumnPlateEditor } from "@/components/editor/site-editor/plate-editor-column-creator";
import type { PlateEditor } from "@udecode/plate-common/react";
import { forwardRef, useRef } from "react";
import { throttle } from "lodash";
import { requestColumnArticlesSaveContent } from "@/api/column-articles";
import { cn } from "@/lib/utils";
import type { DocProps } from "../doc-content";
const DocContent = forwardRef((props: DocProps, ref) => {
  const { data, className = "" } = props;
  let initialValue = [];
  if (data.content && data.content !== "") {
    initialValue = JSON.parse(data.content);
  }
  const onSaveContent = throttle(async (content: Object[]) => {
    const { success, message } = await requestColumnArticlesSaveContent({
      id: props.data.id as number,
      content: JSON.stringify(content),
    });
  }, 5000);

  return (
    <div className={cn("flex-1", className)}>
      <SoulColumnPlateEditor
        initialValue={initialValue}
        onChange={onSaveContent}
        placeholder="写点什么吧..."
      />
    </div>
  );
});
DocContent.displayName = "DocContent";

export default DocContent;
