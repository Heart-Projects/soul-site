import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
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
import { requestColumnDataList } from "@/api/article-column";
import type { ArticleColumn } from "@/api/article-column";
import EmptyColumnTip from "../components/empty-column-tip";

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
        <CardFooter className="flex">
          <Button variant={"secondary"} className="flex-1">
            <Eye />
            <Link href={"/column/view/" + dataItem.identify} target="_blank">
              开始阅读
            </Link>
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
  if (dataList.length === 0) {
    return <EmptyColumnTip></EmptyColumnTip>;
  }
  return (
    <div className="py-1">
      <div className="flex justify-between">
        <div>
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
      <div className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))]">
        {dataList.map((item, index) => {
          return <ColumnItem key={index} dataItem={item} />;
        })}
      </div>
    </div>
  );
};

export default ColumnTable;
