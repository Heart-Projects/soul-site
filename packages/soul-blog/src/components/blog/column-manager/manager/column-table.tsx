import { Button } from "@/components/ui/button";
import { Pencil, Eye, X, Plus } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { ArticleColumnCategory } from "@/api/column-category";
import { requestColumnDataList, requestColumnAdd } from "@/api/article-column";
import type { ArticleColumn } from "@/api/article-column";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import EmptyColumnTip from "../components/empty-column-tip";
const formSchema = z.object({
  name: z.string().min(2, { message: "请输入长度为2至20字符的名称" }).max(20, {
    message: "请输入长度为2至20字符的名称",
  }),
  note: z
    .string()
    .min(2, { message: "请输入长度为2至50字符的描述内容" })
    .max(50, {
      message: "=请输入长度为2至50字符的描述内容",
    }),
  summary: z.string().max(30),
  viewScope: z.string(),
});
const AddColumn = ({
  currentCategoryId,
  onSuccess,
}: {
  currentCategoryId?: number;
  onSuccess?: () => void;
}) => {
  const [open, setOpen] = useState(false);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      note: "",
      summary: "",
      viewScope: "0",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { viewScope, ...rest } = values;
    const res = await requestColumnAdd({
      ...rest,
      categoryId: currentCategoryId || 0,
      viewScope: Number(viewScope),
    });
    const { success, data, message } = res;
    if (success) {
      onSuccess?.();
      setOpen(false);
    }
  }
  const onCancel = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <Drawer direction="right" open={open}>
      <DrawerTrigger asChild>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-1" />
          添加栏目
        </Button>
      </DrawerTrigger>
      <DrawerContent className=" px-1">
        <DrawerTitle>
          <div className="flex justify-between">
            新增专栏
            <DrawerClose onClick={onCancel}>
              <X />
            </DrawerClose>
          </div>
        </DrawerTitle>
        <div className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>名称</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入专栏名称" {...field} />
                    </FormControl>
                    <FormDescription>用作专栏内容的主体表述</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="note"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>描述</FormLabel>
                    <FormControl>
                      <Textarea placeholder="描述专栏" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>简介</FormLabel>
                    <FormControl>
                      <Textarea placeholder="一句话专栏简介" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="viewScope"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>访问权限</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value + ""}
                        className="flex  space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="0" />
                          </FormControl>
                          <FormLabel className="font-normal">公开</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="1" />
                          </FormControl>
                          <FormLabel className="font-normal">私密</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" text-right">
                <Button type="reset" variant="outline" onClick={onCancel}>
                  取消
                </Button>
                <Button type="submit" className="ml-2">
                  确定
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
const ColumnItem = ({ dataItem }: { dataItem: ArticleColumn }) => {
  return (
    <div className="p-4 min-w-[23rem]">
      <Card>
        <CardHeader>
          <CardTitle>{dataItem.name}</CardTitle>
          <CardDescription>{dataItem.note}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{dataItem.summary}</p>
        </CardContent>
        <CardFooter className="flex gap-4 justify-between">
          <Button>
            <Pencil />
            <Link href={"/column/create/" + dataItem.identify} target="_blank">
              创作
            </Link>
          </Button>
          <Button variant={"outline"}>
            <Eye />
            <Link href={"/column/view/" + dataItem.identify} target="_blank">
              阅读
            </Link>
          </Button>
          <Button variant="destructive">
            <X />
            删除
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
const ColumnTable = ({
  activeItem,
}: {
  activeItem?: ArticleColumnCategory;
}) => {
  const [dataList, setDataList] = useState<ArticleColumn[]>([]);
  const getDataList = useCallback(async () => {
    if (!activeItem) {
      setDataList([]);
      return;
    }
    const { success, data, message } = await requestColumnDataList(
      activeItem.id || 0
    );
    setDataList(success ? data : []);
  }, [activeItem]);
  useEffect(() => {
    getDataList();
  }, [activeItem, getDataList]);
  return (
    <div className="py-1">
      <div className="flex justify-between">
        <div>
          <AddColumn
            currentCategoryId={activeItem?.id}
            onSuccess={getDataList}
          ></AddColumn>
          <span className="ml-2">共{dataList.length}个栏目</span>
        </div>
        <div>
          <ToggleGroup type="single">
            <ToggleGroupItem value="small">小图</ToggleGroupItem>
            <ToggleGroupItem value="medium">中图</ToggleGroupItem>
            <ToggleGroupItem value="large">大图</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      {dataList.length === 0 && <EmptyColumnTip></EmptyColumnTip>}
      {dataList.length > 0 && (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
          {dataList.map((item, index) => {
            return <ColumnItem key={index} dataItem={item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default ColumnTable;
