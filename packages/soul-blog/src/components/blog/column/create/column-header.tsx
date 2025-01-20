import { memo, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  requestColumnWithIdentify,
  type ArticleColumn,
} from "@/api/article-column";

const getColumnInfo = async (
  columnIdentify: string,
  callback?: (data: ArticleColumn) => void
) => {
  const { success, data, message } =
    await requestColumnWithIdentify(columnIdentify);
  if (success) {
    callback?.(data);
  }
};

const ColumnHeader = memo(function ColumnHeaderC({
  columnIdentify,
}: {
  columnIdentify: string;
}) {
  const [columnData, setColumnData] = useState<ArticleColumn>(
    {} as ArticleColumn
  );
  useEffect(() => {
    getColumnInfo(columnIdentify, (data) => {
      setColumnData(data);
    });
  }, [columnIdentify]);
  return (
    <div className="h-14 px-1 flex flex-col justify-between  ">
      <div className=" leading-8 flex justify-between ">
        <span className="truncate text-base">{columnData.name}</span>
      </div>
      <div className=" mt-4 h-[1px] bg-gray-300"></div>
    </div>
  );
});
ColumnHeader.displayName = "ColumnHeader";

const ColumnHeaderIndex = () => {
  const params = useParams<{ columnIdentify: string; pageId?: string[] }>();
  return <ColumnHeader columnIdentify={params?.columnIdentify || ""} />;
};
export default ColumnHeaderIndex;
