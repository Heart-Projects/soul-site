import { forwardRef, useEffect, useRef, useState } from "react";
import { throttle } from "lodash";
import { usePathname } from "next/navigation";
import {
  ColumnArticleContent,
  requestColumnArticlesContent,
} from "@/api/column-articles";
import DocContent from "./doc-item/doc-item";
import DefaultContent from "./doc-item/default-item";
import ColumnHomeContent from "./doc-item/home-item";
export type DocProps = {
  data: ColumnArticleContent;
  columnIdentify: string;
  initValue?: string;
  className?: string;
};

const dynamicComponent = (docType: string, props?: any, ref?: any) => {
  switch (docType) {
    case "index":
      return <ColumnHomeContent ref={ref} {...props} />;
    case "doc":
      return <DocContent ref={ref} {...props} />;
    default:
      return <DefaultContent ref={ref} {...props} />;
  }
};
const doRequestColumnArticleContent = async (
  columnIdentify: string,
  pageId: string,
  callback?: (data: ColumnArticleContent) => void
) => {
  const { success, data } = await requestColumnArticlesContent({
    columnIdentify,
    identify: pageId,
  });
  if (success) {
    callback?.(data);
  }
};
const pagePathPrefix = "/column/create/";
const RightContent = ({ className }: { className?: string }) => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const paths = pathname?.replace(pagePathPrefix, "").split("/") || [];
  let columnIdentify = "";
  let docIdentify = "";
  if (paths?.length > 0) {
    if (paths?.length > 1) {
      docIdentify = paths[1];
    }
    columnIdentify = paths[0];
  }
  const [docItem, setDocItem] = useState<ColumnArticleContent>({
    type: "doc",
    id: 0,
    content: "",
    parentId: 0,
    title: "",
  });
  useEffect(() => {
    if (!columnIdentify) {
      return;
    }
    setLoading(true);
    doRequestColumnArticleContent(columnIdentify, docIdentify, (item) => {
      setDocItem(item);
      setLoading(false);
    });
  }, [columnIdentify, docIdentify]);
  if (!columnIdentify) {
    return null;
  }
  if (loading) {
    return null;
  }
  return dynamicComponent(docItem.type || "", {
    data: docItem,
    columnIdentify: columnIdentify,
    className: className,
  });
};

export default RightContent;
