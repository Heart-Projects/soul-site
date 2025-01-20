"use client";
import { useRef, useState } from "react";
import ArticleCreateHeader from "../create/header";
import { Input } from "@/components/ui/input";
import PublishSetting from "../create/publish-setting";
import { PublishFormSchema } from "../create/publish-setting-form";

import { saveArticle, type SaveArticleParams } from "@/api/user-article";
import { SoulPlateEditor } from "@/components/editor/site-editor/plate-editor-soul";
import type { PlateEditor } from "@udecode/plate-common/react";

import { useRouter } from "next/navigation";
export default function ArticleEditor({
  article,
}: {
  article: SaveArticleParams;
}) {
  const articleTitleRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<PlateEditor>(null);
  const articleInitialValue = JSON.parse(article.content || "[]");
  const [publishOpen, setPublishOpen] = useState(false);
  const router = useRouter();
  const onSubmitForm = async (data: PublishFormSchema) => {
    console.log("index receive");
    console.log(data);
    const { label, summary = "", ...rest } = data;
    const userLabel = data.label?.join(",");
    let articleSummary = summary;
    if (!articleSummary || articleSummary === "") {
      articleSummary = (
        document.querySelector(".slate-editor")?.textContent || ""
      ).substring(0, 200);
    }
    const requestParams: SaveArticleParams = {
      id: article.id,
      summary: articleSummary,
      ...rest,
      label: userLabel,
      title: articleTitleRef.current?.value || "",
      content: JSON.stringify(editorRef.current?.children || []),
    };
    console.log(requestParams);
    const saveRes = await saveArticle(requestParams);
    if (saveRes.success) {
      setPublishOpen(false);
      router.push(`/article/publish/success/${article.id}`);
    }
  };
  const onPublishArticle = () => {
    console.log("publish");
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
            defaultValue={article.title}
            placeholder="请输入文章标题"
            maxLength={100}
            required
          />
        </div>
      </ArticleCreateHeader>
      <div className="overflow-y-auto flex-1">
        <div className="gap-1">
          <SoulPlateEditor
            ref={editorRef}
            initialValue={articleInitialValue}
            placeholder="写点什么吧..."
          />
        </div>
      </div>
      {publishOpen && (
        <PublishSetting
          article={article}
          open={publishOpen}
          onCancel={(open: boolean) => setPublishOpen(open)}
          onSubmitForm={onSubmitForm}
        />
      )}
    </div>
  );
}
