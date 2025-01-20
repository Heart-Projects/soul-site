"use client";
import { useRef, useState } from "react";
import ArticleEditor from "./article-editor";
import ArticleCreateHeader from "./header";
import { Input } from "@/components/ui/input";
import PublishSetting from "./publish-setting";
import { PublishFormSchema } from "./publish-setting-form";
import { saveArticle, type SaveArticleParams } from "@/api/user-article";
import type { PlateEditor } from "@udecode/plate-common/react";
import { useRouter } from "next/navigation";
import { SoulPlateEditor } from "@/components/editor/site-editor/plate-editor-soul";

interface ArticleCreateInfo {
  title: string;
  content: string;
}
export default function CreateArticle() {
  const articleInfo = useRef<ArticleCreateInfo>({
    title: "",
    content: "",
  });
  const articleTitleRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<PlateEditor>(null);
  const [publishOpen, setPublishOpen] = useState(false);
  const router = useRouter();

  const onSubmitForm = async (data: PublishFormSchema) => {
    const { label, summary, ...rest } = data;
    const userLabel = data.label?.join(",");
    let articleSummary = summary;
    if (!articleSummary || articleSummary === "") {
      articleSummary = (
        document.querySelector(".slate-editor")?.textContent || ""
      ).substring(0, 200);
    }
    // document.getElementById("editorWrapper")?.;
    const requestParams: SaveArticleParams = {
      ...rest,
      summary: articleSummary,
      label: userLabel,
      title: articleTitleRef.current?.value || "",
      content: JSON.stringify(editorRef.current?.children || []),
    };
    console.log(requestParams);
    const saveRes = await saveArticle(requestParams);
    if (saveRes.success) {
      setPublishOpen(false);
      router.push(`/article/publish/success/${saveRes.data}`);
    }
  };
  const onPublishArticle = () => {
    setPublishOpen(true);
  };
  const onDraftArticle = () => {};
  return (
    <div className="flex h-screen flex-col">
      <ArticleCreateHeader
        onPublish={onPublishArticle}
        onDraft={onDraftArticle}
      >
        <div className="pl-4 pr-4">
          <Input
            ref={articleTitleRef}
            type="text"
            placeholder="请输入文章标题"
            maxLength={100}
            required
          />
        </div>
      </ArticleCreateHeader>
      <div className="overflow-y-auto flex-1">
        <div className="gap-1" id="editorWrapper">
          <SoulPlateEditor ref={editorRef} placeholder="写点什么吧..." />
        </div>
      </div>
      <PublishSetting
        open={publishOpen}
        onCancel={(open: boolean) => setPublishOpen(open)}
        onSubmitForm={onSubmitForm}
      />
    </div>
  );
}
