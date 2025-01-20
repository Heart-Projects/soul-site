import { forwardRef, Suspense, useEffect, useRef, useState } from "react";
import { throttle } from "lodash";
import { usePathname } from "next/navigation";
import {
  ColumnArticleContent,
  requestColumnArticlesContent,
} from "@/api/column-articles";
import DocContentViewIndex from "./doc-item/doc-item-view";
import DefaultContentViewIndex from "./doc-item/default-item-view";
import ColumnHomeContentViewIndex from "./doc-item/home-item-view";
import { useRemoteRequest } from "@/hooks/use-remote-request";
import { Skeleton } from "@/components/ui/skeleton";
export type DocProps = {
  data: ColumnArticleContent;
  columnIdentify: string;
  initValue?: string;
};

const dynamicComponent = (docType: string, props?: any, ref?: any) => {
  switch (docType) {
    case "index":
      return <ColumnHomeContentViewIndex ref={ref} {...props} />;
    case "doc":
      return <DocContentViewIndex ref={ref} {...props} />;
    default:
      return <DefaultContentViewIndex ref={ref} {...props} />;
  }
};
// const doRequestColumnArticleContent = async (
//   columnIdentify: string,
//   pageId: string,
//   callback?: (data: ColumnArticleContent) => void
// ) => {
//   console.log(columnIdentify, pageId);
//   const { doRemoteRequest } = useRemoteRequest(
//     async () =>
//       await requestColumnArticlesContent({
//         columnIdentify,
//         identify: pageId,
//       })
//   );
//   // const { success, data } = await requestColumnArticlesContent({
//   //   columnIdentify,
//   //   identify: pageId,
//   // });
//   const { success, data } = await doRemoteRequest;
//   if (success) {
//     callback?.(data);
//   }
// };
const pagePathPrefix = "/column/view/";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-6 justify-center">
      <Skeleton className="h-6 w-[20%]" />
      <Skeleton className="h-6 w-[40%]" />
      <Skeleton className="h-6 w-[60%]" />
      <Skeleton className="h-6 w-[80%]" />
      <Skeleton className="h-6 w-full" />
    </div>
  );
};
const RightContentViewIndex = () => {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const { doRemoteRequest } = useRemoteRequest(requestColumnArticlesContent, {
    successCallback: (data) => {
      setDocItem(data);
      setLoading(false);
    },
  });
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
    doRemoteRequest({
      columnIdentify,
      identify: docIdentify,
    });
  }, [columnIdentify, docIdentify]);
  if (!columnIdentify) {
    return null;
  }
  // if (loading) {
  //   return null;
  // }
  const c = dynamicComponent(docItem.type || "", {
    data: docItem,
    columnIdentify: columnIdentify,
  });
  return (
    <>
      {loading && <Loading />}
      {!loading && c}
    </>
  );
};

export default RightContentViewIndex;
