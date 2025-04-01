import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { never, z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import LabelInput from "@/components/common/blog/label-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { requestSiteCategory } from "@/api/site-category";
import { requestUserArticleCategory } from "@/api/user-category";
import type { SiteCategory } from "@/api/site-category";
import type { UserArticleCategory } from "@/api/user-category";
import type { SaveArticleParams } from "@/api/user-article";
import ArticleImg from "@/components/common/blog/article-img";
function HorizontalFormLayout({
  children,
  labelWidth = "w-20",
}: {
  children?: React.ReactNode[];
  labelWidth?: string;
}) {
  const labelChildren = children?.[0];
  const otherChildren = children?.slice(1);
  return (
    <div className="flex items-baseline">
      <div className={labelWidth}>{labelChildren}</div>
      <div className="flex-1">{otherChildren}</div>
    </div>
  );
}
const FormSchema = z.object({
  isComment: z.string(),
  isOnTop: z.string(),
  summary: z.string().optional(),
  source: z.string(),
  label: z.string().array().nonempty({ message: "请至少填写一个标签" }),
  visible: z.string(),
  categoryId: z.coerce.number().min(1, { message: "请选择有效的个人分类" }),
  type: z.number(),
  siteCategoryId: z.coerce.number({ message: "请选择有效的站点分类" }).min(1, {
    message: "请选择有效的分类",
  }),
  status: z.number(),
  thumbnailFileInfo: z.string(),
});

export type PublishFormSchema = z.infer<typeof FormSchema>;
export default function PublishForm({
  article,
  children,
  onSubmitForm,
}: {
  article?: SaveArticleParams;
  children?: React.ReactNode;
  onSubmitForm?: (p: z.infer<typeof FormSchema>) => void;
}) {
  const [siteCategory = [], setSiteCategory] = React.useState<SiteCategory[]>();
  const [articleCategory = [], setArticleCategory] =
    React.useState<UserArticleCategory[]>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      isComment: article ? article.isComment.toString() : "1",
      isOnTop: article ? article.isOnTop.toString() : "0",
      summary: article ? article.summary : "",
      source: "0",
      label: article ? article.labels?.map((item) => item.name) : [],
      type: article ? article.type : 1,
      visible: "1",
      status: article ? article.status : 1,
      categoryId: article ? article.categoryId : 0,
      siteCategoryId: article ? article.siteCategoryId : 0,
    },
  });
  React.useEffect(() => {
    const getSiteCategoryList = async () => {
      const { success, data, message } = await requestSiteCategory();
      if (success) {
        setSiteCategory(data);
      }
    };
    const getArticleCategoryList = async () => {
      const { success, data, message } = await requestUserArticleCategory();
      if (success) {
        setArticleCategory(data);
      }
    };
    getArticleCategoryList();
    getSiteCategoryList();
  }, []);
  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (onSubmitForm) {
      onSubmitForm({ ...data });
    }
  }

  const siteCategoryComponent = siteCategory?.map((item) => (
    <SelectItem value={item.id.toString()} key={item.id}>
      {item.name}
    </SelectItem>
  ));

  const articleCategoryComponent = articleCategory?.map((item) => (
    <SelectItem value={item.id.toString()} key={item.id}>
      {item.name}
    </SelectItem>
  ));
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="siteCategoryId"
          render={({ field }) => (
            <FormItem>
              <HorizontalFormLayout labelWidth="w-20">
                <FormLabel>文章分类</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value + ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="请选择一个分类" />
                    </SelectTrigger>
                    <SelectContent>{siteCategoryComponent}</SelectContent>
                  </Select>
                  {/* <Input placeholder="shadcn" {...field} /> */}
                </FormControl>
                <FormDescription>选择符合的站点分类</FormDescription>
                <FormMessage />
              </HorizontalFormLayout>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <HorizontalFormLayout>
                <FormLabel>个人分类</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value + ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="请选择一个分类" />
                    </SelectTrigger>
                    <SelectContent>{articleCategoryComponent}</SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </HorizontalFormLayout>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <HorizontalFormLayout>
                <FormLabel>标签</FormLabel>
                <FormControl>
                  <LabelInput
                    {...field}
                    onValueChange={field.onChange}
                  ></LabelInput>
                </FormControl>
                <FormMessage />
              </HorizontalFormLayout>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <HorizontalFormLayout>
                <FormLabel>文章摘要</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="请输入文章摘要，默认取文章前50个字符"
                  />
                </FormControl>
                <FormMessage />
              </HorizontalFormLayout>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="thumbnailFileInfo"
          render={({ field }) => (
            <FormItem>
              <HorizontalFormLayout>
                <FormLabel>封面设置</FormLabel>
                <FormControl>
                  <ArticleImg
                    {...field}
                    onValueChange={field.onChange}
                  ></ArticleImg>
                </FormControl>
                <FormMessage />
              </HorizontalFormLayout>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <HorizontalFormLayout>
                <FormLabel>文章类型</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="visibleFalse" />
                      <Label htmlFor="visibleFalse">原创</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="visibleTrue" />
                      <Label htmlFor="visibleTrue">转载</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="visibleFalse" />
                      <Label htmlFor="visibleFalse">翻译</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </HorizontalFormLayout>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visible"
          render={({ field }) => (
            <FormItem>
              <HorizontalFormLayout>
                <FormLabel>可见性</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="visibleTrue" />
                      <Label htmlFor="visibleTrue">公开</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="visibleFalse" />
                      <Label htmlFor="visibleFalse">私有</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </HorizontalFormLayout>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isComment"
          render={({ field }) => (
            <FormItem>
              <HorizontalFormLayout>
                <FormLabel>允许评论</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="isCommentTrue" />
                      <Label htmlFor="isCommentTrue">允许</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="isCommentFalse" />
                      <Label htmlFor="isCommentFalse">禁止</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </HorizontalFormLayout>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isOnTop"
          render={({ field }) => (
            <FormItem>
              <HorizontalFormLayout>
                <FormLabel>是否置顶</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="onTopTrue" />
                      <Label htmlFor="onTopTrue">是</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="onTopFalse" />
                      <Label htmlFor="onTopFalse">否</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </HorizontalFormLayout>
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
}
